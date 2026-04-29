import React from 'react';
import { Title, Primary, Controls, Stories, Markdown, Subtitle, Description } from '@storybook/addon-docs/blocks';
import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeRenderer, makeUpdateArg } from '@/utils/storybook';
import FSelect from '.';
import { SIZE_CHOICES } from './constants';


const usage = `
\`FSelect\` is a styled wrapper around the native \`<select>\` element.

### Usage

Import the component:

\`\`\`js
import { FSelect } from 'futility-ui'
// or
import FSelect from 'futility-ui/forms/FSelect'
\`\`\`

Use it in your template:

\`\`\`html
<FSelect
	v-model="value"
	name="fselect-1"
	:optionList="[
		{ value: 'opt1', label: 'Option 1' },
		...
	]"
/>
\`\`\`

That's it!
`;

const ending = `
### TODO

* Consider a custom desktop dropdown while preserving the native picker on mobile
`;


const OPTIONS_EXAMPLE = [
	{ value: 'very-long-name', label: 'VERY-VERY-VERY-VERY-VERY-VERY-VERY-VERY-LONG-OPTION-NAME' },
	{ value: 'opt1', label: 'Option 1' },
	{ value: 'opt2', label: 'Option 2', disabled: true },
	{ value: 'opt3', label: 'Option 3' },
	{ value: 'opt4', label: 'Option 4' },
	{ value: 'opt5', label: 'Option 5' },
	{ value: 'opt6', label: 'Option 6' },
	{ value: 'opt7', label: 'Option 7' },
	{ value: 'opt8', label: 'Option 8' },
	{ value: 'opt9', label: 'Option 9' },
	{ value: 'opt10', label: 'Option 10' },
	{ value: 'opt11', label: 'Option 11' },
	{ value: 'opt12', label: 'Option 12' },
	{ value: 'opt13', label: 'Option 13' },
	{ value: 'opt14', label: 'Option 14' },
	{ value: 'opt15', label: 'Option 15' },
	{ value: 'opt16', label: 'Option 16' },
	{ value: 'opt17', label: 'Option 17' },
	{ value: 'opt18', label: 'Option 18' },
	{ value: 'opt19', label: 'Option 19' },
	{ value: 'opt20', label: 'Option 20' },
	{ value: 'var1', label: 'Variant 1' },
	{ value: 'var2', label: 'Variant 2', disabled: true },
	{ value: 'var3', label: 'Variant 3' },
	{ value: 'var4', label: 'Variant 4' },
	{ value: 'var5', label: 'Variant 5' },
	{ value: 'var6', label: 'Variant 6' },
	{ value: 'var7', label: 'Variant 7' },
	{ value: 'var8', label: 'Variant 8' },
	{ value: 'var9', label: 'Variant 9' },
	{ value: 'var10', label: 'Variant 10' },
	{ value: 'var11', label: 'Variant 11' },
	{ value: 'var12', label: 'Variant 12' },
	{ value: 'var13', label: 'Variant 13' },
	{ value: 'var14', label: 'Variant 14' },
	{ value: 'var15', label: 'Variant 15' },
	{ value: 'var16', label: 'Variant 16' },
	{ value: 'var17', label: 'Variant 17' },
	{ value: 'var18', label: 'Variant 18' },
	{ value: 'var19', label: 'Variant 19' },
	{ value: 'var20', label: 'Variant 20' },
	{ value: 'last', label: 'Last option' },
];


export default {
	title: 'Forms/FSelect',
	component: FSelect,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: usage,
			},
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Controls />
					<Stories includePrimary={false} title={null} />
					<Markdown children={ending} />
				</>
			),
		},
	},
	argTypes: {
		modelValue: {
			type: 'string',
			description: 'Current selected value.',
			table: {
				category: 'props',
				type: { summary: 'text | number | boolean' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the select is disabled.',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		size: {
			options: SIZE_CHOICES,
			control: 'select',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		// EVENTS
		'update:modelValue': {
			action: 'update:modelValue',
			description: 'Emitted when the selected value changes.',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	render: makeRenderer([ 'modelValue' ]),
	args: {
		modelValue: null,
		optionList: OPTIONS_EXAMPLE,
		emptyOptionLabel: 'Select...',
		emptyOptionValue: null,
		// emptyOptionValue: '',
		disabled: false,
		error: false,
		size: 'm',
	},
};


export const Default = {};


export const States = {
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
		error: { control: { type: null }},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FSelectStatesStory',
			props: Object.keys(argTypes),
			components: { FSelect },
			setup() {
				const {
					modelValue,
					'update:modelValue': _a,
					'disabled': _b,
					'error': _c,
					...filteredArgs
				} = args;
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = {
					[updateValue[0]]: updateValue[1],
				};

				const modelValue1 = ref();
				const modelValue2 = ref('opt1');
				return { args: filteredArgs, promisedArgs, modelValue1, modelValue2 };
			},
			template: `<table class="sbfui-preview-table" >
	<tbody>
		<tr>
			<td></td>
			<td style="text-align:center;" class="sbfui-pt-label" >default</td>
			<td style="text-align:center;" class="sbfui-pt-label" >error</td>
		</tr>
		<tr>
			<td class="sbfui-pt-label" >default</td>
			<td><FSelect class="select-mw" v-model="modelValue1" v-bind="args" v-on="promisedArgs" /></td>
			<td><FSelect class="select-mw" v-model="modelValue1" v-bind="args" v-on="promisedArgs" error /></td>
		</tr>
		<tr>
			<td class="sbfui-pt-label" >with value</td>
			<td><FSelect class="select-mw" v-model="modelValue2" v-bind="args" v-on="promisedArgs" /></td>
			<td><FSelect class="select-mw" v-model="modelValue2" v-bind="args" v-on="promisedArgs" error /></td>
		</tr>
		<tr>
			<td class="sbfui-pt-label" >disabled</td>
			<td><FSelect class="select-mw" v-model="modelValue1" v-bind="args" v-on="promisedArgs" disabled /></td>
			<td><FSelect class="select-mw" v-model="modelValue1" v-bind="args" v-on="promisedArgs" disabled error /></td>
		</tr>
		<tr>
			<td class="sbfui-pt-label" >disabled<br />+ value</td>
			<td><FSelect class="select-mw" v-model="modelValue2" v-bind="args" v-on="promisedArgs" disabled /></td>
			<td><FSelect class="select-mw" v-model="modelValue2" v-bind="args" v-on="promisedArgs" disabled error /></td>
		</tr>
	</tbody>
</table>`,
		};
	},
	args: {
		modelValue: '<value>',
		disabled: '<disabled>',
		error: '<error>',
	},
};


export const Sizes = {
	argTypes: {
		size: { control: { type: null }},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FSelectSizesStory',
			props: Object.keys(argTypes),
			components: { FSelect },
			setup() {
				const LABELS = [ '37px', '42px', '52px' ];
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const { 'size': _, ...filteredArgs } = args;  // eslint-disable-line no-unused-vars
					return {
						...filteredArgs,
						'onUpdate:modelValue': updateValue[1],
					};
				});
				return { args: newArgs, LABELS, SIZE_CHOICES };
			},
			template: `<table class="sbfui-preview-table" ><tbody>
	<tr v-for="size, i in SIZE_CHOICES" :key="size[0]" >
		<td class="sbfui-pt-label" >{{ LABELS[i] }}</td>
		<td class="sbfui-pt-label" >{{ size }}</td>
		<td><FSelect class="select-mw" v-bind="args" :size="size" /></td>
	</tr>
</tbody></table>`,
		};
	},
	args: {
		size: '<size>',
	},
};


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FSelectSchemeStory',
			props: Object.keys(argTypes),
			components: { FSelect },
			setup() {
				// let modelValue = makeUpdateArg('modelValue', args, updateArgs);
				// let newArgs = computed(() => ({ ...args, 'onUpdate:modelValue': modelValue[1] }));
				// return { args: newArgs };
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				// const updateQuery = makeUpdateArg('query', args, updateArgs);
				const promisedArgs = {
					[updateValue[0]]: updateValue[1],
					// [updateQuery[0]]: updateQuery[1],
				};
				return { args, promisedArgs };
			},
			template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FSelect v-bind="args" v-on="promisedArgs" class="select-mw" />
				</td>
			</tr>
			<tr>
				<td>
					<FSelect v-bind="args" v-on="promisedArgs" class="select-mw" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FSelect v-bind="args" v-on="promisedArgs" class="select-mw" />
				</td>
			</tr>
			<tr>
				<td>
					<FSelect v-bind="args" v-on="promisedArgs" class="select-mw" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`,
		};
	},
};
