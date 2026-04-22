`FGenericForm` renders a form from a metadata array — no template boilerplate required.

Each field entry in `meta` is dispatched to the matching widget from the `widgets` map.

See **Built-in Widgets** for all registered types, **Errors** for error handling, and **Utilities** for diff / query helpers.


### Installation

```js
import { FGenericForm } from 'futility-ui';
// or
import FGenericForm from 'futility-ui/forms/FGenericForm';
```


### Basic usage

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


### Custom widgets

Pass additional type → component entries via `widgets`. They are merged on top of built-in defaults:

```js
import { DEFAULT_WIDGETS } from 'futility-ui';
import MySelectWidget from './MySelectWidget.vue';

const widgets = {
	...DEFAULT_WIDGETS,
	select: { component: MySelectWidget, normalize: (v) => v ?? null },
};
```

```html
<FGenericForm v-model="formData" :meta="meta" :widgets="widgets" />
```
