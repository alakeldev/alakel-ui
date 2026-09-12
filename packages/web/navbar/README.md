# `@alakel/navbar`

A responsive, accessible, and animated React navbar for modern websites. It keeps the brand on the left and places configurable navigation on the right by default, while supporting left and centered navigation layouts.

Animations use Motion for React, the current package and documentation name for the library previously known as Framer Motion.

## Installation

Install the package from npm:

```bash
npm install @alakel/navbar
```

React and React DOM 18.2 or newer are required. React 19 is supported.

## Current features

- Any number of data-driven links and dropdown groups
- Accessible desktop dropdowns built with Radix Navigation Menu
- Responsive mobile drawer built with Radix Dialog
- Active-link state through `activeHref`
- Four Motion presets: `none`, `subtle`, `smooth`, and `spring`
- Configurable `sm`, `md`, or `lg` responsive collapse points
- Optional action, active indicator, sticky positioning, and mobile menu
- Default and floating visual treatments
- CSS custom properties for visual customization
- Reduced-motion support

## Usage

Import the component and its stylesheet:

```tsx
import { Navbar, type NavbarItem } from "@alakel/navbar";
import "@alakel/navbar/styles.css";

const items: readonly NavbarItem[] = [
  { type: "link", label: "Home", href: "/" },
  {
    type: "dropdown",
    label: "Products",
    items: [
      {
        type: "link",
        label: "Analytics",
        href: "/analytics",
        description: "Understand how people use your product.",
      },
      {
        type: "link",
        label: "Automation",
        href: "/automation",
        description: "Create reliable automated workflows.",
      },
    ],
  },
  { type: "link", label: "About", href: "/about" },
];

export function SiteNavbar() {
  return (
    <Navbar
      activeHref="/"
      brand={{ content: "Acme", href: "/", ariaLabel: "Acme home" }}
      items={items}
      action={<a href="/signup">Get started</a>}
      collapseAt="md"
      motion="smooth"
      onNavigate={(item) => console.log("Navigating to", item.href)}
    />
  );
}
```

A link with `external: true` opens in a new tab and receives `rel="noopener noreferrer"`. A dropdown accepts the same link objects in its `items` array.

The array controls the composition. Pass two objects for two navigation items, eight objects for eight items, only `link` objects for a navbar without dropdowns, or include any number of `dropdown` objects when dropdown navigation is needed. No separate count or dropdown toggle is required in application code.

## Main props

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `brand` | `NavbarBrand` | Required | Logo or wordmark content and an optional home link |
| `items` | `readonly NavbarItem[]` | Required | Top-level links and dropdown groups |
| `activeHref` | `string` | — | Marks an exact matching link as the current page |
| `alignment` | `"left" \| "center" \| "right"` | `"right"` | Positions desktop navigation |
| `action` | `ReactNode` | — | Adds content after the navigation |
| `sticky` | `boolean` | `false` | Keeps the navbar at the top while scrolling |
| `variant` | `"default" \| "floating"` | `"default"` | Selects the outer visual treatment |
| `motion` | `"none" \| "subtle" \| "smooth" \| "spring"` | `"smooth"` | Selects or disables Motion animation |
| `showActiveIndicator` | `boolean` | `true` | Shows or hides the active-link marker |
| `mobileMenu` | `boolean` | `true` | Enables or disables the responsive drawer |
| `collapseAt` | `"sm" \| "md" \| "lg"` | `"md"` | Chooses the responsive collapse point |
| `displayMode` | `"responsive" \| "desktop" \| "mobile"` | `"responsive"` | Uses breakpoints or forces a presentation mode |
| `dropdownDelay` | `number` | `100` | Changes the hover-open delay in milliseconds |
| `onNavigate` | `(item, event) => void` | — | Updates state or integrates a client-side router when a link is selected |

## Customize the design

Override the package variables from an app stylesheet:

```css
:root {
  --ak-navbar-accent: #7c3aed;
  --ak-navbar-background: rgba(8, 8, 12, 0.9);
  --ak-navbar-border: rgba(255, 255, 255, 0.12);
  --ak-navbar-foreground: #ffffff;
  --ak-navbar-muted: #a1a1aa;
  --ak-navbar-panel: #15151a;
  --ak-navbar-radius: 1rem;
  --ak-navbar-max-width: 80rem;
  --ak-navbar-height: 4.5rem;
}
```

## Local development

From the repository root, start the package watcher and documentation app together:

```bash
npm run dev
```

Then open `http://localhost:3001/web/navbar`. The interactive controls let you switch between 2, 4, 7, or 8 items, enable or disable the dropdown and mobile menu, change alignment and collapse width, force a desktop or mobile preview, and compare every Motion preset. Use Tab, Shift+Tab, Enter, Space, Escape, and the arrow keys to verify keyboard behavior.

Before publishing a release, run:

```bash
npm run biome:check
npm test
npm run tsc:check
npm run build
```

Inspect the exact files npm will include without publishing:

```bash
npm pack --dry-run --workspace=@alakel/navbar
```

## Build contract

The package uses Vite library mode and publishes ESM only:

- `dist/index.js` contains the runtime JavaScript.
- `dist/index.d.ts` and related declaration files contain the TypeScript API.
- `dist/styles.css` contains the required package styles.
- React and React DOM remain peer dependencies.
- Radix and Motion imports are externalized so the build does not bundle duplicate runtimes.

## License

Released under the [MIT License](./LICENSE).
