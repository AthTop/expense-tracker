import { Generated, ColumnType } from 'kysely';

export interface Database {
  users: UsersTable;
  categories: CategoriesTable;
  transactions: TransactionsTable;
}

interface UsersTable {
  user_id: Generated<string>;
  username: string;
  password_hash: string;
  created_at: ColumnType<Date, never, never>;
}

interface CategoriesTable {
  category_id: Generated<string>;
  user_id: string;
  name: string;
  created_at: ColumnType<Date, never, never>;
}

interface TransactionsTable {
  transaction_id: Generated<string>;
  user_id: string;
  category_id: string;
  amount: number;
  type: 'income' | 'expense';
  created_at: ColumnType<Date, never, never>;
  transaction_date: Date;
  description: string | null;
}
