# Contributing

## Styles

We aim to support multiple style outputs when building the library:

- A bundled single CSS file that includes styles for all components.
- A raw Tailwind CSS source file that can be used in consuming projects to customize things like themes and use utility classes directly. [WIP]

To achieve this, component styles must be extracted from Vue components and built separately.

## TailwindCSS

All Vue component styles should be written using Tailwind CSS utilities via component-level CSS (e.g. using `@apply`).
**Avoid inline atomic classes directly in templates** to keep markup clean and allow easier customization.
Atomic classes may be used for convenience in Storybook demos, but not in the actual components.
