<div align="center">

# AKEX

**Modern React Component Library**

Accessible, animated UI components shipped as independent packages from a Turborepo monorepo.
Built with TypeScript, Tailwind CSS, and Motion.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-pink?logo=framer)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Packages](#packages) · [Quick Start](#quick-start) · [Project Structure](#project-structure) · [Adding a Package](#adding-a-package) · [Testing](#testing) · [Development](#development) · [Contributing](#contributing)

</div>

---

## Packages

Each package is independently versioned and published under the `@akex` scope.
Full API documentation and live demos are in the **docs app** — run `npm run dev:akex` and open `http://localhost:3001`.

| Package | Version | Description |
|---------|---------|-------------|
| [`@akex/button`](packages/button) | 1.0.0 | Accessible button — 6 variants, 8 sizes, 8 motion animations |
| [`@akex/utils`](packages/utils) | 1.0.0 | Shared utilities — `cn` class merger |

> Adding a new package? See [Adding a Package](#adding-a-package). Only this table needs updating — nothing else.

---

## Quick Start

```bash
# Install all dependencies
npm install

# Start docs & playground at http://localhost:3001
npm run dev:akex
```

---

## Project Structure

```
akex/
├── apps/
│   └── akex/                  # Docs & playground (Next.js, port 3001)
│       └── app/
│           ├── page.tsx        # Package gallery
│           └── <package>/
│               └── page.tsx    # Per-package docs & live demos
├── packages/                  # Publishable packages (@akex/*)
│   ├── <package>/
│   │   ├── src/
│   │   │   ├── Component.tsx
│   │   │   └── index.ts
│   │   ├── __tests__/
│   │   │   └── Component.test.tsx
│   │   ├── package.json       # name: "@akex/<package>"
│   │   └── tsconfig.json      # extends ../tsconfig.base.json
│   └── tsconfig.base.json     # Shared TypeScript base config
├── __mocks__/                 # Jest mocks (motion/react, motion)
├── jest.config.cjs
├── jest.setup.cjs
├── biome.json
├── lefthook.yml
├── turbo.json
└── compose.yml
```

---

## Adding a Package

Every package follows the same shape. Create `packages/<name>/` with the structure below — TypeScript paths, Jest resolution, and Next.js transpilation all pick it up automatically. **No other file in this repo needs to change except the table above.**

**1. `packages/<name>/package.json`**

```json
{
  "name": "@akex/<name>",
  "version": "0.1.0",
  "private": false,
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --out-dir dist",
    "dev": "tsup src/index.ts --watch --format esm,cjs --dts --out-dir dist",
    "test": "jest --config ../../jest.config.cjs --rootDir=../.. --testMatch='**/packages/<name>/**/*.test.{ts,tsx}'",
    "test:watch": "jest --config ../../jest.config.cjs --rootDir=../.. --testMatch='**/packages/<name>/**/*.test.{ts,tsx}' --watch",
    "test:coverage": "jest --config ../../jest.config.cjs --rootDir=../.. --testMatch='**/packages/<name>/**/*.test.{ts,tsx}' --coverage",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

**2. `packages/<name>/tsconfig.json`**

```json
{
  "extends": "../tsconfig.base.json",
  "include": ["src"]
}
```

**3. Implement**

```
packages/<name>/src/Component.tsx        ← implementation
packages/<name>/src/index.ts             ← public exports
packages/<name>/__tests__/Component.test.tsx
```

**4. Add a docs page**

Create `apps/akex/app/<name>/page.tsx` — it appears in the gallery automatically.

---

## Testing

Tests use **Jest 29**, **React Testing Library**, and **`@testing-library/user-event`**.
Motion is mocked in `__mocks__/motion-react.tsx` so animation wrappers render as plain `<span>` elements with no real animation engine needed.

```bash
# All packages — with coverage
npm run jest:test

# Single package
npm run test --workspace=packages/<name>

# Watch mode
npm run test:watch --workspace=packages/<name>

# Coverage for one package
npm run test:coverage --workspace=packages/<name>
```

### What to test in every package

| Area | What to cover |
|------|---------------|
| Rendering | Element presence, children, `data-slot`, `className` merging |
| Variants / sizes | Every value produces the expected Tailwind classes |
| Disabled state | Attribute set, pointer-events blocked, no animation wrapper |
| Interactions | Click, keyboard (Enter/Space), disabled click prevention |
| Accessibility | `role`, `aria-*` attributes, keyboard focus |
| Exports | Public API from `src/index.ts` matches intent |

---

## Development

### Local

```bash
npm run dev:akex          # Docs app → http://localhost:3001
npm run dev:packages      # Watch-build all packages in parallel
```

### Docker

```bash
npm run docker:build      # Build the container image
npm run docker:start      # Start (detached)
npm run docker:stop       # Stop
npm run docker:rebuild    # Stop → build → start
```

### Build

```bash
npm run build             # Build everything via Turborepo
npm run build:packages    # Build packages only
```

### Code Quality

```bash
npm run biome:check       # Lint check
npm run biome:fix         # Lint + auto-fix
npm run stylelint:check   # CSS lint
npm run stylelint:fix     # CSS lint + auto-fix
npm run tsc:check         # TypeScript check (all packages + apps)
npm run clean             # Remove dist/, .next/, node_modules/
```

---

## Git Hooks (Lefthook)

Installed automatically on `npm install`. Runs quality gates before every commit and push.

| Hook | Tasks |
|------|-------|
| `pre-commit` | `biome` lint + fix · `stylelint` fix · `tsc --noEmit` |
| `pre-push` | Full Jest suite with coverage · Build all packages |

```bash
npx lefthook install          # Re-install after a fresh clone
npx lefthook run pre-commit   # Run manually
npx lefthook run pre-push
```

---

## Tech Stack

| Category | Tool | Version |
|----------|------|---------|
| Language | TypeScript | 5.9 |
| UI | React | 19 |
| Framework | Next.js | 16 |
| Styling | Tailwind CSS | 3.4 |
| Animation | Motion | 12 |
| Monorepo | Turborepo | 2 |
| Bundler | tsup | 8 |
| Linter / Formatter | Biome | 2 |
| Testing | Jest + Testing Library | 29 / 16 |
| Git Hooks | Lefthook | 1 |
| Container | Docker + Compose | — |
| Headless UI | @base-ui/react | 1.4 |
| Variant API | class-variance-authority | 0.7 |

---

## Contributing

1. Fork and clone the repository
2. `npm install`
3. Create a branch: `git checkout -b feat/your-feature`
4. Write code and tests — `npm run jest:test` must stay green
5. Commit — Lefthook runs lint, format, and typecheck automatically
6. Push and open a Pull Request

**Commit conventions**

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature or component |
| `fix:` | Bug fix |
| `test:` | Test additions or changes |
| `refactor:` | Code restructuring, no behaviour change |
| `docs:` | Documentation only |
| `chore:` | Dependency updates, config changes |

---

## License

[MIT](LICENSE)

