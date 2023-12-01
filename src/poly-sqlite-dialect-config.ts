import type { CompiledQuery, QueryResult, SqliteDialectConfig } from './deps.ts';

interface PolySqlite {
  executeQuery<R>({ sql, parameters }: CompiledQuery): Promise<QueryResult<R>>;
  destroy(): Promise<void>;
}

interface PolySqliteDialectConfig extends Omit<SqliteDialectConfig, 'database'> {
  database: PolySqlite | (() => Promise<PolySqlite>);
}

export type { PolySqlite, PolySqliteDialectConfig };
