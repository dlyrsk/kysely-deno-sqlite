import { Migrator } from './deps-test.ts';
import { Kysely } from './deps.ts';

function migrate(db: Kysely<any>, up: (db: Kysely<any>) => Promise<void>) {
  const migrator = new Migrator({
    db,
    provider: {
      // deno-lint-ignore require-await
      async getMigrations() {
        return { [crypto.randomUUID()]: { up } };
      },
    },
  });

  return migrator.migrateToLatest();
}

export { migrate };
