# FDropdown

`FDropdown` wraps a trigger element and shows a floating dropdown panel on interaction.

`open-on` sets what opens the panel: `click` (default), `hover` (pointer or keyboard focus) or
`manual` (only `v-model:open`). The old `trigger` prop still works but is deprecated.

For select-like controls, `match-trigger-width` can keep the panel aligned with the trigger. `close-on-outside` overrides the default outside-click behavior independently of `open-on`; this is useful for manually controlled autocomplete popups. Positioning is handled by [@floating-ui](https://floating-ui.com/); it automatically flips and shifts to stay within the viewport.

> **Requires [@floating-ui/vue](https://floating-ui.com/docs/vue) and
> [@vueuse/core](https://vueuse.org/)**

```js
import { FDropdown } from 'futility-ui';
// or
import FDropdown from 'futility-ui/FDropdown';
```

```html
<FDropdown>
	<template #trigger="{ triggerAttrs }">
		<FButton v-bind="triggerAttrs">Open menu</FButton>
	</template>
	<div>Content</div>
</FDropdown>
```

The `trigger` slot receives `triggerAttrs` - `aria-expanded` and `aria-controls` pointing at the
panel. Bind them to the focusable trigger element. Add `aria-haspopup` yourself when the content
is a `menu` or a `listbox`.

The panel height is limited by the space available in the viewport; long content scrolls inside.
FDropdown exposes the geometry as CSS variables on the panel: `--fui-dropdown-available-height`
and `--fui-dropdown-trigger-width`.
