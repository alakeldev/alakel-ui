<div align="center">

# Alakel UI

A monorepo for documenting and independently releasing Alakel UI packages.

[Website](https://ui.alakel.dev) · [License](LICENSE)

</div>

## About

Alakel UI provides independently maintained UI packages for web and React Native. This repository contains their shared documentation website, package source code, and development tooling. Mobile applications that consume the packages live in separate repositories.

## Architecture

```text
alakel-ui/
├── apps/
│   └── docs/
├── packages/
│   ├── web/
│   │   └── <package>/
│   ├── native/
│   │   └── <package>/
│   └── shared/
│       └── <package>/
└── shared configuration
```

- `apps/docs` is the Next.js documentation website for both supported platforms.
- `packages/web/*` contains independently released browser packages.
- `packages/native/*` contains independently released React Native packages.
- `packages/shared/*` is reserved for platform-neutral packages created only when genuine shared contracts emerge.
- Root configuration coordinates workspaces, builds, type checking, formatting, and deployment.

The documentation application serves its overview at `/docs`, web guides under `/docs/web`, and React Native guides under `/docs/react-native`. Package names in this document are represented by `<package>` placeholders. New packages are discovered through the repository's `packages/*/*` workspace pattern, so this README does not require a static package list or component count.

## Workspace conventions

Every package owns its source code, manifest, README, licence, tests, version, and release lifecycle. Package-specific installation instructions and APIs belong in that package's README rather than this root document.

The documentation application consumes packages through explicit workspace dependencies. A package can therefore be developed, documented, and released without requiring unrelated package versions to change.

Browser packages use Vite library mode and publish ECMAScript modules only. Vite produces the runtime JavaScript bundle, while TypeScript emits the corresponding declaration files. CommonJS files and `require` exports are not part of the package contract. Each package still owns its build configuration and can evolve independently.

React Native packages publish ECMAScript modules and TypeScript declarations without bundling React Native itself. The consuming application's Metro pipeline resolves the package and creates the final application bundle.

## Development

Use Node.js 24.15 or newer from the Node 24 LTS line and npm 12.0.2.

Install the workspaces:

```bash
npm install
```

Start the documentation application and package development processes:

```bash
npm run dev
```

Start only the documentation application at <http://localhost:3001>:

```bash
npm run dev:docs
```

Run the repository checks:

```bash
npm run biome:check
npm run tsc:check
npm run build
```

Remove generated dependencies, builds, and caches across the root, applications, and packages:

```bash
npm run clean
```

The clean command removes project-local outputs such as `node_modules`, `.next`, `.turbo`, `dist`, `build`, coverage data, TypeScript build caches, and Next.js-generated `next-env.d.ts` files. It skips `.git` and preserves source files, lockfiles, environment files, and deployment configuration. Run `npm install` afterward to restore dependencies.

## Documentation

Project-wide documentation is published at [ui.alakel.dev](https://ui.alakel.dev). Its overview lives under `/docs`, web documentation under `/docs/web`, and React Native documentation under `/docs/react-native`. Detailed package documentation stays beside its package so it can change with that package independently.

## License

Alakel UI is licensed under the [MIT License](LICENSE).
