import type { CompiledQuery, QueryResult, SqliteDialectConfig } from '../deps.ts';

interface SqliteLib {
  executeQuery<R>({ sql, parameters }: CompiledQuery): Promise<QueryResult<R>>;
  destroy(): Promise<void>;
}

interface DenoSqliteDialectConfig extends Omit<SqliteDialectConfig, 'database'> {
  database: SqliteLib | (() => Promise<SqliteLib>);
}

export type { DenoSqliteDialectConfig, SqliteLib };
