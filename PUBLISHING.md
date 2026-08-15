# Publishing `@alakel/*` packages to npm

This guide walks you through publishing your packages to the **public npm registry**
so anyone (including your friends) can install them with `npm install @alakel/button`.

Publishing public packages to npm is **100% free**.

---

## Table of contents

1. [One-time setup](#1-one-time-setup)
2. [Before every release: the checklist](#2-before-every-release-the-checklist)
3. [Publishing for the first time](#3-publishing-for-the-first-time)
4. [Publishing updates (new versions)](#4-publishing-updates-new-versions)
5. [How your friends install the packages](#5-how-your-friends-install-the-packages)
6. [Troubleshooting](#6-troubleshooting)
7. [Reference: how this repo is configured](#7-reference-how-this-repo-is-configured)

---

## 1. One-time setup

### Step 1.1 — Secure your npm account

1. Sign in at <https://www.npmjs.com/> with an account authorized to publish for Alakel.
2. Verify the account email address.
3. **Enable 2FA** (Account Settings → Two-Factor Authentication). npm requires it for publishing.

### Step 1.2 — Confirm access to the `@alakel` scope

The `@alakel` organization and scope already exist. Only authorized organization
members can publish packages such as `@alakel/button`. Confirm that your npm
account appears in the organization's member settings with the required access.

### Step 1.3 — Log in from your terminal

```bash
npm login
```

Enter your username, password, email, and the 2FA code. Verify it worked:

```bash
npm whoami
```

It should print your username.

---

## 2. Before every release: the checklist

Run these from the repo root. All must pass before you publish.

```bash
# 1. Install dependencies
npm install

# 2. Type-check every package
npm run tsc:check

# 3. Run the full test suite
npm run jest:test

# 4. Lint & format
npm run biome:check

# 5. Build the publishable packages (creates the dist/ folders)
npm run build:packages
```

If all five are green, you're ready to publish.

---

## 3. Publishing for the first time

### Step 3.1 — Decide your starting version

Every package currently sits at `1.0.0`. That's a fine first public version.
Versions follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

| Change type | Example | Bump |
|-------------|---------|------|
| Bug fix, no API change | `1.0.0 → 1.0.1` | PATCH |
| New feature, backward-compatible | `1.0.0 → 1.1.0` | MINOR |
| Breaking change | `1.0.0 → 2.0.0` | MAJOR |

### Step 3.2 — Do a dry run first (nothing is uploaded)

A dry run shows you **exactly which files** would be published, without uploading.

```bash
# From the repo root — checks the utils package as an example
npm publish --workspace=packages/utils --dry-run
```

Confirm the output only lists the `dist/` files and `package.json`
(never `src/`, tests, or secrets).

### Step 3.3 — Publish in the correct order

`@alakel/utils` is a dependency of the others, so **publish it first**.

```bash
# 1. Publish the shared utility first
npm publish --workspace=packages/utils

# 2. Then the components (any order)
npm publish --workspace=packages/button
npm publish --workspace=packages/label
npm publish --workspace=packages/carousel
```

You'll be asked for your 2FA code each time.

> **Shortcut:** this repo also has a script that builds and publishes everything:
> ```bash
> npm run publish:packages
> ```
> Use the manual order above for your **first** publish so you can watch each one
> succeed; use the shortcut later once you're comfortable.

### Step 3.4 — Verify

Visit `https://www.npmjs.com/package/@alakel/button` (and the others).
They should now be live.

---

## 4. Publishing updates (new versions)

You **cannot** republish a version number that already exists. To ship changes:

### Step 4.1 — Bump the version

For a single package:

```bash
# patch | minor | major
npm version patch --workspace=packages/button
```

This updates that package's `package.json` version automatically.

> If a package depends on another that you also changed (e.g. you updated
> `@alakel/utils` and want components to require the new version), bump both and
> publish `utils` first.

### Step 4.2 — Re-run the checklist + publish

```bash
npm run build:packages
npm publish --workspace=packages/button
```

---

## 5. How your friends install the packages

Once published, **no special setup is needed**. In any React project they run:

```bash
npm install @alakel/button
```

Then use it:

```tsx
import { Button } from "@alakel/button";

export default function App() {
  return <Button animation="shimmer">Click me</Button>;
}
```

### Important notes for consumers

- **React is a peer dependency.** Their project must have React 19 installed.
  npm will warn them if it's missing.
- **Tailwind classes.** These components use Tailwind utility classes and CSS
  variables (e.g. `text-primary`, `bg-secondary`). Consumers need Tailwind set up
  with the matching CSS variables, **or** the components will render unstyled.
  Document the required CSS variables in each package's README so friends can copy them.

---

## 6. Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `402 Payment Required` | Publishing a scoped package as private | Already fixed — each package has `"publishConfig": { "access": "public" }`. Make sure it's there. |
| `403 Forbidden` | Name taken, or not logged in, or no permission | Run `npm whoami`; pick a different scope/name if taken. |
| `You cannot publish over previously published versions` | Version already exists | Bump the version (`npm version patch`). |
| `ENEEDAUTH` | Not logged in | Run `npm login`. |
| Friend sees unstyled components | Missing Tailwind / CSS variables | Share the required Tailwind config + CSS variables. |
| `EOTP` / wrong code | 2FA code expired | Re-enter the current 6-digit code quickly. |

---

## 7. Reference: how this repo is configured

These settings are **already in place** — listed here so you understand what each does.

| Setting | Where | Purpose |
|---------|-------|---------|
| `"private": false` | each `packages/*/package.json` | Allows the package to be published. |
| `"publishConfig": { "access": "public" }` | each `packages/*/package.json` | Publishes the scoped package publicly (and free). |
| `"files": ["dist"]` | each `packages/*/package.json` | Only the built `dist/` folder is uploaded — never your source. |
| `"main"`, `"module"`, `"types"` | each `packages/*/package.json` | Tells consumers where the CommonJS, ESM, and TypeScript type entry points are. |
| `"peerDependencies": { react }` | each component package | Consumers bring their own React — avoids duplicate React copies. |
| `"@alakel/utils": "*"` | button/label/carousel deps | Uses the latest published `@alakel/utils`. Always publish `utils` first. |
| `tsup ... --dts` | build script | Generates the JS bundles **and** `.d.ts` type definitions. |

> **One thing to know about `"@alakel/utils": "*"`:** the `*` means "any version".
> When a friend installs `@alakel/button`, npm pulls the **latest** published
> `@alakel/utils`. This is fine as long as you always publish `@alakel/utils` first and
> keep it backward-compatible. If you ever want stricter guarantees, replace `*`
> with the exact version (e.g. `"1.0.0"`) before publishing.
