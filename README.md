# Kysely SQLite Deno

A dialect for [Kysely](https://kysely.dev/), compatible with both [dyedgreen/deno-sqlite](https://github.com/dyedgreen/deno-sqlite) and [denodrivers/sqlite3](https://github.com/denodrivers/sqlite3), or your own custom SQLite library.

## Usage

To use with `deno-sqlite`:

```ts
import { Kysely } from 'npm:kysely';
import { DB as Sqlite } from 'https://deno.land/x/sqlite/mod.ts';
import { DenoSqliteDialect } from 'https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/raw/v2.0.1/mod.ts';

const db = new Kysely({
  dialect: new DenoSqliteDialect({
    database: new Sqlite('db.sqlite3'),
  }),
});
```

To use with `sqlite3`:

```ts
import { Kysely } from 'npm:kysely';
export { Database as Sqlite } from 'https://deno.land/x/sqlite3/mod.ts';
import { DenoSqlite3Dialect } from 'https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/raw/v2.0.1/mod.ts';

const db = new Kysely({
  dialect: new DenoSqlite3Dialect({
    database: new Sqlite('db.sqlite3'),
  }),
});
```

To use with a custom SQLite library:

```ts
import { Kysely, type CompiledQuery, type QueryResult } from 'npm:kysely';
import { PolySqliteDialect } from 'https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/raw/v2.0.1/mod.ts';

const db = new Kysely({
  dialect: new PolySqliteDialect({
    database: {
      async executeQuery<R>({ sql, parameters }: CompiledQuery): Promise<QueryResult<R>> {
        const { rows, numAffectedRows, insertId } = // ... execute query

        // You have to return this object. How you do it is up to you.
        return {
          rows: rows as R[],
          numAffectedRows: BigInt(numAffectedRows),
          insertId: BigInt(insertId),
        };
      },
      async destroy() {
        // ... close database
      },
    },
  }),
});
```

Now you can use Kysely on Deno!

```ts
const me = 'alex';

const query = db.selectFrom('users').selectAll()
  .where('name', '=', me)
  .limit(1);

const user = await db.executeTakeFirst();
```

## License

The MIT License (MIT)

Copyright (c) 2023 Alex Gleason\
Copyright (c) 2022 Sami Koskimäki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
