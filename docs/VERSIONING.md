# Versioning

We follow [Semantic Versioning](https://semver.org/):

### Choosing the Right Version Number

#### PATCH (0.1.0 → 0.1.1)

**When to use:** Bug fixes, typo corrections, dependency updates

**Examples:**

- Fixed memory leak in destroy method
- Corrected TypeScript type definitions
- Updated internal dependencies
- Fixed chat widget positioning bug

#### MINOR (0.1.0 → 0.2.0)

**When to use:** New features that don't break existing functionality

**Examples:**

- Added new configuration option (with default value)
- Added new method to API (existing methods unchanged)
- Added support for new framework (React hooks)
- Improved performance (no API changes)

#### MAJOR (0.1.0 → 1.0.0)

**When to use:** Breaking changes that require users to update their code

**Examples:**

- Removed or renamed public methods
- Changed required configuration format
- Removed support for old browsers
- Changed initialization API
- Removed deprecated features

**Note:** Before v1.0.0, breaking changes can go in MINOR versions if needed.
