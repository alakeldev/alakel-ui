# `@alakel/button`

Reserved workspace for the first Alakel UI component.

There is no Button implementation or public API yet. The package is private and must not be published until its implementation, tests, documentation, and release metadata are complete.

## Build contract

This package uses Vite library mode and publishes ESM only:

- `dist/index.js` contains the runtime JavaScript bundle.
- Vite emits a JavaScript source map once the runtime bundle contains implementation code.
- `dist/index.d.ts` contains the TypeScript declarations.
- CommonJS output and `require()` consumption are intentionally unsupported.

Build only this package from the repository root:

```bash
npm run build --workspace=@alakel/button
```

When React, Radix, Motion, or other shared runtime libraries are introduced, declare them as peer dependencies and externalize them in `vite.config.ts` so consumers do not receive duplicate framework copies.
