<div align="center">

# Alakel UI

A design-led UI framework for independently released interface experiences.

[Website](https://ui.alakel.dev) · [License](LICENSE)

</div>

## About

Alakel UI provides polished, responsive, and animated interface sections for web and React Native. Instead of duplicating generic low-level primitives, its public packages focus on complete experiences such as navigation, carousels, interactive cards, heroes, footers, and composed content sections.

Each experience combines an original visual direction with thoughtful interaction and a focused API. Web packages may compose established accessibility primitives and animation libraries while React Native packages use platform-appropriate foundations. Small elements such as buttons, badges, and text styles remain internal unless they develop enough distinct value to justify a public package.

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
- `packages/web/*` contains independently released sections and interaction-rich components for websites.
- `packages/native/*` contains independently released sections and interaction patterns for React Native.
- `packages/shared/*` is reserved for platform-neutral packages created only when genuine shared contracts emerge.
- Root configuration coordinates workspaces, builds, type checking, formatting, and deployment.

The documentation application serves its platform-neutral overview at `/`, web experiences under `/web`, and React Native experiences under `/react-native`. These are sections of one documentation product and intentionally share one application, layout, navigation system, and deployment. Package names in this document are represented by `<package>` placeholders. New packages are discovered through the repository's `packages/*/*` workspace pattern, so this README does not require a static package list or section count.

## Product principles

- **Complete experiences over primitive duplication.** Public releases solve meaningful interface problems rather than recreating generic buttons, badges, or typography.
- **A recognizable design voice.** Every section should carry a deliberate Alakel UI visual style while remaining adaptable to a product's brand.
- **Purposeful motion.** Animation should clarify state, hierarchy, and interaction without distracting from content or ignoring reduced-motion preferences.
- **Responsive and accessible foundations.** Keyboard behavior, focus management, semantics, touch interaction, and screen size are part of the component API.
- **Platform-appropriate implementation.** Web and React Native packages can share design intent without forcing the same runtime or implementation onto both platforms.
- **Useful package boundaries.** Navigation and carousels can justify independent packages; related visual section variants should evolve together rather than becoming many tiny packages.

## Workspace conventions

Every public package owns its source code, manifest, README, licence, tests, version, and release lifecycle. Package-specific installation instructions and APIs belong in that package's README rather than this root document. Private workspaces may hold experiments or internal foundations without becoming part of the public framework.

The documentation application consumes packages through explicit workspace dependencies. A package can therefore be developed, documented, and released without requiring unrelated package versions to change.

Browser packages use Vite library mode and publish ECMAScript modules only. Vite produces the runtime JavaScript bundle, while TypeScript emits the corresponding declaration files. CommonJS files and `require` exports are not part of the package contract. Libraries used for accessibility or animation must remain replaceable implementation details unless their APIs are intentionally exposed.

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

Project-wide documentation is published at [ui.alakel.dev](https://ui.alakel.dev). Its overview lives at `/`, web experiences under `/web`, and React Native experiences under `/react-native`. Detailed package documentation stays beside its package so each section and interaction pattern can evolve independently.

## License

Alakel UI is licensed under the [MIT License](LICENSE).
