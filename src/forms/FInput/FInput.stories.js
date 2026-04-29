import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import Readme from './README.md?raw';
import { makeRenderer, makeUpdateArg } from '@/.storybook/utils.js';
import FIcon from '@/FIcon';
import FInput from './index.vue';
import { TEXT_ALLOWED_TYPES, SIZE_CHOICES } from './constants';

const ALL_ALLOWED_TYPES = TEXT_ALLOWED_TYPES.concat([ 'password' ]);


export default {
	title: 'Forms/FInput',
	component: FInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		modelValue: {
			description: 'Current input value. The exact type depends on the selected input type.',
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
			description: 'Content rendered at the start of the input.',
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		end: {
			description: 'Content rendered at the end of the input.',
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
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['start'];
					delete result['end'];
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: `<FInput v-bind="args" placeholder="Placeholder" >
		<template v-if="args.start" v-slot:start >{{ args.start }}</template>
		<template v-if="args.end" v-slot:end >{{ args.end }}</template>
	</FInput>`,
		};
	},
	args: {
		modelValue: '',
		type: 'text',
		size: 'm',
		error: false,
		start: '',
		end: '',
	},
};


export const Default = {};


const TYPES_DESCRIPTION = `The \`type\` prop defines the input’s behavior, validation, and appearance.

\`FInput\` supports the following types: _${ALL_ALLOWED_TYPES.join('_, _')}_.

\`\`\`html
<FInput type="<type>" />
\`\`\``;


const TYPES_TEMPLATE = `<table class="sbfui-preview-table" ><tbody>
	<tr v-for="type in ALL_ALLOWED_TYPES" :key="type" >
		<td class="sbfui-pt-label" >{{ type }}</td>
		<td>
			<FInput v-bind="args" :type="type" placeholder="Placeholder" >
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
	</tr>
</tbody></table>`;


export const Types = {
	parameters: {
		docs: {
			description: { story: TYPES_DESCRIPTION },
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputTypesStory',
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['type'];
					delete result['start'];
					delete result['end'];
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs, ALL_ALLOWED_TYPES };
			},
			template: TYPES_TEMPLATE,
		};
	},
	argTypes: {
		type: { control: { type: null }},
	},
	args: {
		type: '<type>',
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
		<td>
			<FInput
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
		<td>
			<FInput
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
				error
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >with&nbsp;value</td>
		<td>
			<FInput
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
		<td>
			<FInput
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
				error
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled</td>
		<td>
			<FInput
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
				disabled
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
		<td>
			<FInput
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
				error
				disabled
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled<br />+&nbsp;value</td>
		<td>
			<FInput
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
				disabled
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
		<td>
			<FInput
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
				error
				disabled
			>
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
	</tr>
</tbody></table>`;


export const States = {
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
		error: { control: { type: null }},
		type: { control: { type: null }},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputStatesStory',
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const {
					modelValue,
					'update:modelValue': _a,
					'disabled': _b,
					'error': _c,
					'start': _d,
					'end': _e,
					...filteredArgs
				} = args;  // eslint-disable-line no-unused-vars
				const modelValue1 = ref();
				const modelValue2 = ref('Brown fox');
				return { args: filteredArgs, modelValue1, modelValue2 };
			},
			template: STATES_TEMPLATE,
		};
	},
	args: {
		type: 'text',
		modelValue: '<value>',
		disabled: '<disabled>',
		error: '<error>',
	},
};


const SIZES_DESCRIPTION = `The \`size\` prop defines the input height and padding:

\`\`\`html
<FInput size="<size>" />
\`\`\`

You can also specify any custom size value.
In that case, the input automatically receives the class \`fui-input-size-<size>\`,
which you can use to apply your own styles.
`;

const SIZES_TEMPLATE = `<table class="sbfui-preview-table" ><tbody>
	<tr v-for="size, i in SIZE_CHOICES" :key="size[0]" >
		<td class="sbfui-pt-label" >{{ LABELS[i] }}</td>
		<td class="sbfui-pt-label" >{{ size }}</td>
		<td>
			<FInput v-bind="args" :size="size" placeholder="Placeholder" >
				<template v-if="args.start" v-slot:start >{{ args.start }}</template>
				<template v-if="args.end" v-slot:end >{{ args.end }}</template>
			</FInput>
		</td>
	</tr>
</tbody></table>`;


export const Sizes = {
	parameters: {
		docs: {
			description: { story: SIZES_DESCRIPTION },
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FInputSizesStory',
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const LABELS = [ '37px', '42px', '52px' ];
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['size'];
					delete result['start'];
					delete result['end'];
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs, LABELS, SIZE_CHOICES };
			},
			template: SIZES_TEMPLATE,
		};
	},
	argTypes: {
		size: { control: { type: null }},
	},
	args: {
		size: '<size>',
	},
};


const SLOTS_DESCRIPTION = `The component provides two slots, \`start\` and \`end\`, which can be
used to display additional content inside the input, such as units of measurement or any other
contextual information.

These slots are intended primarily for supplementary elements that do not take over input control.
If you need to create a compound field (for example, combining a currency select with an amount
input), consider wrapping multiple controls in a dedicated layout component.

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
component.`;


const SLOTS_TEMPLATE = `<FInput v-bind="args" placeholder="Placeholder" >
	<template v-slot:start ><FIcon name="ruler_combined_outline" /></template>
	<template v-slot:end >mm</template>
</FInput>`;


export const Slots = {
	parameters: {
		docs: {
			description: { story: SLOTS_DESCRIPTION },
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FInput, FIcon },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['start'];
					delete result['end'];
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: SLOTS_TEMPLATE,
		};
	},
	argTypes: {
		start: { control: { type: null }},
		end: { control: { type: null }},
	},
};


const ATTRS_DESCRIPTION = `All attributes passed to the component will be forwarded to the underlying
\`<input>\`	 element, except for \`class\`, which is applied to the wrapper element.

This allows you to use standard input attributes such as \`id\`, \`name\`, \`placeholder\`,
\`maxlength\`, \`disabled\`, \`aria-*\` etc.`;


export const AttributesPassthrough = {
	parameters: {
		docs: {
			description: { story: ATTRS_DESCRIPTION },
		},
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FInput },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['start'];
					delete result['end'];
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: `<FInput v-bind="args" />`,
		};
	},
	argTypes: {
		id: {
			control: 'text',
			table: {
				category: 'Standard Props',
				type: { summary: 'text' },
			},
		},
		name: {
			control: 'text',
			table: {
				category: 'Standard Props',
				type: { summary: 'text' },
			},
		},
		placeholder: {
			control: 'text',
			table: {
				category: 'Standard Props',
				type: { summary: 'text' },
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				category: 'Standard Props',
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


const SCHEME_TEMPLATE = `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FInput v-bind="args" placeholder="Placeholder" >
						<template v-if="args.start" v-slot:start >{{ args.start }}</template>
						<template v-if="args.end" v-slot:end >{{ args.end }}</template>
					</FInput>
				</td>
			</tr>
			<tr>
				<td>
					<FInput v-bind="args" disabled placeholder="Placeholder" >
						<template v-if="args.start" v-slot:start >{{ args.start }}</template>
						<template v-if="args.end" v-slot:end >{{ args.end }}</template>
					</FInput>
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FInput v-bind="args" placeholder="Placeholder" >
						<template v-if="args.start" v-slot:start >{{ args.start }}</template>
						<template v-if="args.end" v-slot:end >{{ args.end }}</template>
					</FInput>
				</td>
			</tr>
			<tr>
				<td>
					<FInput v-bind="args" disabled placeholder="Placeholder" >
						<template v-if="args.start" v-slot:start >{{ args.start }}</template>
						<template v-if="args.end" v-slot:end >{{ args.end }}</template>
					</FInput>
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`;


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
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['disabled'];
					delete result['start'];
					delete result['end'];
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});

				return { args: newArgs };
			},
			template: SCHEME_TEMPLATE,
		};
	},
	argTypes: {
		disabled: { control: { type: null }},
	},
	args: {
		disabled: '<disabled>',
	},
};
