# Kysely SQLite Deno

A dialect for [Kysely], compatible with both [dyedgreen/deno-sqlite] and [denodrivers/sqlite3], or your own custom SQLite library.

[Kysely]: https://kysely.dev/
[dyedgreen/deno-sqlite]: https://github.com/dyedgreen/deno-sqlite
[denodrivers/sqlite3]: https://github.com/denodrivers/sqlite3

## Usage

To use with [dyedgreen/deno-sqlite]:

Add dependency to import_map.json or deno.jsonc:

```json
{
  "imports": {
	  "kysely": "https://cdn.jsdelivr.net/npm/kysely@0.27.4/dist/esm/index.js",
	  "@dlyrsk/kysely-deno-sqlite": "https://cdn.jsdelivr.net/gh/dlyrsk/kysely-deno-sqlite/mod.ts",
  }
}
```


```typescript
import { Kysely } from "kysely";
import { DenoSqliteDialect } from "@dlyrsk/kysely-deno-sqlite";

const db = new Kysely({
  dialect: new DenoSqliteDialect({
    database: new Sqlite('db.sqlite3'),
  }),
});
```


## License

The MIT License (MIT)

Copyright (c) Alex Gleason\
Copyright (c) Sami Koskimäki\
Copyright (c) Siddharth Singh

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
