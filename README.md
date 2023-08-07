# Kysely SQLite Deno

A dialect for [Kysely](https://kysely.dev/) that uses [deno-sqlite](https://github.com/dyedgreen/deno-sqlite).

## Usage

```ts
import { Kysely } from 'npm:kysely';
import { DB as Sqlite } from 'https://deno.land/x/sqlite/mod.ts';
import { DenoSqliteDialect } from 'https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/raw/main/mod.ts';

const db = new Kysely({
  dialect: new DenoSqliteDialect({
    database: new Sqlite('db.sqlite3'),
  }),
});
```

Now you can use Kysely as intended!

```ts
const me = 'alex';

const query = db.selectFrom('users').selectAll()
  .where('name', '=', me)
  .limit(1);

const user = await db.executeTakeFirst();
```

## About

Previously you couldn't use Kysely with SQLite on Deno, because the built-in support uses `better-sqlite3` which only works on Node.js. This dialect uses `deno-sqlite` instead, so it will work on Deno. Otherwise, the functionality is the same.

## License

The MIT License (MIT)

Copyright (c) 2023 Alex Gleason  
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
