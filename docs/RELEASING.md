# Release Process

## Semantic Versioning

We follow [Semantic Versioning](https://semver.org/):

- **PATCH** (0.1.0 → 0.1.1): Bug fixes, no API changes
- **MINOR** (0.1.0 → 0.2.0): New features, backward compatible
- **MAJOR** (0.1.0 → 1.0.0): Breaking changes

## Before Releasing

1. **Update CHANGELOG.md**

   - Move items from `[Unreleased]` to new version section
   - Add release date
   - Add comparison link at bottom

2. **Run prerelease script to ensure you are good to go**

```bash
   npm run prerelease
```
