<div align="center">

# 🎨 SYR UI

**Modern React Component Library**

A production-ready UI component library built with TypeScript and Tailwind CSS. Featuring dynamic path resolution, optimized Docker builds, comprehensive testing, and CI/CD integration.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features-highlight) • [Quick Start](#-quick-start) • [Documentation](#-table-of-contents) • [Contributing](#-contributing)

</div>

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev:syr-ui       # Runs on http://localhost:3001

# Or use Docker (production-like environment)
npm run docker:build     # First time only (~52s)
npm start                # Start container + logs
```

**Live App:** http://localhost:3001 - Interactive documentation and component playground

---

## 📚 Table of Contents

1. [Project Structure](#-project-structure)
2. [Development Workflow](#-development-workflow)
3. [Testing](#-testing)
4. [Git Hooks (Lefthook)](#-git-hooks-lefthook)
5. [CI/CD Pipeline](#-cicd-pipeline)
6. [Docker](#-docker)
7. [Package Management](#-package-management)
8. [GitHub Configuration](#-github-configuration)
9. [Commands Reference](#-commands-reference)
10. [Tech Stack](#-tech-stack)
11. [Troubleshooting](#-troubleshooting)

---

## 📦 Project Structure

```
syr-ui/
├── packages/                    # Independent, publishable components
│   ├── [package-name]/          # Each package follows the pattern @syr-ui/[name]
│   │   ├── src/
│   │   │   ├── [Component].tsx # Component implementation
│   │   │   └── index.ts        # Public exports
│   │   ├── __tests__/          # Jest + Testing Library tests
│   │   ├── package.json        # Published to npm
│   │   └── tsconfig.json       # Extends tsconfig.base.json
│   │
│   ├── utils/                   # Shared utilities (cn function)
│   ├── button/                  # Button component with variants
│   ├── card/                    # Card with subcomponents
│   ├── label/                   # Accessible label component
│   └── tsconfig.base.json       # 🔥 Dynamic path resolution
├── apps/
│   └── syr-ui/                  # Main app (Docs + Playground)
│       ├── app/
│       │   ├── page.tsx        # Component gallery
│       │   ├── button/         # Button demos & examples
│       │   ├── card/           # Card demos & examples
│       │   └── label/          # Label demos & examples
│       ├── next.config.js      # 🔥 Auto-discovers packages
│       └── package.json        # Runs on port 3001
├── docker/
│   ├── Dockerfile.dev          # Development container
│   ├── Dockerfile.test         # Test container
│   └── .dockerignore           # Build optimization
├── .github/workflows/
│   └── ci.yml                  # GitHub Actions (5 jobs)
├── compose.yml                 # Docker orchestration
├── lefthook.yml                # Git hooks (auto-fix & check)
├── jest.config.cjs             # Testing configuration
├── turbo.json                  # Monorepo task orchestration
├── biome.json                  # Linter & formatter
└── package.json                # Workspace root
```

### Key Features

- 🎯 **Dynamic TypeScript Paths** - Auto-discovers packages, no manual configuration
- ⚡ **Optimized Docker** - Layer caching reduces rebuilds from 52s to 6s
- 🔥 **Auto-Discovery** - Add new packages without config updates
- 📦 **Independent Versioning** - Each package manages its own version
- 🧪 **Comprehensive Testing** - Jest + Testing Library with coverage

---

## 🚀 Development Workflow

### Option 1: Local Development (Recommended for Active Development)

**Best for:** Quick iterations, hot-reload, active coding

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev:syr-ui       # SYR UI app on port 3001

# Access the app
# http://localhost:3001 - Component documentation + playground
```

**Features:**
- ✅ **Hot-reload** - Changes appear instantly
- ✅ **Fast** - No rebuild needed
- ✅ **Perfect for** - Active development and testing

---

### Option 2: Docker Development (Testing/Production Environment)

**Best for:** Testing before deployment, production-like environment

```bash
# Build image (first time: ~52s, subsequent: ~6s with cache)
npm run docker:build

# Start container
npm start                # Start + view logs
# OR
npm run docker:up        # Start in background

# Stop container
npm stop                 # Stop container

# Access the app
# http://localhost:3001 - Component documentation + playground
```

**Features:**
- ✅ **Production-like** - Identical to deployment environment
- ✅ **Isolated** - Separate from local environment
- ✅ **Optimized** - Layer caching reduces rebuild time by 8.4x

**Note:** Docker requires rebuild after code changes (not hot-reload)

---

### Making Changes with Docker

```bash
# 1. Make your changes
vim packages/button/src/Button.tsx

# 2. Rebuild (only changed layers rebuild - fast!)
npm run docker:rebuild   # ~6 seconds with cache

# 3. Verify changes
# http://localhost:3001
```

---

### When to Use What?

| Scenario | Local Dev | Docker |
|----------|-----------|--------|
| **Active coding** | ✅ Best | ❌ Slow |
| **Quick iterations** | ✅ Hot-reload | ❌ Requires rebuild |
| **Testing before commit** | ⚠️ May differ | ✅ Production-like |
| **CI/CD pipeline** | ❌ | ✅ Required |

**💡 Recommended workflow:**
1. **Develop locally** → Fast hot-reload
2. **Test in Docker** → Verify before committing
3. **Push to GitHub** → CI/CD validates automatically

---

## 🧪 Testing

### Test Infrastructure

- **Jest 29.7.0**: Test runner with ts-jest
- **Testing Library**: Component testing (@testing-library/react)
- **Coverage**: lcov + html reports
- **TypeScript**: Full type safety in tests

### Current Test Status

Run `npm test` to see the current test results for all packages.

Each package includes:
- Unit tests for component logic
- Accessibility tests
- Visual regression tests (where applicable)

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (runs on file changes)
npm run test:watch

# Test specific package
npm run test:packages

# Generate coverage report
npm run test:coverage
# View: coverage/lcov-report/index.html
```

### Test in Docker

```bash
# Build test container
npm run docker:test:build

# Run tests in Docker
npm run docker:test:run

# Or both at once
npm run docker:test
```

### Writing Tests

Tests go in `__tests__/` directory in each package:

```typescript
// packages/button/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../src/Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

---

## 🎣 Git Hooks (Lefthook)

### What is Lefthook?

**Lefthook** automatically runs quality checks **before** you commit/push code.

Think of it as a **guard** that prevents bad code from reaching GitHub.

### How It Works

```
You: git commit -m "update button"
        ↓
Lefthook intercepts
        ↓
Runs checks:
  ✅ Biome lint (auto-fixes)
  ✅ Format code
  ✅ TypeScript check
        ↓
All pass? → Commit succeeds ✅
Any fail? → Commit blocked ❌
```

### Configuration (lefthook.yml)

```yaml
pre-commit:           # Before git commit
  parallel: true      # Run all checks simultaneously
  commands:
    lint:
      run: npm run lint:fix
      stage_fixed: true    # Auto-add fixed files
    format:
      run: npm run format
      stage_fixed: true
    typecheck:
      run: npm run typecheck

pre-push:            # Before git push
  parallel: true
  commands:
    test:
      run: npm test
    build:
      run: npm run build:packages
```

### Benefits

🚀 **Catches errors early** - Before they reach GitHub  
🔧 **Auto-fixes** - Lint and format automatically  
⚡ **Fast** - Parallel execution  
🛡️ **Quality gate** - Prevents bad code

### Manual Testing

```bash
# Test pre-commit checks
npx lefthook run pre-commit

# Test pre-push checks  
npx lefthook run pre-push

# Skip hooks (emergency only)
git commit --no-verify
git push --no-verify
```

---

## 🚀 CI/CD Pipeline

### What is CI/CD?

**CI** (Continuous Integration): Automatically test code when pushed  
**CD** (Continuous Deployment): Automatically deploy if tests pass

### Pipeline Overview

When you push to GitHub, **5 jobs** run automatically:

```
git push origin main
        ↓
GitHub Actions triggers
        ↓
Job 1: Lint & Type Check  (15s)
Job 2: Test Packages      (45s)  
Job 3: Build Everything   (30s)
Job 4: Docker Test        (2m30s)
Job 5: Docker Build       (3m) - main branch only
        ↓
All pass? → ✅ Ready to deploy
Any fail? → ❌ GitHub shows error
```

### GitHub Actions Configuration

File: `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

**Jobs:**

1. **lint-and-typecheck**
   - Biome linter check
   - TypeScript type checking
   - Runs in parallel with test

2. **test**
   - Build packages (required for tests)
   - Run Jest tests
   - Upload coverage to Codecov
   - Runs in parallel with lint

3. **build** (requires lint + test)
   - Build all packages
   - Build all apps (syr-ui)

4. **docker-test** (parallel)
   - Build test Docker image
   - Run tests inside container

5. **docker** (requires build, main only)
   - Build Docker images
   - Test containers start correctly

### Viewing Results

1. Push your code: `git push origin main`
2. Go to your repository's **Actions** tab on GitHub
3. Click on your workflow run
4. See detailed logs for each job

### Status Badge

Add to your README to show build status:

```markdown
[![CI/CD](https://github.com/alakeldev/syr-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/alakeldev/syr-ui/actions/workflows/ci.yml)
```

### Lefthook vs CI/CD

| Feature | Lefthook | CI/CD |
|---------|----------|-------|
| **Runs on** | Your computer | GitHub servers |
| **When** | Before commit/push | After push |
| **Speed** | Fast (2-5s) | Slower (4-5m) |
| **Can skip** | Yes (`--no-verify`) | No |
| **Purpose** | Catch early | Final verification |

**Think of it as:**
- **Lefthook** = Quick check at your desk
- **CI/CD** = Final check at GitHub

---

## 🐋 Docker

### Optimized Build Strategy

Our Docker setup uses **layer caching** for dramatically faster rebuilds:

| Build Type | Time | Speed |
|------------|------|-------|
| **First build** (clean) | 52.6s | Baseline |
| **After code change** | **6.3s** | **8.4x faster** ⚡ |

### How It Works

The Dockerfile is structured to maximize cache hits:

```dockerfile
# Step 1: Copy package.json files only
COPY package.json package-lock.json turbo.json ./
COPY packages/*/package.json ./packages/
COPY apps/*/package.json ./apps/

# Step 2: Install dependencies (CACHED unless package.json changes)
RUN npm ci --legacy-peer-deps

# Step 3: Copy config files
COPY biome.json tsconfig.json ./
COPY packages/tsconfig.base.json ./packages/

# Step 4: Copy source code (changes frequently)
COPY packages ./packages
COPY apps ./apps

# Step 5: Build packages
RUN npm run build:packages
```

**Result:** Dependency installation (slowest part) stays cached when you only change source code!

---

### Docker Files

#### **Dockerfile.dev**
- **Purpose:** Development container
- **Base:** Node.js 22 Alpine
- **Optimized:** Layer caching + npm cache mount
- **Used by:** `compose.yml`

#### **Dockerfile.test**
- **Purpose:** Isolated test environment
- **Base:** Node.js 22 Alpine
- **Used by:** CI/CD + local testing
- **Output:** Coverage reports

#### **compose.yml**
- **Services:** syr-ui (port 3001)
- **Network:** Internal communication
- **Command:** `npm run dev:syr-ui`

#### **.dockerignore**
- **Purpose:** Reduces build context from ~500MB to ~5MB
- **Excludes:** node_modules, coverage, .git, .next, dist

---

### Docker Commands

```bash
# Development
npm run docker:build         # Build image (~52s first time, ~6s cached)
npm start                    # Start + view logs
npm stop                     # Stop container
npm run docker:rebuild       # Rebuild after changes (~6s)

# Testing
npm run docker:test          # Build + run tests
npm run docker:test:build    # Build test image
npm run docker:test:run      # Run tests in container

# Monitoring
docker ps                    # List running containers
docker logs syr-ui           # View logs

# Cleanup
npm run docker:down          # Stop and remove
docker system prune          # Clean unused resources
```

---

## 📦 Package Management

### Dynamic Path Resolution 🔥

**Zero manual configuration needed!** The project uses automatic package discovery:

#### **Root tsconfig.json**
```json
"paths": {
  "@syr-ui/*": ["./packages/*/src"]  // Wildcard matches ALL packages
}
```

#### **packages/tsconfig.base.json**
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "paths": {
      "@syr-ui/*": ["../*/src"]  // Auto-discovers sibling packages
    }
  }
}
```

#### **apps/syr-ui/next.config.js**
```javascript
const packages = fs.readdirSync(packagesDir)
  .filter(name => fs.statSync(path.join(packagesDir, name)).isDirectory());

// Auto-generates:
// - transpilePackages: ["@syr-ui/[package]", ...]
// - webpack aliases for all packages
```

**Result:** Add a new package → No configuration updates needed! ✨

---

### Package Discovery

All packages in `packages/` are automatically:
- Published to npm with the `@syr-ui/*` namespace
- Discovered by Next.js transpiler
- Resolved via TypeScript path mappings
- Available to import in the main app

**To view all packages:** Check the `packages/` directory or run `ls packages/`

---

### Independent Versioning

Each package manages its own version following [Semantic Versioning](https://semver.org/):

```bash
# Bug fix (backwards compatible)
1.0.0 → 1.0.1

# New feature (backwards compatible)
1.0.0 → 1.1.0

# Breaking change
1.0.0 → 2.0.0
```

### Publishing Packages

```bash
# Build all packages
npm run build:packages

# Publish individual package
cd packages/button
npm publish --access public

# Or publish all workspaces at once
npm run publish:packages
```

---

### Adding a New Package

```bash
# 1. Create package directory
mkdir packages/my-component

# 2. Add minimal package.json
{
  "name": "@syr-ui/my-component",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --out-dir dist"
  }
}

# 3. Add tsconfig.json (generic - works for all packages)
{
  "extends": "../tsconfig.base.json",
  "include": ["src"]
}

# 4. Create your component
mkdir packages/my-component/src
echo "export const MyComponent = () => <div>Hello</div>;" > packages/my-component/src/index.tsx

# 5. Done! Auto-discovered everywhere:
# - Import: import { MyComponent } from "@syr-ui/my-component"
# - next.config.js finds it automatically
# - TypeScript resolves it via wildcard paths
# - Jest tests work without config changes
```

No manual configuration needed anywhere! 🎉

---

## 🔧 GitHub Configuration

### Requirements

✅ **For basic CI/CD:** Nothing! Just push your code  
✅ **Public or Private:** Works with both  
✅ **GitHub Actions:** 2,000 free minutes/month (public repos get unlimited)

### Optional: Recommended Settings

#### 1. Branch Protection

Prevent pushing broken code to `main`:

1. Go to: **Settings → Branches → Add rule for `main`**
2. Enable: **"Require status checks to pass before merging"**
3. Select: `lint-and-typecheck`, `test`, `build`
4. Enable: **"Require pull request before merging"**

**Benefit:** Enforces code review and CI checks

#### 2. Codecov Integration (Optional)

Visual test coverage reports:

1. Sign up at https://codecov.io/
2. Add your repository
3. Get your `CODECOV_TOKEN` from Codecov settings
4. Add token: **Settings → Secrets → New repository secret**
   - Name: `CODECOV_TOKEN`
   - Value: [your token from codecov.io]
5. Coverage reports will appear on pull requests

**Benefit:** Track coverage trends and visualize reports

#### 3. Status Badge

Add to top of README:

```markdown
[![CI/CD](https://github.com/alakeldev/syr-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/alakeldev/syr-ui/actions/workflows/ci.yml)
```

**Benefit:** Show build status to visitors

### First Push

```bash
# Stage all files
git add .

# Commit (Lefthook runs: lint, format, typecheck)
git commit -m "feat: initial syr-ui framework setup"

# Push (Lefthook runs: test, build, then GitHub Actions triggers)
git push origin main

# View CI/CD results
# GitHub → Actions tab → Latest workflow run
```

---

## 📋 Commands Reference

### Development

```bash
# Local development (hot-reload)
npm run dev:syr-ui       # SYR UI app (port 3001)
npm run dev:packages     # Watch packages for changes

# Docker development (production-like)
npm start                # Start + view logs
npm stop                 # Stop container
npm run docker:build     # Build image (~52s first time, ~6s cached)
npm run docker:rebuild   # Rebuild after changes (~6s)
npm run docker:up        # Start in background
npm run docker:down      # Stop + remove
```

### Testing

```bash
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:packages    # Test packages only
npm run test:coverage    # Generate coverage report

# Docker testing
npm run docker:test          # Build + run tests
npm run docker:test:build    # Build test image
npm run docker:test:run      # Run tests in container
```

### Building

```bash
npm run build            # Build everything
npm run build:packages   # Build packages only
```

### Code Quality

```bash
npm run biome:check      # Lint check
npm run biome:fix        # Lint + auto-fix
npm run stylelint:check  # CSS lint check
npm run stylelint:fix    # CSS lint + auto-fix
npm run tsc:check        # TypeScript type check
```

### Git Hooks

```bash
npx lefthook run pre-commit    # Test pre-commit hooks
npx lefthook run pre-push      # Test pre-push hooks
npx lefthook install           # Reinstall hooks
```

### Cleanup

```bash
npm run clean            # Remove dist, .next, node_modules
docker system prune      # Clean Docker resources
```

---

## 🛠️ Tech Stack

### Core Framework

- **React** 19.2.3 - UI library with React 19 features
- **TypeScript** 5.9.3 - Type safety
- **Next.js** 16.2.4 - Full-stack framework (App Router)
- **Tailwind CSS** 3.4.19 - Utility-first CSS

### Build & Tooling

- **Turborepo** 2.9.7 - Monorepo task runner with caching
- **tsup** 8.5.1 - Fast TypeScript bundler (ESM + CJS)
- **npm workspaces** - Package management and linking
- **Biome** 2.3.11 - Rust-based linter & formatter

### Testing

- **Jest** 29.7.0 - Test runner
- **ts-jest** - TypeScript support for Jest
- **Testing Library** 16.1.0 - Component testing
- **jest-dom** - Custom Jest matchers

### UI Components

- **@base-ui/react** 1.4.1 - Headless UI primitives
- **class-variance-authority** - Variant-based styling
- **clsx** + **tailwind-merge** - Conditional classes

### Development

- **Lefthook** 1.13.6 - Git hooks manager
- **Docker** + **Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline

### Package Outputs

Each package builds to:
- **ESM** (.mjs) - Modern JavaScript modules
- **CJS** (.js) - CommonJS for Node.js
- **Types** (.d.ts) - TypeScript declarations

---

## 🐛 Troubleshooting

### Docker Issues

#### Containers won't start

```bash
# Check if port 3001 is in use
lsof -ti:3001

# Kill processes using the port
pkill -f "next dev"

# Remove old containers and rebuild
npm run docker:down
npm run docker:build
npm start
```

#### Changes not showing in Docker

```bash
# Remember: Docker requires rebuild!
npm run docker:rebuild

# Check containers are actually running
docker ps

# View logs for errors
npm run docker:logs
```

#### Permission errors

```bash
# Fix ownership (if Docker created files as root)
sudo chown -R $USER:$USER .

# Or remove and rebuild
rm -rf apps/*/node_modules apps/*/.next
npm run docker:rebuild
```

### Testing Issues

#### Tests failing

```bash
# Run tests locally first
npm test

# Check specific package
npm run test:packages

# View coverage for issues
npm run test:coverage
open coverage/lcov-report/index.html
```

#### Type errors in tests

```bash
# Make sure Jest types are installed
npm install --save-dev @types/jest

# Rebuild packages
npm run build:packages

# Run typecheck
npm run typecheck
```

### Lefthook Issues

#### Hooks not running

```bash
# Check Lefthook is installed
npx lefthook version

# Reinstall hooks
npx lefthook install

# Verify hooks exist
ls -la .git/hooks/
# Should see: pre-commit, pre-push (not .sample)
```

#### Want to skip hooks (emergency)

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify

# ⚠️ Warning: CI/CD will still run on GitHub
```

### GitHub Actions Issues

#### Workflow not running

1. Push to `main` or `develop` branch
2. Check Actions tab on GitHub
3. Verify Actions is enabled: Settings → Actions
4. Check workflow file: `.github/workflows/ci.yml`

#### Tests passing locally but failing on CI

```bash
# Run exact CI commands locally
npm ci                    # Clean install (like CI)
npm run build:packages    # Build packages first
npm run test:packages     # Run tests

# Check Node version matches (CI uses Node 22)
node --version
```

### Build Errors

```bash
# Clean everything
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild packages
npm run build:packages

# Test in Docker
npm run docker:rebuild
```

### Port Conflicts

```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use pkill for Next.js processes
pkill -f "next dev"
```

---

## 📚 Additional Resources

- **Turborepo Docs**: https://turbo.build/repo/docs
- **Next.js App Router**: https://nextjs.org/docs/app
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Biome**: https://biomejs.dev/
- **Jest**: https://jestjs.io/
- **Testing Library**: https://testing-library.com/
- **Lefthook**: https://github.com/evilmartians/lefthook
- **Docker Compose**: https://docs.docker.com/compose/

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/alakeldev/syr-ui.git
   cd syr-ui
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Start** the development server:
   ```bash
   npm run dev:syr-ui
   ```

### Making Changes

1. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/new-component
   # or
   git checkout -b fix/button-styling
   ```

2. **Make your changes** following these guidelines:
   - Write tests for new features
   - Follow existing code style (Biome auto-formats on commit)
   - Update documentation if needed
   - Keep commits focused and atomic

3. **Test your changes**:
   ```bash
   npm test                    # Run tests
   npm run typecheck           # Check types
   npm run build:packages      # Ensure builds work
   ```

4. **Commit** your changes:
   ```bash
   git commit -m "feat: add new component"
   # Lefthook runs automatically: lint, format, typecheck
   ```

   **Commit conventions:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `test:` - Test additions/changes
   - `refactor:` - Code refactoring
   - `chore:` - Maintenance tasks

5. **Push** to your fork:
   ```bash
   git push origin feature/new-component
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Link to related issues (if any)
   - Screenshots for UI changes

### Adding a New Component

See the [Adding a New Package](#adding-a-new-package) section for detailed instructions.

### Code Review Process

- All PRs require at least one review
- CI/CD must pass (5 automated checks)
- Changes should be tested in Docker before merging

### Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase
- Improvement suggestions

---

## 📄 License

MIT License - feel free to use this in your projects!

**Note:** Add a `LICENSE` file to your repository with the full MIT License text.

---

## 🌟 Features Highlight

- ✅ **Zero Config** - Dynamic paths, auto-discovery
- ⚡ **Fast Docker** - 8.4x faster rebuilds with layer caching
- 🎯 **Type Safe** - Full TypeScript support
- 🧪 **Tested** - Jest + Testing Library
- 🚀 **CI/CD Ready** - GitHub Actions included
- 📦 **Monorepo** - Turborepo with independent versioning
- 🎨 **Modern Stack** - React 19, Next.js 16, Tailwind CSS

---

**SYR UI** - Production-ready React component library
