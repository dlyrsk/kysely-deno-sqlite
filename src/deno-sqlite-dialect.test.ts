import { DenoSqliteDialect } from './deno-sqlite-dialect.ts';
import { assert, DenoSqlite } from './deps-test.ts';
import { Kysely } from './deps.ts';
import { migrate } from './test-helpers.ts';

interface Person {
  id: number;
  name: string;
}

Deno.test('DenoSqliteDialect', async () => {
  const db = new Kysely<{ person: Person }>({
    dialect: new DenoSqliteDialect({
      database: new DenoSqlite(':memory:'),
    }),
  });

  const migrateResult = await migrate(db, async (db) => {
    await db.schema
      .createTable('person')
      .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
      .addColumn('name', 'text')
      .execute();
  });

  assert(!migrateResult.error);

  await db
    .insertInto('person')
    .values([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ])
    .execute();

  const selectResult = await db
    .selectFrom('person').selectAll()
    .where('id', '=', 1)
    .executeTakeFirst();

  assert(selectResult!.name === 'John');

  await db.destroy();
});
