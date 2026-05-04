# FModal

A modal window component with several ready-made layout components for common modal use cases.

> **Requires [vue-final-modal](https://vue-final-modal.org/)**


### Basic usage

```js
import { FModal, FMLayoutDefault } from 'futility-ui';
// Or import from individual entry points:
import FModal from 'futility-ui/FModal';
import FMLayoutDefault from 'futility-ui/FModal/layouts/FMLayoutDefault';
```

```html
<FModal v-model="isOpen">
	<template #default="{ close }">
		<FMLayoutDefault title="Title" @close="close">
			Modal content
			<template #footer>
				<FButton design="outline" @click="close">Cancel</FButton>
				<FButton @click="confirm">Confirm</FButton>
			</template>
		</FMLayoutDefault>
	</template>
</FModal>
```

Pass the layout component through the `default` slot. The slot exposes `{ close }` so content can close the modal.

The modal open state is synchronized through `v-model`.

Layout panel size is controlled by the `size` prop. Use one of the built-in presets, provide a custom size key for your own CSS, or pass an empty value to render the panel without a size class. When omitted, it defaults to `md`.
