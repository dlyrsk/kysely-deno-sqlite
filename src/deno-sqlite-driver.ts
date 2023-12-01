import { CompiledQuery, type DatabaseConnection, type Driver, type QueryResult } from '../deps.ts';

import type { DenoSqliteDialectConfig, SqliteLib } from './deno-sqlite-dialect-config.ts';

class DenoSqliteDriver implements Driver {
  readonly #config: DenoSqliteDialectConfig;
  readonly #connectionMutex = new ConnectionMutex();

  #db?: SqliteLib;
  #connection?: DatabaseConnection;

  constructor(config: DenoSqliteDialectConfig) {
    this.#config = Object.freeze({ ...config });
  }

  async init(): Promise<void> {
    this.#db = typeof this.#config.database === 'function' ? await this.#config.database() : this.#config.database;

    this.#connection = new DenoSqliteConnection(this.#db);

    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.#connection);
    }
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.#connectionMutex.lock();
    return this.#connection!;
  }

  async beginTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('begin'));
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('commit'));
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw('rollback'));
  }

  // deno-lint-ignore require-await
  async releaseConnection(): Promise<void> {
    this.#connectionMutex.unlock();
  }

  // deno-lint-ignore require-await
  async destroy(): Promise<void> {
    this.#db?.destroy();
  }
}

class DenoSqliteConnection implements DatabaseConnection {
  readonly #db: SqliteLib;

  constructor(db: SqliteLib) {
    this.#db = db;
  }

  executeQuery<R>(query: CompiledQuery): Promise<QueryResult<R>> {
    return this.#db.executeQuery<R>(query);
  }

  // deno-lint-ignore require-yield
  async *streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('SQLite doesn\'t support streaming');
  }
}

class ConnectionMutex {
  #promise?: Promise<void>;
  #resolve?: () => void;

  async lock(): Promise<void> {
    while (this.#promise) {
      await this.#promise;
    }

    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
  }

  unlock(): void {
    const resolve = this.#resolve;

    this.#promise = undefined;
    this.#resolve = undefined;

    resolve?.();
  }
}

export { DenoSqliteDriver };
