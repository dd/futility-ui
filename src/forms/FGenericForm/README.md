# FGenericForm

`FGenericForm` renders a form from a metadata array, reducing the amount of repetitive template
code needed for standard forms.


### Basic usage

Each entry in `meta` is dispatched to the matching widget from the `widgets` map.

```js
import { ref } from 'vue';
import { FGenericForm } from 'futility-ui';
// or
// import FGenericForm from 'futility-ui/forms/FGenericForm';
import { getFormDefaults } from 'futility-ui/forms/FGenericForm/utils';


const meta = [
	{
		type: 'email',
		label: 'Email',
		fields: [
			{ fieldName: 'email' },
		],
	},
];

const formData = ref(getFormDefaults(meta));
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
	* `default` - initial value used by `getFormDefaults`
	* `disabled` - disables interaction with the field
	* `readonly` - keeps the field visible but prevents editing
	* `required` - marks the field as required for validation and UI purposes
	* `allowNull` - when `true`, normalization preserves `null` instead of converting it to `''` or `false`; useful when the API field accepts `null` as a meaningful value

Some widgets also accept additional fields. For example, select-like widgets need an option list.
Check each widget's individual story for the full list of supported field parameters.
