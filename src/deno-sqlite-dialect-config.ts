import type { SqliteDialectConfig } from '../deps.ts';

/** Type compatible with both [dyedgreen/deno-sqlite](https://github.com/dyedgreen/deno-sqlite) and [denodrivers/sqlite3](https://github.com/denodrivers/sqlite3). */
type DenoSqlite =
  & {
    close(): void;
    changes: number;
    lastInsertRowId: number;
  }
  & ({
    queryEntries(sql: string, params: any): unknown[];
  } | {
    prepare(sql: string): {
      all(...params: any): unknown[];
    };
  });

interface DenoSqliteDialectConfig extends Omit<SqliteDialectConfig, 'database'> {
  database: DenoSqlite | (() => Promise<DenoSqlite>);
}

export type { DenoSqlite, DenoSqliteDialectConfig };
