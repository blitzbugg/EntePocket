import { ExpenseCategory } from '../constants/categories';

export type PaymentType = 'Cash' | 'UPI' | 'Card';

export interface Expense {
  id: string; // locally generated uuid
  family_id: string; // temporarily hardcoded or from a future family store
  added_by: string; // user id (hardcode for now)
  amount: number;
  category: ExpenseCategory; // from constants/categories
  payment_type: PaymentType;
  note?: string;
  expense_date: string; // ISO date string
  created_at: string; // ISO date string
  synced: boolean; // false by default, becomes true after successful supabase insert
}
