import { CompiledQuery, QueryResult } from './deps.ts';
import { PolySqlite, PolySqliteDialectConfig } from './poly-sqlite-dialect-config.ts';
import { PolySqliteDialect } from './poly-sqlite-dialect.ts';

/** [denodrivers/sqlite3](https://github.com/denodrivers/sqlite3) */
interface DenoSqlite3 {
  close(): void;
  changes: number;
  lastInsertRowId: number;
  prepare(sql: string): {
    all(...params: any): unknown[];
  };
}

interface DenoSqlite3DialectConfig extends Omit<PolySqliteDialectConfig, 'database'> {
  database: DenoSqlite3 | (() => Promise<DenoSqlite3>);
}

class DenoSqlite3Dialect extends PolySqliteDialect {
  constructor({ database, ...config }: DenoSqlite3DialectConfig) {
    super({
      ...config,
      database: typeof database === 'function'
        ? async () => DenoSqlite3Adapter(await database())
        : DenoSqlite3Adapter(database),
    });
  }
}

function DenoSqlite3Adapter(db: DenoSqlite3): PolySqlite {
  return {
    // deno-lint-ignore require-await
    async executeQuery<R>({ sql, parameters }: CompiledQuery): Promise<QueryResult<R>> {
      const rows = db.prepare(sql).all(...parameters);
      const { changes, lastInsertRowId } = db;

      return Promise.resolve({
        rows: rows as R[],
        numAffectedRows: BigInt(changes),
        insertId: BigInt(lastInsertRowId),
      });
    },
    // deno-lint-ignore require-await
    async destroy() {
      db.close();
    },
  };
}

export { DenoSqlite3Dialect, type DenoSqlite3DialectConfig };
