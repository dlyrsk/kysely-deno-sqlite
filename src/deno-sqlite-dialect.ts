import { CompiledQuery, QueryResult } from './deps.ts';
import { PolySqlite, PolySqliteDialectConfig } from './poly-sqlite-dialect-config.ts';
import { PolySqliteDialect } from './poly-sqlite-dialect.ts';

/** [dyedgreen/deno-sqlite](https://github.com/dyedgreen/deno-sqlite) */
interface DenoSqlite {
  close(): void;
  changes: number;
  lastInsertRowId: number;
  queryEntries(sql: string, params: any): unknown[];
}

interface DenoSqliteDialectConfig extends Omit<PolySqliteDialectConfig, 'database'> {
  database: DenoSqlite | (() => Promise<DenoSqlite>);
}

class DenoSqliteDialect extends PolySqliteDialect {
  constructor({ database, ...config }: DenoSqliteDialectConfig) {
    super({
      ...config,
      database: typeof database === 'function'
        ? async () => DenoSqliteAdapter(await database())
        : DenoSqliteAdapter(database),
    });
  }
}

function DenoSqliteAdapter(db: DenoSqlite): PolySqlite {
  return {
    // deno-lint-ignore require-await
    async executeQuery<R>({ sql, parameters }: CompiledQuery): Promise<QueryResult<R>> {
      const rows = db.queryEntries(sql, parameters);
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

export { DenoSqliteDialect, type DenoSqliteDialectConfig };
