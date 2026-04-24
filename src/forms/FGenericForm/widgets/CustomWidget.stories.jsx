import { computed } from 'vue';
import { useArgs } from 'storybook/preview-api';
import React from 'react';

import { makeUpdateArg } from '@/.storybook/utils.js';

import DemoColorWidget from './DemoColorWidget';
import DemoRangeWidget from './DemoRangeWidget';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';
import { DEFAULT_WIDGETS, LAYOUT_CHOICES, SIZE_CHOICES } from '../constants.js';


const DESCRIPTION = `
Every custom widget is built around two composables and three constants exported from
\`futility-ui/forms/FGenericForm/useWidget\`.

**\`WIDGET_PROPS\`** / **\`WIDGET_EMITS\`** - spread into \`defineProps\` / \`defineEmits\`.
Provide \`meta\`, \`layout\`, \`size\`, and \`fieldErrors\` to the widget.

**\`useWidget(model, props)\`** - widget-level state. Call once per widget.

- \`fields\` - computed array of all field metas (\`meta.fields\`)
- \`getFieldMeta(name)\` - returns a computed ref to a specific field's meta
- \`error\` - aggregate: any field has an error; pass to FFormRow \`:error-highlight\`

**\`useWidgetField(model, props, meta)\`** - field-level state. Call once per rendered input.
\`meta\` is a computed ref to a field meta object.

- \`id\`, \`name\` - equal to \`field_name\`; pass to FFormRow \`:id\` and the input's \`:id\`/\`:name\`
- \`value\` - writable computed; bind with \`v-model\`
- \`disabled\`, \`readonly\`, \`required\` - from field meta
- \`error\` - this field has an error; pass to the input's \`:error\`
- \`errorText\` - this field's error message


For example your custom widget may be like this:

\`\`\`html
<!-- DemoColorWidget.vue -->
<template>
	<FFormRow
		:id="id"
		:layout="layout"
		:size="size"
		:error-text="errorText"
		:error-highlight="error"
	>
		<template v-if="meta.label" #label>{{ meta.label }}</template>
		<input
			v-model="value"
			:id="id"
			:name="name"
			type="color"
			:disabled="disabled"
			:readonly="readonly"
			:required="required"
			class="demo-color-widget"
		/>
		<template v-if="meta.help_text" #help>{{ meta.help_text }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';

import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'DemoColorWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields } = useWidget(model, props);
const { id, name, value, disabled, readonly, required, error, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
\`\`\`


### Usage

\`\`\`js
import { DEFAULT_WIDGETS } from 'futility-ui';
import MyColorWidget from './MyColorWidget.vue';

const widgets = {
	...DEFAULT_WIDGETS,
	color: {
		component: MyColorWidget,
		normalize: (v) => v ?? null,
	},
};
\`\`\`

**normalize** - is a optional; coerces values for \`getDiff\` / \`getDataForQuery\`.


\`\`\`html
<FGenericForm :widgets="widgets" :meta="meta" />
\`\`\`

The live example below registers a minimal \`color\` widget - a native \`<input type="color">\`.`;


export default {
	title: 'Forms/FGenericForm/Widgets/Custom',
	component: FGenericForm,
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: DESCRIPTION },
		},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		modelValue: {
			description: 'Current form data object (v-model).',
			table: { category: 'props' },
		},
		'update:modelValue': {
			action: 'update:modelValue',
			description: 'Emitted when any field value changes.',
			control: false,
			table: { category: 'events', type: { summary: null } },
		},
		widgetSize: {
			options: SIZE_CHOICES,
			control: 'select',
		},
		layout: {
			options: LAYOUT_CHOICES,
			control: 'select',
		},
	},
	args: {
		layout: 'two_columns',
		widgetSize: 'm',
		widgets: {},
		errors: {},
		autoLayoutBreakpoint: 400,
	},
};


const SINGLE_FIELD_TEMPLATE = `<div class="sbfui-fgenericform-utils" >
	<div>
		<p class="sbfui-fgenericform-label" >Custom color widget</p>
		<FGenericForm v-bind="args" />
	</div>
	<div>
		<p class="sbfui-fgenericform-label" >v-model</p>
		<pre class="sbfui-pre" >{{ JSON.stringify(args.modelValue, null, 2) }}</pre>
		<div class="sbfui-color-swatch"
			:style="{
				background: args.modelValue?.bg_color,
				color: args.modelValue?.fg_color,
			}" >
			Sample text
		</div>
	</div>
</div>`;


const SINGLE_FIELD_META = [
	{
		type: 'color',
		label: 'Background',
		fields: [{ field_name: 'bg_color', default: '#4f46e5' }],
	},
	{
		type: 'color',
		label: 'Text color',
		fields: [{ field_name: 'fg_color', default: '#ffffff' }],
	},
];


export const SingleFieldWidget = {
	name: 'Single-field Widget',
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FGenericFormSingleFieldWidgetStory',
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = {
						...args,
						[modelValueArg[0]]: modelValueArg[2],
						widgets: {
							...DEFAULT_WIDGETS,
							color: {
								component: DemoColorWidget,
								normalize: (value) => value ?? null,
							},
						},
					};
					delete result[modelValueArg[1]];
					return result;
				});
				return { args: newArgs };
			},
			template: SINGLE_FIELD_TEMPLATE,
		};
	},
	args: {
		meta: SINGLE_FIELD_META,
		modelValue: getFormDefaults(SINGLE_FIELD_META),
		widgetSize: 's',
	},
};


const MULTI_FIELD_DESCRIPTION = `
When a meta entry has multiple fields (e.g. a \`range\` widget with \`from\` and \`to\`),
call \`useWidgetField\` once per rendered input.

The widget-level \`error\` from \`useWidget\` aggregates across all fields - pass it to
FFormRow \`:error-highlight\`. Because \`useWidget\` does not aggregate \`errorText\`, collect
it from whichever field has a message:

\`\`\`html
<!-- DemoRangeWidget.vue -->
<template>
	<FFormRow
		:id="from.id.value"
		:layout="layout"
		:size="size"
		:error-text="rowErrorText"
		:error-highlight="error"
	>
		<template v-if="meta.label" #label>{{ meta.label }}</template>

		<div class="demo-range-widget">
			<input
				v-model.number="from.value.value"
				:id="from.id.value"
				:name="from.name.value"
				class="demo-range-input"
				type="number"
				:disabled="from.disabled.value"
				:class="{ 'has-error': from.error.value }"
			/>
			<span class="demo-range-sep">–</span>
			<input
				v-model.number="to.value.value"
				:id="to.id.value"
				:name="to.name.value"
				class="demo-range-input"
				type="number"
				:disabled="to.disabled.value"
				:class="{ 'has-error': to.error.value }"
			/>
		</div>
		<template v-if="meta.help_text" #help>{{ meta.help_text }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';

import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'DemoRangeWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields, error } = useWidget(model, props);
const from = useWidgetField(model, props, computed(() => fields.value[0]));
const to = useWidgetField(model, props, computed(() => fields.value[1]));
// or by name using getFieldMeta:
// const { getFieldMeta, error } = useWidget(model, props);
// const from = useWidgetField(model, props, getFieldMeta('price_from'));
// const to = useWidgetField(model, props, getFieldMeta('price_to'));
const rowErrorText = computed(() => from.errorText.value ?? to.errorText.value ?? null);
</script>
\`\`\`

The live example below registers a \`range\` widget with two number inputs.`;


const MULTI_FIELD_META = [
	{
		type: 'range',
		label: 'Age range',
		help_text: 'Min and max age in years',
		fields: [
			{ field_name: 'age_min', default: 18 },
			{ field_name: 'age_max', default: 65 },
		],
	},
	{
		type: 'range',
		label: 'Price range',
		fields: [
			{ field_name: 'price_min', default: 0 },
			{ field_name: 'price_max', default: 1000 },
		],
	},
];

const MULTI_FIELD_TEMPLATE = `<div class="sbfui-fgenericform-utils" >
	<div>
		<p class="sbfui-fgenericform-label" >Multi-field range widget</p>
		<FGenericForm v-bind="args" />
	</div>
	<div>
		<p class="sbfui-fgenericform-label" >v-model</p>
		<pre class="sbfui-pre" >{{ JSON.stringify(args.modelValue, null, 2) }}</pre>
	</div>
</div>`;


export const MultiFieldWidget = {
	name: 'Multi-field Widget',
	parameters: {
		docs: { description: { story: MULTI_FIELD_DESCRIPTION }},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FGenericFormMultiFieldStory',
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = {
						...args,
						[modelValueArg[0]]: modelValueArg[2],
						widgets: {
							...DEFAULT_WIDGETS,
							range: { component: DemoRangeWidget },
						},
					};
					delete result[modelValueArg[1]];
					return result;
				});
				return { args: newArgs };
			},
			template: MULTI_FIELD_TEMPLATE,
		};
	},
	args: {
		meta: MULTI_FIELD_META,
		modelValue: getFormDefaults(MULTI_FIELD_META),
	},
};
