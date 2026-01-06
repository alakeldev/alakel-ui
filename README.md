# alakel-ui

A lightweight, accessible React component library for building consistent UIs.

## Features
- Reusable, themeable React components
- Accessible-by-default patterns
- Small footprint, easy to customize

## Installation
Using npm:
```bash
npm install alakel-ui
```
Using yarn:
```bash
yarn add alakel-ui
```

## Usage
Basic import example:
```jsx
import React from "react";
import { Button } from "alakel-ui";

export default function App() {
    return <Button onClick={() => console.log("clicked")}>Click me</Button>;
}
```

## Development
Install dev dependencies and run local dev tools:
```bash
npm install
npm run dev    # or npm run storybook / npm run start
npm run build
```

## Contributing
- Fork the repo, create a branch, make changes, open a PR.
- Follow the existing code style and include tests for new components.

## License
Specify a license (e.g., MIT) in LICENSE file.