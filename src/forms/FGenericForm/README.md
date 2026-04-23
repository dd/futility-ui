`FGenericForm` renders a form from a metadata array - no template boilerplate required.


### Installation

```js
import { FGenericForm } from 'futility-ui';
// or
import FGenericForm from 'futility-ui/forms/FGenericForm';
```


### Basic usage

Each field entry in `meta` is dispatched to the matching widget from the `widgets` map.

```js
import { FGenericForm, getFormDefaults } from 'futility-ui';

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
