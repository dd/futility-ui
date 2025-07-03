import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeRenderer, makeUpdateArg } from '@/utils/storybook';
import FInput from './index.vue';
import { TEXT_ALLOWED_TYPES, SIZE_CHOICES } from './base';

const ALL_ALLOWED_TYPES = TEXT_ALLOWED_TYPES.concat([ 'date', 'password' ]);


const usage = `
### Usage

Import the component:

\`\`\`js
import { FInput } from 'futility-ui'
// or
import FInput from 'futility-ui/forms/FInput'
\`\`\`

Use it in your template:

\`\`\`html
<FInput />
\`\`\`

That's it!
`;


export default {
	title: 'Forms/FInput',
	component: FInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: usage,
			},
		}
	},
	tags: [ 'autodocs' ],
	argTypes: {
		modelValue: {
			description: 'Input value. The type depends on the input type.',
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'text | number' },
			},
		},
		type: {
			description: `Input type. Supported types: <i>${ALL_ALLOWED_TYPES.join('</i>, <i>')}</i>.`,
			options: ALL_ALLOWED_TYPES,
			control: 'select',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		size: {
			description: 'Input size.',
			options: SIZE_CHOICES,
			control: 'select',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text.',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		disabled: {
			description: 'Disabled flag.',
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		error: {
			description: 'Error flag.',
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		// EVENTS
		'update:modelValue': {
			action: 'update:modelValue',
			description: 'Event on update value',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
		// SLOTS
		start: {
			description: 'Слот перед инпутом.',
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		end: {
			description: 'Слот после инпута.',
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		type: 'text',
		disabled: false,
		error: false,
		placeholder: 'Placeholder',
		start: '',
		end: '',
	},
	render: makeRenderer([ 'modelValue' ]),
};


export const Default = {};


export const Text = {
	render: (args, { argTypes }) => ({
		name: 'FInputTextWithSlotsStory',
		props: Object.keys(argTypes),
		components: { FInput },
		setup() { return { args }; },
		template: `<FInput v-bind="args" >
	<template v-if="args.start" v-slot:start >{{ args.start }}</template>
	<template v-if="args.end" v-slot:end >{{ args.end }}</template>
</FInput>`,
	}),
	argTypes: {
		type: { options: TEXT_ALLOWED_TYPES },
	},
	args: {
		start: '$',
		end: '%',
	},
};


/**
 * @todo add icons
 */
export const TextWithIcons = {
	render: (args, { argTypes }) => ({
		name: 'FInputTextWithSlotsStory',
		props: Object.keys(argTypes),
		components: { FInput },
		setup() { return { args }; },
		template: `<FInput v-bind="args" >
	<template v-if="args.start" v-slot:start >{{ args.start }}</template>
	<template v-if="args.end" v-slot:end >{{ args.end }}</template>
</FInput>`,
	}),
	argTypes: {
		type: { options: TEXT_ALLOWED_TYPES },
	},
	args: {
		start: '$',
		end: '%',
	},
};


/**
 * @todo add clear button
 */
export const TextWithClearButton = {
	render: (args, { argTypes }) => ({
		name: 'FInputTextWithSlotsStory',
		props: Object.keys(argTypes),
		components: { FInput },
		setup() { return { args }; },
		template: `<FInput v-bind="args" >
	<template v-if="args.start" v-slot:start >{{ args.start }}</template>
	<template v-if="args.end" v-slot:end >{{ args.end }}</template>
</FInput>`,
	}),
	argTypes: {
		type: { options: TEXT_ALLOWED_TYPES },
	},
	args: {
		start: '$',
		end: '%',
	},
};


// export const Date = {
// 	argTypes: {
// 		type: { control: { type: null }},
// 		useCustomPicker: {
// 			control: 'boolean',
// 			description: 'Use custom datepicker.',
// 			table: {
// 				category: 'props',
// 				type: { summary: 'boolean' },
// 			},
// 		},
// 		showHeader: {
// 			control: 'boolean',
// 			description: 'show header at custom datepicker.',
// 			table: {
// 				category: 'props',
// 				type: { summary: 'boolean' },
// 			},
// 		},
// 	},
// 	args: {
// 		type: 'date',
// 	},
// };


// export const Password = {
// 	argTypes: {
// 		type: { control: { type: null }},
// 	},
// 	args: {
// 		placeholder: 'Password',
// 		type: 'password',
// 	},
// };

// export let Sizes = {
// 	argTypes: {
// 		size: { control: { type: null }},
// 	},
// 	render: (args, { argTypes, updateArgs }) => ({
// 		props: Object.keys(argTypes),
// 		components: { FInputAutocomplete },
// 		setup() {
// 			let modelValue = makeUpdateArg('modelValue', args, updateArgs);
// 			let query = makeUpdateArg('query', args, updateArgs);
// 			let newArgs = computed(() => ({ ...args, 'onUpdate:modelValue': modelValue[1], 'onUpdate:query': query[1] }));
// 			return { args: newArgs };
// 		},
// 		template: `<table class="state-preview_table" >
// 	<tbody>
// 		<tr>
// 			<td>small</td>
// 			<td>37px</td>
// 			<td><FInputAutocomplete v-bind="args" size="small" /></td>
// 		</tr>
// 		<tr>
// 			<td>regular</td>
// 			<td>42px</td>
// 			<td><FInputAutocomplete v-bind="args" size="regular" /></td>
// 		</tr>
// 		<tr>
// 			<td>large</td>
// 			<td>52px</td>
// 			<td><FInputAutocomplete v-bind="args" size="large" /></td>
// 		</tr>
// 	</tbody>
// </table>`,
// 	}),
// };

// export let Scheme = {
// 	parameters: { layout: 'fullscreen' },
// 	argTypes: {
// 		modelValue: { control: { type: null }},
// 		units: { control: { type: null }},
// 		type: { control: { type: null }},
// 	},
// 	render: (args, { argTypes, updateArgs }) => ({
// 		props: Object.keys(argTypes),
// 		components: { FInput },
// 		setup() {
// 			let text = ref();
// 			let date = ref();
// 			let password = ref();
// 			let newArgs = computed(() => {
// 				const { type, ..._args } = args; // eslint-disable-line no-unused-vars
// 				return _args;
// 			});
// 			return { text, date, password, args: newArgs };
// 		},
// 		template: `<div class="storybook-scheme_preview columns" >
// 		<div class="light" ><div>
// 			<p><FInput v-model="text" v-bind="args" type="text" /></p>
// 			<p><FInput v-model="date" v-bind="args" type="date" /></p>
// 			<p><FInput v-model="password" v-bind="args" type="password" /></p>
// 		</div></div>
// 		<div class="dark" ><div>
// 			<p><FInput v-model="text" v-bind="args" type="text" /></p>
// 			<p><FInput v-model="date" v-bind="args" type="date" /></p>
// 			<p><FInput v-model="password" v-bind="args" type="password" /></p>
// 		</div></div>
// </div>`,
// 	}),
// };


export const WithError = {
	argTypes: {
		error: { control: { type: null }},
	},
	args: {
		error: '<error>',
	},
};


export const Sizes = {
	parameters: {
		docs: {
			description: {
				story: `Predefined sizes for different contexts:

\`\`\`html
<FInput size="<size>" />
\`\`\``,
			},
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputSizesStory',
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const LABELS = [
					// '20px',
					// '28px',
					// '34px',
					'37px',
					'42px',
					// '48px',
					'52px',
				];
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = { [updateValue[0]]: updateValue[1] };
				return { args, promisedArgs, LABELS, SIZE_CHOICES };
			},
			template: `<table class="preview-table" ><tbody>
		<tr v-for="size, i in SIZE_CHOICES" :key="size[0]" >
			<td class="label" >{{ LABELS[i] }}</td>
			<td class="label" >{{ size }}</td>
			<td><FInput v-bind="args" v-on="promisedArgs" :size="size" /></td>
		</tr>
	</tbody></table>`,
		};
	},
	argTypes: {
		size: { control: { type: null }},
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
			name: 'FInputSchemeStory',
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = { [updateValue[0]]: updateValue[1] };
				return { args, promisedArgs };
			},
			template: `<div class="sbpst-scheme_preview sbpst-row" >
		<div class="sbpst-light" >
			<table class="preview-table" ><tbody>
				<tr>
					<td>
						<FInput v-bind="args" v-on="promisedArgs" :disabled="false" />
					</td>
				</tr>
				<tr>
					<td>
						<FInput v-bind="args" v-on="promisedArgs" disabled />
					</td>
				</tr>
			</tbody></table>
		</div>
		<div class="sbpst-dark" >
			<table class="preview-table" ><tbody>
				<tr>
					<td>
						<FInput v-bind="args" v-on="promisedArgs" :disabled="false" />
					</td>
				</tr>
				<tr>
					<td>
						<FInput v-bind="args" v-on="promisedArgs" disabled />
					</td>
				</tr>
			</tbody></table>
		</div>
	</div>`,
		};
	},
	argTypes: {
		disabled: { control: { type: null }},
	},
	args: {
		disabled: '<disabled>',
	},
};
