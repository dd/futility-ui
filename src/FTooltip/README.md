# FTooltip

`FTooltip` wraps a trigger element and shows a floating tooltip on interaction.
Positioning is handled by [@floating-ui](https://floating-ui.com/); it automatically
flips and shifts to stay within the viewport.

> **Requires [`@floating-ui/vue`](https://floating-ui.com/docs/vue)** — install it
> alongside `futility-ui`:
> ```sh
> pnpm add @floating-ui/vue
> ```


### Component (simple)

```js
import { FTooltip } from 'futility-ui';
// or
import FTooltip from 'futility-ui/FTooltip';
```

```html
<FTooltip text="Hello world">
	<FButton>Hover me</FButton>
</FTooltip>
```


### Component (rich content)

```html
<FTooltip theme="dropdown" trigger="click" >
	<FButton>Open menu</FButton>
	<template #content>
		<div>Any <strong>rich</strong> content here</div>
	</template>
</FTooltip>
```
