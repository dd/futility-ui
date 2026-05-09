import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/sb.stuff.js';
import FTextarea from './index.vue';
import { SIZE_CHOICES } from './constants';
import Readme from './README.md?raw';


export default {
	title: 'Forms/FTextarea',
	component: FTextarea,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		},
	},
	argTypes: {
		modelValue: {
			description: 'Current textarea value.',
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'string' },
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
		placeholder: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'text' },
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		// EVENTS
		'update:modelValue': {
			action: 'update:modelValue',
			control: false,
			description: 'Emitted when the textarea value changes.',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const modelValueArg = makeUpdateArg('modelValue', updateArgs);
		return {
			components: { FTextarea },
			setup() {
				const newArgs = computed(() => {
					const result = { ...args };
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: '<FTextarea v-bind="args" placeholder="Write text here ..." />',
		};
	},
	args: {
		modelValue: '',
		size: 'm',
		error: false,
	},
};


export const Default = {};


const STATES_TEMPLATE = `<table class="sbfui-preview-table" ><tbody>
	<tr>
		<td></td>
		<td style="text-align:center;" class="sbfui-pt-label" >default</td>
		<td style="text-align:center;" class="sbfui-pt-label" >error</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >default</td>
		<td>
			<FTextarea
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
			/>
		</td>
		<td>
			<FTextarea
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
				error
			/>
		</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >with&nbsp;value</td>
		<td>
			<FTextarea
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
			/>
		</td>
		<td>
			<FTextarea
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
				error
			/>
		</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled</td>
		<td>
			<FTextarea
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
				disabled
			/>
		</td>
		<td>
			<FTextarea
				v-model="modelValue1"
				v-bind="args"
				placeholder="Placeholder"
				error
				disabled
			/>
		</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled<br />+&nbsp;value</td>
		<td>
			<FTextarea
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
				disabled
			/>
		</td>
		<td>
			<FTextarea
				v-model="modelValue2"
				v-bind="args"
				placeholder="Placeholder"
				error
				disabled
			/>
		</td>
	</tr>
</tbody></table>`;


export const States = {
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
		error: { control: { type: null }},
	},
	render: (args, { argTypes }) => {
		return {
			name: 'FTextareaStatesStory',
			props: Object.keys(argTypes),
			components: { FTextarea },
			setup() {
				const {
					modelValue,
					'update:modelValue': _a,
					'disabled': _b,
					'error': _c,
					...filteredArgs
				} = args;  // eslint-disable-line no-unused-vars
				const modelValue1 = ref();
				const modelValue2 = ref('Brown fox jumps over the lazy dog');
				return { args: filteredArgs, modelValue1, modelValue2 };
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


const SIZES_DESCRIPTION = `The \`size\` prop defines the textarea font size and padding:

\`\`\`html
<FTextarea size="<size>" />
\`\`\`
`;

const SIZES_TEMPLATE = `<table class="sbfui-preview-table" ><tbody>
	<tr v-for="size, i in SIZE_CHOICES" :key="size" >
		<td class="sbfui-pt-label" >{{ size }}</td>
		<td>
			<FTextarea v-bind="args" :size="size" placeholder="Placeholder" />
		</td>
	</tr>
</tbody></table>`;


export const Sizes = {
	parameters: {
		docs: {
			description: { story: SIZES_DESCRIPTION },
		},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const modelValueArg = makeUpdateArg('modelValue', updateArgs);
		return {
			name: 'FTextareaSizesStory',
			components: { FTextarea },
			setup() {
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['size'];
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
		size: { control: { type: null }},
	},
	args: {
		size: '<size>',
	},
};


const SCHEME_TEMPLATE = `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FTextarea v-bind="args" placeholder="Placeholder" />
				</td>
			</tr>
			<tr>
				<td>
					<FTextarea v-bind="args" disabled placeholder="Placeholder" />
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FTextarea v-bind="args" placeholder="Placeholder" />
				</td>
			</tr>
			<tr>
				<td>
					<FTextarea v-bind="args" disabled placeholder="Placeholder" />
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`;


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const modelValueArg = makeUpdateArg('modelValue', updateArgs);
		return {
			name: 'FTextareaSchemeStory',
			components: { FTextarea },
			setup() {
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['disabled'];
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
