# Contributing

## Development Setup

Clone the repository and install dependencies:

```bash
git clone git@github.com:dd/futility-ui.git
cd futility-ui
pnpm install
```

Start the Storybook development server:

```bash
pnpm run storybook
```

To create a production-ready build:

```bash
pnpm run build
```


## Styles

We aim to support multiple style outputs when building the library:

* `styles.base.css` – Base stylesheet containing only the core component styles from the library.
* `styles.tailwind.css` – Extended stylesheet that includes both the component styles and all Tailwind CSS styles.

To support this setup, we extract styles from Vue `.vue` files into separate CSS files and centrally import them in `src/styles.css`.


## Tailwind CSS Guidelines

* Use Tailwind via `@apply` inside component-level CSS.
* **Avoid inline utility classes in Vue templates.**
* Atomic classes are okay only for Storybook demos or dev scaffolding — not production components.


## Contribution Workflow

1. Fork the repo on GitHub.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Make your changes.
4. Write meaningful commits.
5. Open a pull request with a clear description.

We welcome contributions of all sizes! ❤️
