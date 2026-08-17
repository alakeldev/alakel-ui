# `@alakel/react-native-button`

Reserved workspace for the Alakel UI React Native Button component.

There is no Button implementation or public API yet. The package is private and must not be published until its implementation, tests, documentation, peer dependencies, and release metadata are complete.

## Build contract

This package uses TypeScript to publish ESM JavaScript and declarations without creating a browser bundle:

- `dist/index.js` contains the compiled runtime module.
- `dist/index.js.map` embeds and maps back to the TypeScript source for published-package debugging.
- `dist/index.d.ts` contains the TypeScript declarations.
- The consuming React Native application's Metro pipeline creates the final application bundle.
- CommonJS output and `require()` consumption are intentionally unsupported.

Build only this package from the repository root:

```bash
npm run build --workspace=@alakel/react-native-button
```

When implementation begins, add React and React Native as peer dependencies with compatibility ranges matching the supported releases. Add the development dependencies needed to type-check and test the component, but do not bundle framework copies into the published package.

The documentation application can add this workspace as an explicit dependency when it has an API to document. Browser-rendered native previews will also require a deliberate React Native Web integration.
