# FGenericForm

`FGenericForm` renders a form from a metadata array, reducing the amount of repetitive template
code needed for standard forms.


### Installation

```js
import { FGenericForm } from 'futility-ui';
// or
import FGenericForm from 'futility-ui/forms/FGenericForm';
```


### Basic usage

Each entry in `meta` is dispatched to the matching widget from the `widgets` map.

```js
import { FGenericForm, getFormDefaults } from 'futility-ui';
import { ref } from 'vue';

const meta = [
	{
		type: 'email',
		label: 'Email',
		fields: [
			{ field_name: 'email' },
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
- `fields` - an array of field definitions
- `label` - optional label shown through `FFormRow`
- `help_text` - optional helper text shown below the field

Typical field entries include:

- `field_name` — unique field key used in `modelValue` and `errors`
- `default` — initial value used by `getFormDefaults`
- `disabled` — disables interaction with the field
- `readonly` — keeps the field visible but prevents editing
- `required` — marks the field as required for validation and UI purposes

Some widgets may also expect additional fields depending on their behavior. For example, select-like
widgets may need option lists, and more complex widgets may rely on extra metadata for rendering or
validation. When using the form, check the supported field parameters for each widget individually.
For details, see the stories for the corresponding field component.
