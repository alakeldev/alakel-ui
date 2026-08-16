<div align="center">

# Alakel UI

A monorepo for building Alakel UI applications and independently maintained UI packages.

[Website](https://ui.alakel.dev) · [License](LICENSE)

</div>

## About

Alakel UI provides a shared foundation for web and mobile applications while allowing every UI package to evolve, version, and release independently. Each workspace owns its implementation and documentation; the repository root supplies common development and quality tooling.

## Architecture

```text
alakel-ui/
├── apps/
│   └── <application>/
├── packages/
│   ├── web/
│   │   └── <package>/
│   ├── native/
│   │   └── <package>/
│   └── shared/
│       └── <package>/
└── shared configuration
```

- `apps/*` contains product applications and documentation experiences.
- `packages/web/*` contains independently released browser packages.
- `packages/native/*` is reserved for independently released React Native packages.
- `packages/shared/*` is reserved for platform-neutral packages created only when genuine shared contracts emerge.
- Root configuration coordinates workspaces, builds, type checking, formatting, and deployment.

Package names in this document are represented by `<package>` placeholders. New workspaces are discovered through the repository's `packages/*/*` workspace pattern, so this README does not require a static package list or component count.

## Workspace conventions

Every package owns its source code, manifest, README, licence, tests, version, and release lifecycle. Package-specific installation instructions and APIs belong in that package's README rather than this root document.

Applications consume packages through explicit workspace dependencies. A package can therefore be developed and released without requiring unrelated package versions to change.

Browser packages use Vite library mode and publish ECMAScript modules only. Vite produces the runtime JavaScript bundle, while TypeScript emits the corresponding declaration files. CommonJS files and `require` exports are not part of the package contract. Each package still owns its build configuration and can evolve independently.

## Development

Use Node.js 24.15 or newer from the Node 24 LTS line and npm 12.0.2.

Install the workspaces:

```bash
npm install
```

Start the web application at <http://localhost:3001>:

```bash
npm run dev:web
```

Run the repository checks:

```bash
npm run biome:check
npm run tsc:check
npm run build
```

## Documentation

Project-wide documentation is published at [ui.alakel.dev](https://ui.alakel.dev). Detailed package documentation stays beside its package so it can change with that package independently.

## License

Alakel UI is licensed under the [MIT License](LICENSE).
