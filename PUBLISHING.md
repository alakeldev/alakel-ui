# Publishing Alakel UI packages

Every `@alakel/*` package is versioned and released independently. New package workspaces start at version `0.0.0` with `"private": true` so they cannot be published accidentally.

Do not publish a package until its implementation, public API, tests, documentation, and licence contents are complete. Package-specific release notes and compatibility requirements belong in that package's README.

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
9. Confirm runtime peer dependencies such as React, Radix, and Motion are declared as peers and externalized from the Vite bundle.

## Distribution contract

Published JavaScript packages are ESM-only:

- Vite library mode builds `dist/index.js`.
- TypeScript emits `dist/index.d.ts`.
- `package.json` declares `"type": "module"` and exposes only the ESM import entry.
- No CommonJS bundle, `.cjs` file, or `require` condition is published.

Consumers must use ESM imports:

```ts
import { Button } from "@alakel/button"
```

Do not document or support `require("@alakel/button")` unless the package strategy is intentionally changed in a future major release.

Run the repository checks:

```bash
npm run biome:check
npm run tsc:check
npm run build
```

Inspect the exact release contents without uploading anything. Replace `@alakel/button` with the target workspace name:

```bash
npm pack --dry-run --workspace=@alakel/button
```

Only after reviewing that output should the package be published:

```bash
npm publish --workspace=@alakel/button
```

Package publishing requires an npm account authorized to publish under the `@alakel` organization and the account's required two-factor authentication.

Build configuration follows [Vite library mode](https://vite.dev/guide/build.html#library-mode), and package entry points follow [Node.js package exports](https://nodejs.org/api/packages.html#package-entry-points).
