<div align="center">

# AKEX

**Accessible · Animated · Independent**

Seven production-ready React UI packages, each published separately under the `@akex` scope.
Built with TypeScript, Tailwind CSS, and Motion inside a Turborepo monorepo.

[![CI](https://github.com/alakeldev/akex/actions/workflows/ci.yml/badge.svg)](https://github.com/alakeldev/akex/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-ff0055?logo=framer&logoColor=white)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)

[Website](https://www.akex.app) · [Running Locally](#running-locally) · [Packages](#packages) · [Project Structure](#project-structure) · [Adding a Package](#adding-a-package) · [Testing](#testing) · [Development](#development) · [Contributing](#contributing)

</div>

---

## Public Domain

AKEX uses one permanent public domain: **[www.akex.app](https://www.akex.app)**.
The web documentation is served at the root. Future mobile documentation and browser previews will use paths on the same domain, such as `/mobile`; they do not require another domain or subdomain.

---

## Running Locally

Complete step-by-step guide to get the project fully working on your machine.

### Prerequisites

Make sure the following tools are installed before you begin:

| Tool | Required Version | Check |
|------|-----------------|-------|
| **Node.js** | 20 or later | `node -v` |
| **npm** | 11 or later | `npm -v` |
| **Git** | any recent | `git --version` |
| **Docker** *(optional)* | any recent | `docker -v` |

> **Node.js 20+** is required. The project uses `"packageManager": "npm@11.7.0"`, so npm 11 is strongly recommended to match the lockfile exactly.

---

### Option A — Run directly on your machine (recommended)

#### Step 1 — Clone the repository

```bash
git clone git@github.com:alakeldev/akex.git
cd akex
```

> If you do not have SSH configured, use HTTPS instead:
> ```bash
> git clone https://github.com/alakeldev/akex.git
> cd akex
> ```

#### Step 2 — Install all dependencies

From the **root** of the monorepo, run:

```bash
npm install
```

This installs dependencies for the root workspace, all packages (`@akex/*`), and the docs app in a single step via npm workspaces.

#### Step 3 — Build the packages

The docs app imports the packages from their `src/` directly in development, but you must build them at least once so TypeScript and the Next.js app can resolve all types correctly:

```bash
npm run build:packages
```

This runs `tsup` for every package under `packages/` and emits their `dist/` bundles and type declarations.

#### Step 4 — Install git hooks (optional but recommended)

```bash
npx lefthook install
```

Lefthook installs `pre-commit` and `pre-push` hooks that run lint, format, type-check, tests, and build checks automatically. Skip this step if you prefer to run checks manually.

#### Step 5 — Start the docs & playground app

```bash
npm run dev:web
```

Open **[http://localhost:3001](http://localhost:3001)** in your browser.

You will see the AKEX component gallery. Click any component card to open its live docs page and interactive playground.

#### Step 6 — (Optional) Watch-build packages during development

If you are working on a package and want it to rebuild on every save, run this in a **second terminal**:

```bash
npm run dev:packages
```

This starts `tsup --watch` for all packages in parallel. Your changes to any file under `packages/*/src/` will rebuild automatically and the Next.js dev server will pick them up.

---

### Option B — Run with Docker

Docker runs the docs app in a container with all dependencies pre-installed. No local Node.js setup required.

#### Step 1 — Clone the repository

```bash
git clone git@github.com:alakeldev/akex.git
cd akex
```

#### Step 2 — Build the Docker image

```bash
npm run docker:build
```

This builds the development image defined in `docker/Dockerfile.dev`. Dependencies are installed inside the container and the packages are pre-built.

#### Step 3 — Start the container

```bash
npm run docker:start
```

Open **[http://localhost:3001](http://localhost:3001)** in your browser.

The container mounts your local source files as a volume, so any changes you make to `apps/` or `packages/` are reflected live without rebuilding the image.

#### Useful Docker commands

```bash
npm run docker:stop       # Stop the running container
npm run docker:rebuild    # Stop → rebuild image → start (use after changing dependencies)
```

---

### Verify everything works

After starting the app (either option), run these checks to confirm the full project is healthy:

```bash
# Type-check all packages and the app
npm run tsc:check

# Run all tests with coverage
npm run jest:test

# Lint all TypeScript/TSX files
npm run biome:check

# Lint all CSS/SCSS files
npm run stylelint:check
```

All four commands should exit with no errors on a clean clone.

---

### Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot find module '@akex/button'` | Run `npm run build:packages` — the packages must be built before the app resolves their types |
| `npm install` fails with peer dependency errors | Use `npm install --legacy-peer-deps` |
| Port 3001 already in use | Stop the conflicting process or change the port in `apps/web/package.json` and `compose.yml` |
| Docker hot-reload not working | Make sure you are using `npm run docker:start` (not a plain `docker run`); the compose file mounts your source as a volume |
| `lefthook: command not found` | Run `npx lefthook install` from the repo root |
| Tests fail with `Cannot find module 'motion/react'` | Run `npm install` from the repo root — the mock in `__mocks__/` requires the root dependencies to be installed |

---

## Packages

Each package is independently versioned and published under the `@akex` scope.
Full API documentation and live demos are in the **web app** — run `npm run dev:web` and open `http://localhost:3001`.

| Package | Version | Description |
|---------|---------|-------------|
| [`@akex/button`](packages/button) | 1.0.0 | Accessible button — 6 variants, 8 sizes, 8 motion animations |
| [`@akex/label`](packages/label) | 1.0.0 | Accessible label — 8 variants, 4 sizes, 8 motion animations |
| [`@akex/carousel`](packages/carousel) | 1.0.0 | Animated carousel — 5 transition presets, auto-play, keyboard nav |
| [`@akex/card`](packages/card) | 1.0.0 | Composable card — 5 variants, 4 motion animations (lift, tilt, glow, pop) |
| [`@akex/input`](packages/input) | 1.0.0 | Animated input — floating label, focus glow, shake-on-error |
| [`@akex/accordion`](packages/accordion) | 1.0.0 | Expandable panels — smooth height animation, single & multiple modes |
| [`@akex/utils`](packages/utils) | 1.0.0 | Shared utilities — `cn` class merger |

> Adding a new package? See [Adding a Package](#adding-a-package). Only this table needs updating — nothing else.

---

## Quick Start

```bash
# Install all dependencies
npm install

# Start docs & playground at http://localhost:3001
npm run dev:web
```

---

## Project Structure

```
akex/
├── apps/
│   ├── web/                   # Docs & playground (Next.js, port 3001)
│   │   └── app/
│   │       ├── page.tsx       # Package gallery
│   │       └── <package>/
│   │           └── page.tsx   # Per-package docs & live demos
│   └── mobile/                # Reserved for the future Expo showcase
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

Create `apps/web/app/<name>/page.tsx` — it appears in the gallery automatically.

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
npm run dev:web           # Web app → http://localhost:3001
npm run dev:packages      # Watch-build all packages in parallel
```

### Docker

```bash
npm run docker:build      # Build the container image
npm run docker:start      # Start (detached) — mounts source as volume for live reload
npm run docker:stop       # Stop
npm run docker:rebuild    # Stop → build → start (use after changing dependencies)
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
2. Follow the [Running Locally](#running-locally) guide to set up the project
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
