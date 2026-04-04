import React from 'react';
import { Title, Primary, Controls, Stories, Markdown, Subtitle, Description } from '@storybook/addon-docs/blocks';
import { computed, ref, watch } from 'vue';
import { useArgs } from 'storybook/preview-api';

import FInputAutocomplete from '.';
import FSwitch from '@/forms/FSwitch';
import FControlLabel from '@/forms/FControlLabel';
import { makeUpdateArg } from '@/utils/storybook';
import { SIZE_CHOICES } from './constants';


const usage = `
\`FInputAutocomplete\` is an input component with built-in autocomplete, fetching and displaying
suggestions as the user types.

### Usage

Import the component:

\`\`\`js
import { FInputAutocomplete } from 'futility-ui'
// or
import FInputAutocomplete from 'futility-ui/forms/FInputAutocomplete'
\`\`\`

Use it in your template:

\`\`\`html
<FInputAutocomplete v-model="value" />
\`\`\`

That's it!
`;

const ending = `
### TODO

* Ability to group options when needed
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


const requestHandler = (query, page, options) => {
	return new Promise((resolve) => {
		let options = [ ...OPTIONS_EXAMPLE ];
		if (query) options = options.filter(o => o.label.startsWith(query));
		const hasNext = options.length > 10 * page;
		options = options.slice(10 * (page - 1), 10 * page);
		resolve({ options, hasNext });
	});
};


export default {
	title: 'Forms/FInputAutocomplete',
	component: FInputAutocomplete,
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
	tags: [ 'autodocs' ],
	argTypes: {
		modelValue: {
			type: 'string',
			description: 'Input value.',
			table: {
				category: 'props',
				type: { summary: 'text | number | boolean' },
			},
		},
		query: {
			type: 'string',
			description: 'Filter value.',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled flag.',
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
			description: 'Event on update value.',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
		'update:query': {
			action: 'update:query',
			description: 'Event on update query.',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
		'update:option': {
			action: 'update:option',
			description: 'Event on update option.',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		modelValue: null,
		requestHandler,
		requestCurrentHandler: (value) => {
			return new Promise((resolve) => {
				resolve(OPTIONS_EXAMPLE.find(o => o.value === value));
			});
		},
		required: false,
		disabled: false,
		error: false,
		placeholderFilter: 'Placeholder',
		placeholderLabel: 'Label',
		size: 'm',
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FInputAutocomplete },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const updateQuery = makeUpdateArg('query', args, updateArgs);
				const promisedArgs = {
					[updateValue[0]]: updateValue[1],
					[updateQuery[0]]: updateQuery[1],
				};
				return { args, promisedArgs };
			},
			template: `<FInputAutocomplete v-bind="args" v-on="promisedArgs" />`,
		};
	},
};


export const Default = {};


let responseTime;
let responseNextTime;
let responseCurrentTime;
export const RequestOptions = {
	parameters: {
		docs: {
			description: {
				story: 'Displays a preloader while options are being loaded.'
			},
		},
	},
	argTypes: {
		// Story config
		responseTime: {
			control: { type: 'number' },
			description: 'Response time for the first page of options.',
			table: {
				category: 'story configurations',
			},
		},
		responseNextTime: {
			control: { type: 'number' },
			description: 'Response time for subsequent pages of options.',
			table: {
				category: 'story configurations',
			},
		},
		responseCurrentTime: {
			control: { type: 'number' },
			description: 'Response time for fetching the current option.',
			table: {
				category: 'story configurations',
			},
		},
	},
	args: {
		requestHandler: (query, page, options) => {
			return new Promise((resolve, reject) => {
				const _time = page == 1 ? responseTime : responseNextTime;
				setTimeout(() => {
					if (options.signal.aborted) {
						reject(new DOMException('Request aborted', 'AbortError'));
					} else {
						let options = [ ...OPTIONS_EXAMPLE ];
						if (query) options = options.filter(o => o.label.startsWith(query));
						const hasNext = options.length > 10 * page;
						options = options.slice(10 * (page - 1), 10 * page);
						resolve({ options, hasNext });
					}
				}, _time);
			});
		},
		requestCurrentHandler: (value) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(OPTIONS_EXAMPLE.find(o => o.value === value));
				}, responseCurrentTime);
			});
		},
		responseTime: 400,
		responseNextTime: 400,
		responseCurrentTime: 400,
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputAutocompleteRequestOptionsStory',
			props: Object.keys(argTypes),
			components: { FInputAutocomplete },
			setup() {
				responseTime = args.responseTime;
				watch(() => args.responseTime, (newValue) => { responseTime = newValue; });
				responseNextTime = args.responseNextTime;
				watch(() => args.responseNextTime, (newValue) => { responseNextTime = newValue; });
				responseCurrentTime = args.responseCurrentTime;
				watch(() => args.responseCurrentTime, (newValue) => { responseCurrentTime = newValue; });

				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const updateQuery = makeUpdateArg('query', args, updateArgs);
				const promisedArgs = {
					[updateValue[0]]: updateValue[1],
					[updateQuery[0]]: updateQuery[1],
				};
				return { args, promisedArgs };
			},
			template: `<FInputAutocomplete v-bind="args" v-on="promisedArgs" />`,
		};
	},
};


export const CustomOptions = {
	parameters: {
		docs: {
			description: {
				story: 'Provides a slot to customize option rendering.'
			},
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputAutocompleteCustomOptionsStory',
			props: Object.keys(argTypes),
			components: { FInputAutocomplete },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const updateQuery = makeUpdateArg('query', args, updateArgs);
				const promisedArgs = {
					[updateValue[0]]: updateValue[1],
					[updateQuery[0]]: updateQuery[1],
				};
				return { args, promisedArgs };
			},
			template: `<FInputAutocomplete v-bind="args" v-on="promisedArgs" >
	<template #option-label="{ option }">{{ option.label }} (value: {{ option.value }})</template>
</FInputAutocomplete>`,
		};
	},
};


export const ChangeRequestHandler = {
	parameters: {
		docs: {
			description: {
				story: 'The request handler can be changed at any time. When changed, options are automatically re-fetched.'
			},
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputAutocompleteChangeRequestHandlerStory',
			props: Object.keys(argTypes),
			components: { FInputAutocomplete, FSwitch, FControlLabel },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const updateQuery = makeUpdateArg('query', args, updateArgs);

				const useAlternativFunction = ref(false);
				const alternativeRequestHandler = (query, page, options) => {
					return new Promise((resolve) => {
						resolve({ options: [{ value: 'only_one', label: 'Only one' }], hasNext: false });
					});
				};
				const actualRequestHandler = computed(() => {
					return useAlternativFunction.value ? alternativeRequestHandler : requestHandler;
				});

				const newArgs = computed(() => ({
					...args,
					[updateValue[0]]: updateValue[1],
					[updateQuery[0]]: updateQuery[1],
					requestHandler: actualRequestHandler.value,
				}));

				return { args: newArgs, useAlternativFunction };
			},
			template: `
<p><FControlLabel><FSwitch v-model="useAlternativFunction" />Use an alternative function for fetching options</FControlLabel></p>
<p><FInputAutocomplete v-bind="args" /></p>`,
		};
	},
};


export const States = {
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
		error: { control: { type: null }},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputAutocompleteStatesStory',
			props: Object.keys(argTypes),
			components: { FInputAutocomplete },
			setup() {
				const newArgs = computed(() => {
					const {
						modelValue,
						disabled,
						error,
						'update:modelValue': _,
						...filteredArgs
					} = args;  // eslint-disable-line no-unused-vars
					return filteredArgs;
				});
				const updateQuery = makeUpdateArg('query', args, updateArgs);
				const promisedArgs = {
					[updateQuery[0]]: updateQuery[1],
				};

				const modelValue1 = ref();
				const modelValue2 = ref('opt1');
				return { args: newArgs, promisedArgs, modelValue1, modelValue2 };
			},
			template: `<table class="preview-table" ><tbody>
	<tr>
		<td></td>
		<td style="text-align:center;" class="label" >default</td>
		<td style="text-align:center;" class="label" >error</td>
	</tr>
	<tr>
		<td class="label" >default</td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" /></td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" error /></td>
	</tr>
	<tr>
		<td class="label" >with value</td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" /></td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" error /></td>
	</tr>
	<tr>
		<td class="label" >disabled</td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" disabled /></td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" error disabled /></td>
	</tr>
	<tr>
		<td class="label" >disabled<br />+ value</td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" disabled /></td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" error disabled /></td>
	</tr>
</tbody></table>`,
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
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputAutocompleteSizesStory',
			props: Object.keys(argTypes),
			components: { FInputAutocomplete },
			setup() {
				const LABELS = [ '37px', '42px', '52px' ];
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const updateQuery = makeUpdateArg('query', args, updateArgs);
				const newArgs = computed(() => {
					const { 'size': _, ...filteredArgs } = args;  // eslint-disable-line no-unused-vars
					return {
						...filteredArgs,
						'onUpdate:modelValue': updateValue[1],
						'onUpdate:query': updateQuery[1],
					}
				});
				return { args: newArgs, LABELS, SIZE_CHOICES };
			},
			template: `<table class="preview-table" ><tbody>
	<tr v-for="size, i in SIZE_CHOICES" :key="size[0]" >
		<td class="label" >{{ LABELS[i] }}</td>
		<td class="label" >{{ size }}</td>
		<td><FInputAutocomplete v-bind="args" :size="size" /></td>
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
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputAutocompleteSchemeStory',
			props: Object.keys(argTypes),
			components: { FInputAutocomplete },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const updateQuery = makeUpdateArg('query', args, updateArgs);
				const promisedArgs = {
					[updateValue[0]]: updateValue[1],
					[updateQuery[0]]: updateQuery[1],
				};
				return { args, promisedArgs };
			},
			template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="preview-table" ><tbody>
			<tr>
				<td>
					<FInputAutocomplete v-bind="args" v-on="promisedArgs" />
				</td>
			</tr>
			<tr>
				<td>
					<FInputAutocomplete v-bind="args" v-on="promisedArgs" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="preview-table" ><tbody>
			<tr>
				<td>
					<FInputAutocomplete v-bind="args" v-on="promisedArgs" />
				</td>
			</tr>
			<tr>
				<td>
					<FInputAutocomplete v-bind="args" v-on="promisedArgs" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`,
		};
	},
};
