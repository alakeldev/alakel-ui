# Publishing `@alakel/button`

`@alakel/button` is currently an empty development skeleton. Its package is deliberately set to version `0.0.0` with `"private": true`, so it cannot be published accidentally.

Do not publish it until the implementation, public API, tests, documentation, and licence contents are complete.

## Prepare the first release

Before the first release:

1. Implement and document the component.
2. Add and run its tests.
3. Confirm all runtime dependencies have compatible licences.
4. Set a real initial version, normally `0.1.0` while the API is experimental.
5. Change `"private"` to `false`.
6. Add `"publishConfig": { "access": "public" }`.
7. Add the final `author`, `repository`, `homepage`, and `bugs` metadata.
8. Confirm the package contains its `LICENSE`, `README.md`, compiled files, and type declarations.

Run the repository checks:

```bash
npm run biome:check
npm run tsc:check
npm run build
```

Inspect the exact release contents without uploading anything:

```bash
npm pack --dry-run --workspace @alakel/button
```

Only after reviewing that output should the package be published:

```bash
npm publish --workspace @alakel/button
```

Package publishing requires an npm account authorized to publish under the `@alakel` organization and the account's required two-factor authentication.
