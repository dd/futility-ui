import { computed } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeRenderer, makeUpdateArg } from '@/.storybook/utils.js';

import Readme from './README.md?raw';
import { META_BASIC } from './constants.sb.js';
import FGenericForm from '.';
import { getFormDefaults, getDiff, getDataForQuery } from './utils';
import { DEFAULT_WIDGETS, LAYOUT_CHOICES, SIZE_CHOICES } from './constants.js';


export default {
	title: 'Forms/FGenericForm',
	component: FGenericForm,
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
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
			table: { category: 'events', type: { summary: null }},
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
	render: makeRenderer(['modelValue']),
	args: {
		meta: META_BASIC,
		modelValue: getFormDefaults(META_BASIC, DEFAULT_WIDGETS),
		errors: {},
		widgets: {},
		layout: 'two_columns',
		autoLayoutBreakpoint: 400,
		widgetSize: 'm',
	},
};


export const Default = {};


const SIZES_DESCRIPTION = `The \`widgetSize\` prop is forwarded to each widget's \`FFormRow\` as the
\`size\` prop. The value is free-form - just make sure every widget in use supports the
corresponding size index. All built-in widgets support \`'s'\`, \`'m'\` (default), and \`'xl'\`.`;


const SIZES_TEMPLATE = `<div class="sbfui-preview-flex-y sbfui-fgenericform-sizes" style="gap:64px;" >
	<div
		v-for="size in SIZE_CHOICES"
		:key="size"
	>
		<p class="sbfui-fgenericform-label" >{{ size }}</p>
		<FGenericForm v-bind="args" :widget-size="size" />
	</div>
</div>`;


export const Sizes = {
	parameters: {
		docs: { description: { story: SIZES_DESCRIPTION }},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FGenericFormSizesStory',
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs, SIZE_CHOICES };
			},
			template: SIZES_TEMPLATE,
		};
	},
	argTypes: {
		widgetSize: { control: false },
	},
	args: {
		widgetSize: '<size>',
	},
};


const UTILITIES_DESCRIPTION = `Three utility functions ship alongside the component.

\`\`\`js
import { getFormDefaults, getDiff, getDataForQuery } from 'futility-ui/forms/FGenericForm/utils';
\`\`\`

**\`getFormDefaults(meta, widgets?)\`** produces initial form data from the meta array.
If a field has an explicit \`default\` key, that value is used as-is.
If \`default\` is absent, the widget's \`normalize\` function is called with \`undefined\` to derive
a type-appropriate empty value — e.g. \`''\` for text, \`false\` for checkbox, or \`null\` for text
with \`allowNull: true\`. Pass \`DEFAULT_WIDGETS\` (or your merged widget map) so the correct
per-type normaliser is used.

**\`getDiff(meta, currentData, originalData, widgets?)\`** returns only the fields whose normalised
values differ from \`originalData\`. It is designed for PATCH requests: pass the server response as
\`originalData\` and you get exactly what changed.

**\`getDataForQuery(meta, currentData, widgets?)\`** is shorthand for diffing against
\`getFormDefaults(meta, widgets)\`. Returns only non-default values, keeping the URL short.

Both diff functions are form-aware: for text-like fields \`null\`, \`undefined\`, and \`''\` are
treated as equivalent, so clearing a field that was already empty won't appear in the output.
Pass \`DEFAULT_WIDGETS\` from \`futility-ui/forms/FGenericForm/constants\` (or your merged widget
map) for type-aware normalisation.`;


const UTILITIES_TEMPLATE = `<div class="sbfui-fgenericform-utils" >
	<div>
		<p class="sbfui-fgenericform-label" >Form schema</p>
		<FGenericForm v-bind="args" />
		<div>
			<p class="sbfui-fgf-utils-label-second" >initialData</p>
			<pre class="sbfui-pre" >{{ JSON.stringify(initialData, null, 2) }}</pre>
		</div>
		<div>
			<p class="sbfui-fgf-utils-label-second" >modelValue (v-model)</p>
			<pre class="sbfui-pre" >{{ JSON.stringify(args.modelValue, null, 2) }}</pre>
		</div>
	</div>
	<div>
		<p class="sbfui-fgenericform-label" >Utils</p>
		<div>
			<p class="sbfui-fgf-utils-label-second" style="padding-top:0;" >getFormDefaults (defaults data)</p>
			<pre class="sbfui-pre" >{{ JSON.stringify(defaultData, null, 2) }}</pre>
		</div>
		<div>
			<p class="sbfui-fgf-utils-label-second" >getDiff (vs initialData)</p>
			<pre class="sbfui-pre" >{{ JSON.stringify(diff, null, 2) }}</pre>
		</div>
		<div>
			<p class="sbfui-fgf-utils-label-second" >getDataForQuery (vs defaults)</p>
			<pre class="sbfui-pre" >{{ JSON.stringify(queryData, null, 2) }}</pre>
		</div>
	</div>
</div>`;


export const Utilities = {
	parameters: {
		docs: { description: { story: UTILITIES_DESCRIPTION }},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FGenericFormUtilitiesStory',
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				const initialData = { last_name: 'Doe' };

				const defaultData = computed(() => getFormDefaults(args.meta, DEFAULT_WIDGETS));
				const diff = computed(() => getDiff(
					args.meta, args.modelValue, initialData, DEFAULT_WIDGETS
				));
				const queryData = computed(() => getDataForQuery(
					args.meta, args.modelValue, DEFAULT_WIDGETS
				));

				return { args: newArgs, initialData, defaultData, diff, queryData };
			},
			template: UTILITIES_TEMPLATE,
		};
	},
	args: {
		modelValue: {
			first_name: 'Jane',
			last_name: 'Doe',
		},
	},
};


const LAYOUT_DESCRIPTION = `
Each built-in widget uses \`FFormRow\` internally - \`two_columns\`, \`one_column\` and custom
layouts are documented in [FFormRow](?path=/docs/forms-fformrow--docs).

\`FGenericForm\` adds a single layout on top: \`auto\`. It measures its own container width
and switches between \`two_columns\` and \`one_column\` at the \`autoLayoutBreakpoint\` threshold.

\`\`\`html
<FGenericForm v-model="formData" :meta="meta" layout="auto" />

<!-- custom breakpoint -->
<FGenericForm v-model="formData" :meta="meta" layout="auto" :auto-layout-breakpoint="400" />
\`\`\``;


const LAYOUT_TEMPLATE = `<div class="sbfui-fgenericform-layouts" >
	<div>
		<p class="sbfui-fgenericform-label" >wide container (≥ 400px) → two_columns</p>
		<FGenericForm v-bind="args" style="width:400px;" />
	</div>

	<div>
		<p class="sbfui-fgenericform-label" >narrow container (< 400px) → one_column</p>
		<FGenericForm v-bind="args" style="width:260px;" />
	</div>
</div>`;


export const Layouts = {
	parameters: {
		docs: { description: { story: LAYOUT_DESCRIPTION }},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FGenericFormLayoutStory',
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: LAYOUT_TEMPLATE,
		};
	},
	argTypes: {
		layout: { control: false },
		autoLayoutBreakpoint: { control: false },
	},
	args: {
		layout: 'auto',
		autoLayoutBreakpoint: 400,
	},
};


const SCHEME_TEMPLATE = `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<FGenericForm v-bind="args" />
	</div>
	<div class="sbpst-dark" >
		<FGenericForm v-bind="args" />
	</div>
</div>`;


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FGenericFormSchemeStory',
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: SCHEME_TEMPLATE,
		};
	},
};
