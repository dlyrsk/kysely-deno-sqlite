import type { SqliteDialectConfig } from '../deps.ts';

interface DenoSqlite {
  queryEntries: (sql: string, params: any) => unknown[];
  close: () => void;
  changes: number;
  lastInsertRowId: number;
}

interface DenoSqliteDialectConfig extends Omit<SqliteDialectConfig, 'database'> {
  database: DenoSqlite | (() => Promise<DenoSqlite>);
}

export type { DenoSqlite, DenoSqliteDialectConfig };
