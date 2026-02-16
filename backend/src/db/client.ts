import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from '../types/database';

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString:
      process.env.NODE_ENV === 'test'
        ? process.env.TEST_DB_URL
        : process.env.DB_URL,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
