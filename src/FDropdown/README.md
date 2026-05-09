# FDropdown

`FDropdown` wraps a trigger element and shows a floating dropdown panel on interaction.
Positioning is handled by [@floating-ui](https://floating-ui.com/); it automatically
flips and shifts to stay within the viewport.

> **Requires [@floating-ui/vue](https://floating-ui.com/docs/vue) and
> [@vueuse/core](https://vueuse.org/)**

```js
import { FDropdown } from 'futility-ui';
// or
import FDropdown from 'futility-ui/FDropdown';
```

```html
<FDropdown>
	<template #trigger>
		<FButton>Open menu</FButton>
	</template>
	<div>Content</div>
</FDropdown>
```
