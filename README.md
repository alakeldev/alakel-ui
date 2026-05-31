<div align="center">

# AKEX

**Modern React Component Library**

Accessible, animated UI components shipped as independent npm packages from a Turborepo monorepo. Built with TypeScript, Tailwind CSS, and Motion.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-pink?logo=framer)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Packages](#-packages) · [Quick Start](#-quick-start) · [Adding a Package](#-adding-a-package) · [Testing](#-testing) · [Development](#-development) · [Contributing](#-contributing)

</div>

---

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@akex/button`](packages/button) | 1.0.0 | Accessible button — 6 variants, 8 sizes, 4 motion animations |
| [`@akex/utils`](packages/utils) | 1.0.0 | Shared utilities (`cn` class merger) |

> More packages are on the way. See [Adding a Package](#-adding-a-package) to contribute one.

---

## Quick Start

```bash
# Install dependencies
npm install

# Docs & playground at http://localhost:3001
npm run dev:akex
```

---

## Project Structure

```
akex/
├── packages/                  # Publishable packages (@akex/*)
│   ├── button/                # @akex/button
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── __tests__/
│   │   │   └── Button.test.tsx
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── utils/                 # @akex/utils
│   └── tsconfig.base.json     # Shared TypeScript base config
├── apps/
│   └── akex/                  # Next.js docs app (port 3001)
│       └── app/
│           ├── page.tsx       # Component gallery
│           └── button/
│               └── page.tsx   # Button docs & live demos
├── __mocks__/                 # Jest mocks (motion)
├── jest.config.cjs
├── jest.setup.cjs
├── biome.json
├── lefthook.yml
├── turbo.json
└── compose.yml
```

---

## Package Conventions

Every package under `packages/` follows the same shape:

```
packages/my-component/
├── src/
│   ├── MyComponent.tsx   # Component implementation
│   └── index.ts          # Public exports
├── __tests__/
│   └── MyComponent.test.tsx
├── package.json          # name: "@akex/my-component"
└── tsconfig.json         # extends ../tsconfig.base.json
```

TypeScript paths are resolved via a workspace wildcard — no manual config required:

```jsonc
// tsconfig.json (root)
"paths": { "@akex/*": ["./packages/*/src"] }
```

Import any package anywhere in the monorepo:

```ts
import { Button } from "@akex/button";
import { cn } from "@akex/utils";
```

---

## @akex/button

### Install

```bash
npm install @akex/button
```

### Usage

```tsx
import { Button } from "@akex/button";

<Button>Click me</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button animation="shimmer">Subscribe</Button>
```

### Variants

| `variant` | Style |
|-----------|-------|
| `default` | Solid primary background |
| `secondary` | Muted secondary background |
| `outline` | Bordered, transparent fill |
| `ghost` | No border, hover fill only |
| `destructive` | Red tones for dangerous actions |
| `link` | Underline-on-hover text link |

### Sizes

| `size` | Height |
|--------|--------|
| `xs` | 24 px |
| `sm` | 28 px |
| `default` | 32 px |
| `lg` | 36 px |
| `icon` | 32 × 32 px |
| `icon-xs` | 24 × 24 px |
| `icon-sm` | 28 × 28 px |
| `icon-lg` | 36 × 36 px |

### Animations

Pass `animation` to enable a Motion preset. Animations are suppressed automatically on disabled buttons.

| `animation` | Behaviour |
|-------------|-----------|
| `shimmer` | A glint sweeps left-to-right on loop — polished & eye-catching |
| `elastic` | X/Y axes squish in opposite directions — rubber-band feel |
| `glow` | Neon aura pulses continuously, blazes on hover — energetic CTA |
| `tilt` | 3-D perspective rotation on hover — elegant depth effect |

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `"default"` | Visual style |
| `size` | `string` | `"default"` | Dimensions |
| `animation` | `ButtonAnimation` | — | Motion preset |
| `disabled` | `boolean` | `false` | Disables interaction & animation |
| `className` | `string` | — | Extra Tailwind classes |
| `...props` | `ButtonProps` | — | All native button attributes |

---

## Adding a Package

1. Create the package directory:

```bash
mkdir packages/my-component
```

2. Add `package.json`:

```json
{
  "name": "@akex/my-component",
  "version": "0.1.0",
  "private": false,
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --out-dir dist",
    "dev": "tsup src/index.ts --watch --format esm,cjs --dts --out-dir dist",
    "test": "jest --config ../../jest.config.cjs --rootDir=../..",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

3. Add `tsconfig.json`:

```json
{
  "extends": "../tsconfig.base.json",
  "include": ["src"]
}
```

4. Write your component in `src/` and export it from `src/index.ts`.

5. Add a page under `apps/akex/app/my-component/page.tsx` to showcase it.

That's it — TypeScript paths, Jest module resolution, and Next.js transpilation all pick it up automatically.

---

## Testing

```bash
# Run all package tests with coverage
npm run jest:test

# Run tests for a single package
npm run test --workspace=packages/button

# Watch mode
npm run test:watch --workspace=packages/button
```

Tests live in `packages/<name>/__tests__/` and use **Jest 29** + **Testing Library** + **`@testing-library/user-event`**.

Motion is mocked in `__mocks__/motion-react.tsx` so animation wrappers render as plain spans without needing a real DOM animation engine.

### What to test in each package

- Rendering and children
- Every variant and size produces the expected class
- Disabled state (no interaction, no animation wrapper)
- Click and keyboard interactions via `userEvent`
- Animation wrappers and `data-animation` attribute
- Accessibility: role, aria attributes, keyboard focus

---

## Development

### Local

```bash
npm run dev:akex          # Docs app → http://localhost:3001
npm run dev:packages      # Watch-build all packages
```

### Docker

```bash
npm run docker:build      # Build container image
npm run docker:start      # Start (detached)
npm run docker:stop       # Stop
npm run docker:rebuild    # Stop → build → start
```

### Build

```bash
npm run build             # Build everything (Turborepo)
npm run build:packages    # Packages only
```

### Code quality

```bash
npm run biome:check       # Lint (Biome)
npm run biome:fix         # Lint + auto-fix
npm run stylelint:check   # CSS lint
npm run stylelint:fix     # CSS lint + auto-fix
npm run tsc:check         # TypeScript check (all packages + apps)
```

---

## Git Hooks (Lefthook)

Installed automatically on `npm install`. Run quality gates before every commit and push.

**`pre-commit`** (parallel):
- `biome` — lint + auto-fix, stage fixed files
- `stylelint` — CSS lint + auto-fix, stage fixed files
- `typecheck` — `tsc --noEmit` across all packages

**`pre-push`** (parallel):
- `jest` — full test suite with coverage
- `build` — build all packages

```bash
npx lefthook install         # Re-install after fresh clone
npx lefthook run pre-commit  # Run manually
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
| Git hooks | Lefthook | 1 |
| Container | Docker + Compose | — |
| Headless UI | @base-ui/react | 1.4 |
| Variant API | class-variance-authority | 0.7 |

---

## Contributing

1. Fork and clone the repository
2. `npm install`
3. Create a branch: `git checkout -b feat/your-feature`
4. Write code and tests — `npm run jest:test` must pass
5. Commit — Lefthook runs lint, format, and typecheck automatically
6. Push and open a Pull Request

**Commit conventions:**

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature or component |
| `fix:` | Bug fix |
| `test:` | Test additions or changes |
| `refactor:` | Code restructuring without behaviour change |
| `docs:` | Documentation only |
| `chore:` | Dependency updates, config changes |

---

## License

[MIT](LICENSE)


---

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@akex/button`](packages/button) | 1.0.0 | Accessible button — 6 variants, 8 sizes, 4 motion animations |
| [`@akex/utils`](packages/utils) | 1.0.0 | Shared utilities (`cn` class merger) |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the docs app on http://localhost:3001
npm run dev:akex
```

---

## Project Structure

```
akex/
├── packages/
│   ├── button/          # @akex/button — Button component
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── __tests__/
│   │       └── Button.test.tsx
│   ├── utils/           # @akex/utils — cn() helper
│   └── tsconfig.base.json
├── apps/
│   └── akex/            # Docs & playground (Next.js, port 3001)
│       └── app/
│           ├── page.tsx
│           └── button/
│               └── page.tsx
├── __mocks__/           # Jest mocks (motion)
├── jest.config.cjs
├── jest.setup.cjs
├── biome.json
├── lefthook.yml
├── turbo.json
└── compose.yml
```

---

## @akex/button

### Installation

```bash
npm install @akex/button
```

### Usage

```tsx
import { Button } from "@akex/button";

// Basic
<Button>Click me</Button>

// With variant and size
<Button variant="outline" size="sm">Cancel</Button>

// With animation
<Button animation="bounce">Submit</Button>
```

### Variants

| Value | Description |
|-------|-------------|
| `default` | Primary action — solid background |
| `secondary` | Secondary action — muted background |
| `outline` | Bordered, transparent background |
| `ghost` | No border, hover fill only |
| `destructive` | Destructive action — red tones |
| `link` | Underline-on-hover text link |

### Sizes

| Value | Height |
|-------|--------|
| `xs` | 24px |
| `sm` | 28px |
| `default` | 32px |
| `lg` | 36px |
| `icon` | 32×32px |
| `icon-xs` | 24×24px |
| `icon-sm` | 28×28px |
| `icon-lg` | 36×36px |

### Animations

Pass the `animation` prop to apply a built-in Motion preset. Animations are automatically disabled when `disabled={true}`.

| Value | Behaviour |
|-------|-----------|
| `bounce` | Spring scale on hover + tap — tactile click feedback |
| `pulse` | Continuous breathing scale — draws passive attention |
| `shake` | Rapid horizontal oscillation on hover — urgent CTA |
| `lift` | Smooth upward translate + scale on hover — elegant CTA |

```tsx
<Button animation="bounce">Save</Button>
<Button animation="pulse">Subscribe</Button>
<Button animation="shake">Alert</Button>
<Button animation="lift">Explore</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `"default"` | Visual style |
| `size` | `string` | `"default"` | Button dimensions |
| `animation` | `ButtonAnimation` | — | Motion preset |
| `disabled` | `boolean` | `false` | Disables interaction and animation |
| `className` | `string` | — | Additional Tailwind classes |
| `...props` | `ButtonProps` | — | All native button attributes |

---

## Testing

Tests use **Jest 29**, **Testing Library**, and **`@testing-library/user-event`**.

```bash
# Run all tests
npm run jest:test

# Run button tests only
npm run test --workspace=packages/button

# With coverage
npm run test:coverage --workspace=packages/button
```

### Test coverage areas

The button test suite (`packages/button/__tests__/Button.test.tsx`) covers:

- **Rendering** — element presence, children, `data-slot`, className merging
- **Variants** — all 6 variants produce the correct classes
- **Sizes** — all 8 sizes produce the correct classes
- **Disabled state** — disabled attribute, pointer-events, no animation wrapper
- **Interactions** — click, keyboard (Enter), disabled click prevention
- **Animations** — all 4 presets wrap in a motion element; `data-animation` attribute
- **Accessibility** — role, `aria-label`, `aria-disabled`, focus management
- **`buttonVariants` helper** — returns correct class strings

```
Tests: 42 passed, 42 total
```

---

## Development

### Local (recommended)

```bash
npm run dev:akex          # Docs app at http://localhost:3001
npm run dev:packages      # Watch-build all packages
```

### Docker

```bash
npm run docker:build      # Build container image
npm run docker:start      # Start container (detached)
npm run docker:stop       # Stop container
npm run docker:rebuild    # Stop → build → start
```

### Build

```bash
npm run build             # Build everything (Turborepo)
npm run build:packages    # Build packages only
```

### Code quality

```bash
npm run biome:check       # Lint check (Biome)
npm run biome:fix         # Lint + auto-fix
npm run stylelint:check   # CSS lint
npm run stylelint:fix     # CSS lint + auto-fix
npm run tsc:check         # TypeScript typecheck (all packages)
```

### Cleanup

```bash
npm run clean             # Remove dist, .next, node_modules
```

---

## Git Hooks (Lefthook)

Hooks run automatically on commit and push.

**`pre-commit`** (parallel):
- `biome` — lint + auto-fix, stage fixed files
- `stylelint` — CSS lint + auto-fix, stage fixed files
- `typecheck` — `tsc --noEmit` across all packages

**`pre-push`** (parallel):
- `jest` — full test suite with coverage
- `build` — build all packages

```bash
# Reinstall hooks after cloning
npx lefthook install

# Run hooks manually
npx lefthook run pre-commit
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
| Linter/Formatter | Biome | 2 |
| Testing | Jest + Testing Library | 29 / 16 |
| Git hooks | Lefthook | 1 |
| Container | Docker + Compose | — |
| Headless UI | @base-ui/react | 1.4 |
| Variant API | class-variance-authority | 0.7 |

---

## Contributing

1. Fork the repository and clone it locally
2. Install dependencies: `npm install`
3. Create a branch: `git checkout -b feat/your-feature`
4. Write code and tests — ensure `npm run jest:test` passes
5. Commit — Lefthook runs lint, format, and typecheck automatically
6. Push and open a Pull Request

**Commit conventions:**

```
feat:     new feature
fix:      bug fix
test:     test additions or changes
refactor: code restructuring without behaviour change
docs:     documentation only
chore:    maintenance (deps, config)
```

---

## License

[MIT](LICENSE)


---

