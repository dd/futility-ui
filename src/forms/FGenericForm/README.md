# FGenericForm

`FGenericForm` renders a form from a metadata array, reducing the amount of repetitive template
code needed for standard forms.

> **Requires [@vueuse/core](https://vueuse.org/)** - used for responsive layout detection.

Some widgets from `DEFAULT_WIDGETS` have their own dependencies:

| Widget type | Extra dependency |
|---|---|
| `autocomplete` | [`@floating-ui/vue`](https://floating-ui.com/docs/vue), [`@vueuse/core`](https://vueuse.org/) |

```sh
# if you use the autocomplete widget
pnpm add @floating-ui/vue @vueuse/core
```


### Basic usage

Each entry in `meta` is dispatched to the matching widget from the `widgets` map.

```js
import { ref } from 'vue';
import { FGenericForm } from 'futility-ui';
// or
// import FGenericForm from 'futility-ui/forms/FGenericForm';
import { getFormDefaults } from 'futility-ui/forms/FGenericForm/utils';
import { DEFAULT_WIDGETS } from 'futility-ui/forms/FGenericForm/constants';


const meta = [
	{
		type: 'email',
		label: 'Email',
		fields: [
			{ fieldName: 'email' },
		],
	},
];

const formData = ref(getFormDefaults(meta, DEFAULT_WIDGETS));
```

```html
<FGenericForm v-model="formData" :meta="meta" />
```


### Meta structure

At minimum, each item in `meta` should define:

- `type` - the widget type to render
- `label` - optional label shown through `FFormRow`
- `helpText` - optional helper text shown below the field
- `fields` - an array of field definitions:
	* `fieldName` - unique field key used in `modelValue` and `errors`
	* `default` - explicit initial value; used as-is by `getFormDefaults` when present
	* `disabled` - disables interaction with the field
	* `readonly` - keeps the field visible but prevents editing
	* `required` - marks the field as required for validation and UI purposes
	* `allowNull` - when `true`, `null` is treated as a valid submitted value rather than "empty"; affects both default resolution (when `default` is absent) and widget behaviour

**Default resolution rules** (`getFormDefaults`):
- `default` key present → that value is used exactly as written, no normalisation
- `default` key absent → the widget's `normalize` function is called with `undefined` to produce a type-appropriate empty value (e.g. `''` for text, `false` for checkbox, `null` for text with `allowNull: true`)

This means `allowNull` affects the starting value of a field only when no explicit `default` is provided.

Some widgets also accept additional fields. For example, select-like widgets need an option list.
Check each widget's individual story for the full list of supported field parameters.
