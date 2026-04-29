# FControlLabel

The `FControlLabel` component wraps form controls such as
[FCheckbox](?path=/docs/forms-fcheckbox--docs), [FSwitch](?path=/docs/forms-fswitch--docs),
[FRadioButton](?path=/docs/forms-fradiobutton--docs), or similar, and renders a label alongside them.


### Usage

Import the component:

```js
import { FControlLabel } from 'futility-ui'
// or
import FControlLabel from 'futility-ui/forms/FControlLabel'
```

Use the `label` prop for plain-text labels:

```html
<FControlLabel label="Simple label." >
	<FCheckbox v-model="value" />
</FControlLabel>
```

To include HTML or richer markup in the label, use the label slot.

> Wrap the content in a `<span>` or similar element to ensure proper layout.

```html
<FControlLabel>
	<FCheckbox v-model="value" />
	<template #label>Complex label with <i>html</i>.</template>
</FControlLabel>
```
