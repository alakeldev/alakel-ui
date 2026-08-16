# Publishing Alakel UI packages

Every publishable workspace under `packages/*/*` is versioned and released independently under the `@alakel` npm scope. New package workspaces start at version `0.0.0` with `"private": true` so they cannot be published accidentally.

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
9. Confirm runtime frameworks and libraries—such as React, React Native, Radix, or Motion—are declared with the appropriate peer dependency ranges and are not bundled into the package unintentionally.

## Distribution contract

Published JavaScript packages are ESM-only:

- `package.json` declares `"type": "module"` and exposes ESM entry points.
- TypeScript packages publish declarations for their public APIs.
- No CommonJS bundle, `.cjs` file, or `require` condition is published.

The package category determines its build pipeline:

- Browser packages under `packages/web/*` use Vite library mode for runtime output and TypeScript for declarations.
- React Native packages under `packages/native/*` use the native-compatible pipeline documented by each package when that pipeline is introduced.
- Platform-neutral packages under `packages/shared/*` choose the smallest build pipeline compatible with all documented consumers.

Build tools and output paths belong in each package's README and manifest; they are not assumed to be identical across platforms.

Consumers must use ESM imports:

```ts
import { Component } from "@alakel/example-package";
```

`@alakel/example-package` and `Component` are placeholders for the package and public export being documented. Do not document or support CommonJS `require()` consumption unless the package strategy is intentionally changed in a future major release.

Run the repository checks:

```bash
npm run biome:check
npm run tsc:check
npm run build
```

Inspect the exact release contents without uploading anything. Replace the example workspace name with the package being released:

```bash
npm pack --dry-run --workspace=@alakel/example-package
```

Only after reviewing that output should the package be published:

```bash
npm publish --workspace=@alakel/example-package
```

Package publishing requires an npm account authorized to publish under the `@alakel` organization and the account's required two-factor authentication.

Build configuration follows [Vite library mode](https://vite.dev/guide/build.html#library-mode), and package entry points follow [Node.js package exports](https://nodejs.org/api/packages.html#package-entry-points).
