import React from 'react';
import { Title, Primary, Controls, Stories, Markdown, Subtitle, Description } from '@storybook/addon-docs/blocks';
import { computed, ref, watch } from 'vue';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { makeUpdateArg } from '@/.storybook/utils.js';
import FSwitch from '@/forms/FSwitch';
import FControlLabel from '@/forms/FControlLabel';
import Readme from './README.md?raw';
import FInputAutocomplete from '.';
import { SIZE_CHOICES } from './constants';


const ending = `
### TODO

* Support grouping options when needed
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


const requestHandler = fn((query, page) => {
	return new Promise((resolve) => {
		let opts = [ ...OPTIONS_EXAMPLE ];
		if (query) opts = opts.filter(o => o.label.startsWith(query));
		const hasNext = opts.length > 10 * page;
		opts = opts.slice(10 * (page - 1), 10 * page);
		resolve({ options: opts, hasNext });
	});
});


export default {
	title: 'Forms/FInputAutocomplete',
	component: FInputAutocomplete,
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
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
		// PROPS
		modelValue: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'string | number | boolean' },
				defaultValue: { summary: 'null' },
			},
		},
		query: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'string' },
			},
		},
		requestHandler: {
			control: false,
			table: {
				category: 'props',
				type: { summary: 'fn' },
			},
		},
		requestCurrentHandler: {
			control: false,
			table: {
				category: 'props',
				type: { summary: 'fn' },
			},
		},
		required: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		error: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		size: {
			options: SIZE_CHOICES,
			control: 'select',
			table: {
				category: 'props',
				type: { summary: 'string' },
				defaultValue: { summary: 'm' },
			},
		},
		placeholderLabel: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'string' },
			},
		},
		placeholderFilter: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'string' },
			},
		},
		filterInputID: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'string' },
			},
		},
		texts: {
			control: 'object',
			table: {
				category: 'props',
				type: { summary: 'object' },
				// defaultValue: { summary: '{}' },
			},
		},
		// SLOTS
		'option-label': {
			control: false,
			description: 'Scoped slot for custom option rendering. Receives `{ option, value }` where `value` is the currently selected value.',
			table: {
				category: 'slots',
				type: { summary: 'VNode' },
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
		'update:query': {
			action: 'update:query',
			description: 'Emitted when the search query changes.',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
		'update:option': {
			action: 'update:option',
			description: 'Emitted when the selected option object changes. Carries the full `{ value, label }` object - useful when you need the label without an extra lookup.',
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
		requestCurrentHandler: fn((value) => {
			return new Promise((resolve) => {
				resolve(OPTIONS_EXAMPLE.find(o => o.value === value));
			});
		}),
		required: false,
		disabled: false,
		error: false,
		placeholderFilter: 'Placeholder',
		placeholderLabel: 'Label',
		size: 'm',
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const updateValue = makeUpdateArg('modelValue', updateArgs);
		const updateQuery = makeUpdateArg('query', updateArgs);
		return {
			components: { FInputAutocomplete },
			setup() {
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


export const Default = {
	parameters: {
		docs: {
			description: {
				story: 'Basic usage with an instant in-memory request handler. Open the dropdown, type to filter, scroll to load more pages.',
			},
		},
	},
};


let responseTime;
let responseNextTime;
let responseCurrentTime;
export const RequestOptions = {
	parameters: {
		docs: {
			description: {
				story: `Demonstrates the loading states during async requests. Use the controls below to simulate slow networks.

- **Response time** - spinner shown while the first page loads
- **Response next time** - spinner shown at the bottom of the list while the next page is being fetched (infinite scroll)
- **Response current time** - the raw value is shown as a temporary label until this resolves`,
			},
		},
	},
	argTypes: {
		// Story config
		responseTime: {
			control: { type: 'number' },
			description: 'Simulated delay (ms) for the first page of options.',
			table: {
				category: 'story configuration',
			},
		},
		responseNextTime: {
			control: { type: 'number' },
			description: 'Simulated delay (ms) for subsequent pages (infinite scroll).',
			table: {
				category: 'story configuration',
			},
		},
		responseCurrentTime: {
			control: { type: 'number' },
			description: 'Simulated delay (ms) for resolving the label of the initially selected value.',
			table: {
				category: 'story configuration',
			},
		},
	},
	args: {
		requestHandler: fn((query, page, options) => {
			return new Promise((resolve, reject) => {
				const _time = page == 1 ? responseTime : responseNextTime;
				setTimeout(() => {
					if (options.signal.aborted) {
						reject(new DOMException('Request aborted', 'AbortError'));
					} else {
						let opts = [ ...OPTIONS_EXAMPLE ];
						if (query) opts = opts.filter(o => o.label.startsWith(query));
						const hasNext = opts.length > 10 * page;
						opts = opts.slice(10 * (page - 1), 10 * page);
						resolve({ options: opts, hasNext });
					}
				}, _time);
			});
		}),
		requestCurrentHandler: fn((value) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(OPTIONS_EXAMPLE.find(o => o.value === value));
				}, responseCurrentTime);
			});
		}),
		responseTime: 400,
		responseNextTime: 400,
		responseCurrentTime: 400,
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const updateValue = makeUpdateArg('modelValue', args, updateArgs);
		const updateQuery = makeUpdateArg('query', args, updateArgs);
		return {
			name: 'FInputAutocompleteRequestOptionsStory',
			components: { FInputAutocomplete },
			setup() {
				responseTime = args.responseTime;
				watch(() => args.responseTime, (newValue) => { responseTime = newValue; });
				responseNextTime = args.responseNextTime;
				watch(() => args.responseNextTime, (newValue) => { responseNextTime = newValue; });
				responseCurrentTime = args.responseCurrentTime;
				watch(() => args.responseCurrentTime, (newValue) => { responseCurrentTime = newValue; });

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
				story: 'Use the `#option-label` scoped slot to render each option with custom markup - avatars, badges, secondary text, etc. The slot receives `{ option, value }` where `value` is the currently selected value.',
			},
		},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const updateValue = makeUpdateArg('modelValue', args, updateArgs);
		const updateQuery = makeUpdateArg('query', args, updateArgs);
		return {
			name: 'FInputAutocompleteCustomOptionsStory',
			components: { FInputAutocomplete },
			setup() {
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


const CHANGE_REQUEST_TEMPLATE = `<p>
	<FControlLabel label="Use an alternative request handler" >
		<FSwitch v-model="useAlternativFunction" />
	</FControlLabel>
</p>
<p><FInputAutocomplete v-bind="args" /></p>`;


export const ChangeRequestHandler = {
	parameters: {
		docs: {
			description: {
				story: 'The `requestHandler` prop is reactive - swapping it at runtime (e.g. when the user switches a filter or a parent context changes) immediately re-fetches options with the new handler.',
			},
		},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const updateValue = makeUpdateArg('modelValue', args, updateArgs);
		const updateQuery = makeUpdateArg('query', args, updateArgs);
		return {
			name: 'FInputAutocompleteChangeRequestHandlerStory',
			components: { FInputAutocomplete, FSwitch, FControlLabel },
			setup() {
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
			template: CHANGE_REQUEST_TEMPLATE,
		};
	},
};


const STATES_TEMPLATE = `<table class="sbfui-preview-table" ><tbody>
	<tr>
		<td></td>
		<td style="text-align:center;" class="sbfui-pt-label" >default</td>
		<td style="text-align:center;" class="sbfui-pt-label" >error</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >default</td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" /></td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" error /></td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >with value</td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" /></td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" error /></td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled</td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" disabled /></td>
		<td><FInputAutocomplete v-model="modelValue1" v-bind="args" v-on="promisedArgs" error disabled /></td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled<br />+ value</td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" disabled /></td>
		<td><FInputAutocomplete v-model="modelValue2" v-bind="args" v-on="promisedArgs" error disabled /></td>
	</tr>
</tbody></table>`;


export const States = {
	parameters: {
		docs: {
			description: {
				story: 'All visual states: empty / with value × default / error / disabled.',
			},
		},
	},
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
		error: { control: { type: null }},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const updateQuery = makeUpdateArg('query', args, updateArgs);
		return {
			name: 'FInputAutocompleteStatesStory',
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
				const promisedArgs = {
					[updateQuery[0]]: updateQuery[1],
				};

				const modelValue1 = ref();
				const modelValue2 = ref('opt1');
				return { args: newArgs, promisedArgs, modelValue1, modelValue2 };
			},
			template: STATES_TEMPLATE,
		};
	},
	args: {
		modelValue: '<value>',
		disabled: '<disabled>',
		error: '<error>',
	},
};


export const Sizes = {
	parameters: {
		docs: {
			description: {
				story: 'Available sizes. Pixel heights are approximate and may vary with the surrounding design system tokens.',
			},
		},
	},
	argTypes: {
		size: { control: { type: null }},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const updateValue = makeUpdateArg('modelValue', args, updateArgs);
		const updateQuery = makeUpdateArg('query', args, updateArgs);
		return {
			name: 'FInputAutocompleteSizesStory',
			components: { FInputAutocomplete },
			setup() {
				const LABELS = [ '37px', '42px', '52px' ];
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
			template: `<table class="sbfui-preview-table" ><tbody>
	<tr v-for="size, i in SIZE_CHOICES" :key="size[0]" >
		<td class="sbfui-pt-label" >{{ LABELS[i] }}</td>
		<td class="sbfui-pt-label" >{{ size }}</td>
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
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				story: 'Component appearance in light and dark color schemes.',
			},
		},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const updateValue = makeUpdateArg('modelValue', args, updateArgs);
		const updateQuery = makeUpdateArg('query', args, updateArgs);
		return {
			name: 'FInputAutocompleteSchemeStory',
			components: { FInputAutocomplete },
			setup() {
				const promisedArgs = {
					[updateValue[0]]: updateValue[1],
					[updateQuery[0]]: updateQuery[1],
				};
				return { args, promisedArgs };
			},
			template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
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
		<table class="sbfui-preview-table" ><tbody>
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
