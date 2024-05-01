# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[dyedgreen/deno-sqlite]: https://github.com/dyedgreen/deno-sqlite
[denodrivers/sqlite3]: https://github.com/denodrivers/sqlite3

## [Unreleased]

## [2.2.0] - 2024-05-01

### Fixed

- Made `streamQuery` an optional method.

## [2.1.0] - 2024-05-01

[!5]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/merge_requests/5
[!7]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/merge_requests/7

### Added

- Streaming support for [denodrivers/sqlite3] ([!5], [!7])

## [2.0.2] - 2024-03-06

### Added

- Published on JSR: https://jsr.io/@soapbox/kysely-deno-sqlite

## [2.0.1] - 2024-01-30

### Changed

- Upgraded Kysely to v0.27.2.

## [2.0.0] - 2023-12-1

### Changed

- BREAKING: `DenoSqliteDialect` only works with [dyedgreen/deno-sqlite]. Use `Sqlite3Dialect` for [denodrivers/sqlite3].
- Upgraded Kysely to v0.26.3.

## [1.1.0] - 2023-10-11

### Added

- Added support for [denodrivers/sqlite3].

## [1.0.1] - 2023-08-30

### Changed

- Switch to using a minimal database type to remove the direct dependency on [dyedgreen/deno-sqlite].

## [1.0.0] - 2023-08-14

### Added

- Initial release.

[unreleased]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v2.2.0...HEAD
[2.2.0]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v2.1.0...v2.2.0
[2.1.0]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v2.0.2...v2.1.0
[2.0.2]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v2.0.1...v2.0.2
[2.0.1]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v2.0.0...v2.0.1
[2.0.0]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v1.1.0...v2.0.0
[1.1.0]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v1.0.1...v1.1.0
[1.0.1]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/compare/v1.0.0...v1.0.1
[1.0.0]: https://gitlab.com/soapbox-pub/kysely-deno-sqlite/-/tree/v1.0.0
