import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { supabase } from '@/utils/supabase';
import { Expense } from '@/types';

interface ExpenseState {
  expenses: Expense[];
  isSyncing: boolean;
  lastSyncTimestamp: number | null;
  familyId: string;
  userId: string;

  loadExpenses: () => Promise<void>;
  addExpense: (expenseData: Omit<Expense, 'id' | 'created_at' | 'synced'>) => Promise<void>;
  syncExpenses: () => Promise<void>;
  setFamilyId: (familyId: string) => void;
  setUserId: (userId: string) => void;
}

const STORAGE_KEY = '@entepocket_expenses';

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  isSyncing: false,
  lastSyncTimestamp: null,
  familyId: 'temp-family',
  userId: 'temp-user',

  loadExpenses: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const expenses = JSON.parse(stored) as Expense[];
        set({ expenses });
      }
    } catch (error) {
      console.warn('Failed to load expenses from local storage:', error);
    }
  },

  addExpense: async (expenseData) => {
    const { familyId, userId, expenses, syncExpenses } = get();

    // Create a new offline-first expense object with default fallback values
    const newExpense: Expense = {
      ...expenseData,
      id: Crypto.randomUUID(),
      family_id: expenseData.family_id || familyId,
      added_by: expenseData.added_by || userId,
      created_at: new Date().toISOString(),
      synced: false,
    };

    const updatedExpenses = [newExpense, ...expenses];

    // Persist locally immediately
    set({ expenses: updatedExpenses });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      console.warn('Failed to save expense locally:', error);
    }

    // Attempt standard background synchronization
    await syncExpenses();
  },

  syncExpenses: async () => {
    const { expenses, isSyncing } = get();

    // Prevent duplicate active sync operations
    if (isSyncing) return;

    const unsynced = expenses.filter((e) => !e.synced);
    if (unsynced.length === 0) return;

    set({ isSyncing: true });

    try {
      // Format record schema fields expected by Supabase
      const recordsToInsert = unsynced.map((e) => ({
        id: e.id,
        family_id: e.family_id,
        added_by: e.added_by,
        amount: e.amount,
        category: e.category,
        payment_type: e.payment_type,
        note: e.note || null,
        expense_date: e.expense_date,
        created_at: e.created_at,
      }));

      const { error } = await supabase.from('expenses').insert(recordsToInsert);

      if (error) {
        throw error;
      }

      // Mark locally saved records as successfully synced
      const syncedIds = new Set(unsynced.map((e) => e.id));
      const updatedExpenses = expenses.map((e) =>
        syncedIds.has(e.id) ? { ...e, synced: true } : e
      );

      set({
        expenses: updatedExpenses,
        lastSyncTimestamp: Date.now(),
      });

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExpenses));
    } catch (error) {
      // Silence network and connection errors since they are handled offline
      console.log('Background sync skipped/failed (offline state):', error);
    } finally {
      set({ isSyncing: false });
    }
  },

  setFamilyId: (familyId) => set({ familyId }),
  setUserId: (userId) => set({ userId }),
}));
