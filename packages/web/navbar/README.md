# `@alakel/navbar`

Private workspace for the first Alakel UI web interface package: a responsive, accessible, and motion-focused navbar.

There is no implementation or public API yet. The package remains at version `0.0.0` with `"private": true` and must not be published until its design, implementation, tests, documentation, dependencies, and release metadata are complete.

## Package boundary

This package should own navbar designs that share the same purpose and composition model. Use descriptive variants such as `minimal`, `centered`, `floating`, or `mega` rather than numbered packages or variants such as `navbar-one` and `navbar-two`.

Create another package only when an experience has a genuinely different responsibility or public API. For example, a site navbar and a command palette may be separate packages, while two visual navbar designs should remain variants of `@alakel/navbar`.

## Build contract

This package uses Vite library mode and publishes ESM only:

- `dist/index.js` contains the runtime JavaScript bundle.
- Vite emits a JavaScript source map once implementation code exists.
- `dist/index.d.ts` contains TypeScript declarations.
- CommonJS output and `require()` consumption are intentionally unsupported.
- CSS files are treated as side effects so future packaged styles are not removed by consumer bundlers.

Build only this package from the repository root:

```bash
npm run build --workspace=@alakel/navbar
```

When React, Radix, Motion, or another runtime library is introduced, declare it with an appropriate peer dependency range and externalize it in `vite.config.ts` so consumers do not receive duplicate framework copies.
