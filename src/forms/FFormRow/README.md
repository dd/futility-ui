# FFormRow

`FFormRow` is a layout wrapper that pairs a label with one or more form fields.
It handles label alignment, help text, and error states in a consistent way across the form.


### Usage

```js
import { FFormRow } from 'futility-ui';
// or
import FFormRow from 'futility-ui/forms/FFormRow';
```

```html
<FFormRow id="name" >
	<template #label>Full name</template>
	<FInput id="name" v-model="value" placeholder="Enter name" />
	<template #help>As it appears on your ID</template>
</FFormRow>
```
