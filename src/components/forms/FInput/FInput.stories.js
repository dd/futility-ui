import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/utils/storybook';
import FIcon from '@/components/FIcon';
import FInput from './index.vue';
import { TEXT_ALLOWED_TYPES, SIZE_CHOICES } from './constants';

const ALL_ALLOWED_TYPES = TEXT_ALLOWED_TYPES.concat([ 'password' ]);


const usage = `
\`FInput\` is a versatile input component with built-in styling, validation states, and slot support
for icons and actions.

### Usage

Import the component:

\`\`\`js
import { FInput } from 'futility-ui'
// or
import FInput from 'futility-ui/forms/FInput'
\`\`\`

Use it in your template:

\`\`\`html
<FInput v-model="value" />
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
		},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		modelValue: {
			description: 'The input value. The type depends on the input type.',
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'text | number' },
			},
		},
		type: {
			options: ALL_ALLOWED_TYPES,
			control: 'select',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		size: {
			description: `
Predefined size of the input (${SIZE_CHOICES.join(', ')}) or a custom size class.
			`,
			options: SIZE_CHOICES,
			control: 'select',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		error: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		// SLOTS
		start: {
			description: 'Slot content rendered at the start of the input.',
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		end: {
			description: 'Slot content rendered at the end of the input.',
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		// EVENTS
		'update:modelValue': {
			action: 'update:modelValue',
			description: 'Emitted when the input value changes.',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		modelValue: '',
		type: 'text',
		size: 'm',
		error: false,
		start: '',
		end: '',
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = { [updateValue[0]]: updateValue[1] };
				return { args, promisedArgs };
			},
			template: `<FInput v-bind="args" v-on="promisedArgs" placeholder="Placeholder" >
		<template v-if="args.start" v-slot:start >{{ args.start }}</template>
		<template v-if="args.end" v-slot:end >{{ args.end }}</template>
	</FInput>`,
		};
	},
};


export const Default = {};


export const Types = {
	parameters: {
		docs: {
			description: {
				story: `The \`type\` prop defines the input’s behavior, validation, and appearance.

\`FInput\` supports the following types: <i>${ALL_ALLOWED_TYPES.join('</i>, <i>')}</i>.

\`\`\`html
<FInput type="<type>" />
\`\`\``,
			},
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputTypesStory',
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = { [updateValue[0]]: updateValue[1] };
				return { args, promisedArgs, ALL_ALLOWED_TYPES };
			},
			template: `<table class="preview-table" ><tbody>
		<tr v-for="type in ALL_ALLOWED_TYPES" :key="type" >
			<td class="label" >{{ type }}</td>
			<td>
				<FInput v-bind="args" v-on="promisedArgs" :type="type" placeholder="Placeholder" >
					<template v-if="args.start" v-slot:start >{{ args.start }}</template>
					<template v-if="args.end" v-slot:end >{{ args.end }}</template>
				</FInput>
			</td>
		</tr>
	</tbody></table>`,
		};
	},
	argTypes: {
		type: { control: { type: null }},
	},
	args: {
		type: '<type>',
	},
};


export const ErrorState = {
	parameters: {
		docs: {
			description: {
				story: `You can use the \`error\` prop to indicate validation errors. It visually
highlights the input to draw attention.

\`\`\`html
<FInput error />
\`\`\``,
			},
		},
	},
	argTypes: {
		error: { control: { type: null }},
	},
	args: {
		error: true,
	},
};


export const Sizes = {
	parameters: {
		docs: {
			description: {
				story: `The \`size\` prop defines the input height and padding:

\`\`\`html
<FInput size="<size>" />
\`\`\`

You can also specify any custom size value.
In that case, the input automatically receives the class: \`fui-input-size-<size>\`
which you can use to apply your own styles.
`,
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
			<td>
				<FInput v-bind="args" v-on="promisedArgs" :size="size" placeholder="Placeholder" >
					<template v-if="args.start" v-slot:start >{{ args.start }}</template>
					<template v-if="args.end" v-slot:end >{{ args.end }}</template>
				</FInput>
			</td>
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


export const Slots = {
	parameters: {
		docs: {
			description: {
				story: `
The component provides two slots, \`start\` and \`end\`, which can be used to display additional
content inside the input, such as units of measurement or any other contextual information.

These slots are intended primarily for supplementary elements that do not take over input control.
If you need to create a compound field (for example, combining a select dropdown for currency with
a text input for the amount), consider using the \`FWidgetsGroup\` component (in progress).

\`\`\`html
<FInput>
	<template #start>
		<!-- Your content here -->
	</template>
	<template #end>
		<!-- Your content here -->
	</template>
</FInput>
\`\`\`

For inputs with \`type="password"\`, the following properties are available in the slot scope:

* \`showPasswordStatus\` - a boolean indicating whether the password is currently visible.
* \`showPassword\` - a method that shows the password.
* \`hidePassword\` - a method that hides the password.

Using these props, you can implement your own custom password visibility toggle button, or simply
use the built-in [FInputShowPasswordButton](?path=/docs/forms-finput-showpasswordbutton--docs)
component.`,
			},
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FInput, FIcon },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = { [updateValue[0]]: updateValue[1] };
				return { args, promisedArgs };
			},
			template: `<FInput v-bind="args" v-on="promisedArgs" placeholder="Placeholder" >
	<template v-slot:start ><FIcon name="ruler_combined_outline" /></template>
	<template v-slot:end >mm</template>
</FInput>`,
		};
	},
	argTypes: {
		start: { control: { type: null }},
		end: { control: { type: null }},
	},
};


export const AttributesPassthrough = {
	parameters: {
		docs: {
			description: {
				story: `All attributes passed to the component will be forwarded to the underlying
\`<input>\`	 element, except for \`class\`, which is applied to the wrapper element.

This allows you to use any standard input attributes, such as: \`id\`, \`name\`, \`placeholder\`,
\`maxlength\`, \`disabled\`, \`aria-*\` etc.`,
			},
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = { [updateValue[0]]: updateValue[1] };
				return { args, promisedArgs };
			},
			template: `<FInput v-bind="args" v-on="promisedArgs" />`,
		};
	},
	argTypes: {
		id: {
			control: 'text',
			table: {
				category: 'Standart Props',
				type: { summary: 'text' },
			},
		},
		name: {
			control: 'text',
			table: {
				category: 'Standart Props',
				type: { summary: 'text' },
			},
		},
		placeholder: {
			control: 'text',
			table: {
				category: 'Standart Props',
				type: { summary: 'text' },
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				category: 'Standart Props',
				type: { summary: 'boolean' },
			},
		},
	},
	args: {
		id: 'example_input',
		name: 'example_input',
		placeholder: 'Placeholder',
		disabled: false,
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
						<FInput v-bind="args" v-on="promisedArgs" placeholder="Placeholder" >
							<template v-if="args.start" v-slot:start >{{ args.start }}</template>
							<template v-if="args.end" v-slot:end >{{ args.end }}</template>
						</FInput>
					</td>
				</tr>
				<tr>
					<td>
						<FInput v-bind="args" v-on="promisedArgs" disabled placeholder="Placeholder" >
							<template v-if="args.start" v-slot:start >{{ args.start }}</template>
							<template v-if="args.end" v-slot:end >{{ args.end }}</template>
						</FInput>
					</td>
				</tr>
			</tbody></table>
		</div>
		<div class="sbpst-dark" >
			<table class="preview-table" ><tbody>
				<tr>
					<td>
						<FInput v-bind="args" v-on="promisedArgs" placeholder="Placeholder" >
							<template v-if="args.start" v-slot:start >{{ args.start }}</template>
							<template v-if="args.end" v-slot:end >{{ args.end }}</template>
						</FInput>
					</td>
				</tr>
				<tr>
					<td>
						<FInput v-bind="args" v-on="promisedArgs" disabled placeholder="Placeholder" >
							<template v-if="args.start" v-slot:start >{{ args.start }}</template>
							<template v-if="args.end" v-slot:end >{{ args.end }}</template>
						</FInput>
					</td>
				</tr>
			</tbody></table>
		</div>
	</div>`,
		};
	},
};
