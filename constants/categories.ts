export const EXPENSE_CATEGORIES = [
  'Groceries',
  'Food',
  'Transport',
  'Bills',
  'Medical',
  'Education',
  'Shopping',
  'Other',
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
