import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/sb.stuff.js';
import Readme from './README.md?raw';
import FNumberPicker from './index.vue';
import { SIZE_CHOICES } from './constants';


export default {
	title: 'Forms/FNumberPicker',
	component: FNumberPicker,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		},
	},
	argTypes: {
		modelValue: {
			description: 'Current numeric value.',
			control: 'number',
			table: {
				category: 'props',
				type: { summary: 'number' },
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
		min: {
			control: 'number',
			table: {
				category: 'props',
				type: { summary: 'number' },
			},
		},
		max: {
			control: 'number',
			table: {
				category: 'props',
				type: { summary: 'number' },
			},
		},
		error: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		disabled: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		disableInput: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		allowExtremeClicks: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		focusableButtons: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		// EVENTS
		onClickDecrease: {
			action: 'clickDecrease',
			description: 'Emitted when the decrease button is clicked. Payload is the prospective new value.',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
		onClickIncrease: {
			action: 'clickIncrease',
			description: 'Emitted when the increase button is clicked. Payload is the prospective new value.',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
		'update:modelValue': {
			action: 'update:modelValue',
			description: 'Emitted when the value changes.',
			control: false,
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
			components: { FNumberPicker },
			setup() {
				const newArgs = computed(() => {
					const result = { ...args };
					delete result[modelValueArg[1]];
					result[modelValueArg[0]] = modelValueArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: `<FNumberPicker v-bind="args" />`,
		};
	},
	args: {
		modelValue: 5,
		size: 'm',
		min: 0,
		max: 10,
		error: false,
		disabled: false,
		disableInput: false,
		allowExtremeClicks: false,
		focusableButtons: false,
		texts: {},
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
		<td><FNumberPicker v-model="v1" /></td>
		<td><FNumberPicker v-model="v2" error /></td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >with&nbsp;value</td>
		<td><FNumberPicker v-model="v3" /></td>
		<td><FNumberPicker v-model="v4" error /></td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled</td>
		<td><FNumberPicker v-model="v5" disabled /></td>
		<td><FNumberPicker v-model="v6" error disabled /></td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled<br />+&nbsp;value</td>
		<td><FNumberPicker v-model="v7" disabled /></td>
		<td><FNumberPicker v-model="v8" error disabled /></td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >input&nbsp;disabled</td>
		<td><FNumberPicker v-model="v9" disableInput /></td>
		<td><FNumberPicker v-model="v10" error disableInput /></td>
	</tr>
</tbody></table>`;


export const States = {
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
		error: { control: { type: null }},
		disableInput: { control: { type: null }},
	},
	render: (args) => {
		return {
			name: 'FNumberPickerStatesStory',
			components: { FNumberPicker },
			setup() {
				const v1 = ref(0);
				const v2 = ref(0);
				const v3 = ref(42);
				const v4 = ref(42);
				const v5 = ref(0);
				const v6 = ref(0);
				const v7 = ref(42);
				const v8 = ref(42);
				const v9 = ref(7);
				const v10 = ref(7);
				return { v1, v2, v3, v4, v5, v6, v7, v8, v9, v10 };
			},
			template: STATES_TEMPLATE,
		};
	},
	args: {
		modelValue: '<value>',
		disabled: '<disabled>',
		error: '<error>',
		disableInput: '<disableInput>',
	},
};


const SIZES_DESCRIPTION = `The \`size\` prop defines the component height and padding:

\`\`\`html
<FNumberPicker size="<size>" />
\`\`\`
`;

const SIZES_TEMPLATE = `<table class="sbfui-preview-table" ><tbody>
	<tr v-for="size, i in SIZE_CHOICES" :key="size" >
		<td class="sbfui-pt-label" >{{ LABELS[i] }}</td>
		<td class="sbfui-pt-label" >{{ size }}</td>
		<td>
			<FNumberPicker v-bind="args" :size="size" />
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
			name: 'FNumberPickerSizesStory',
			components: { FNumberPicker },
			setup() {
				const LABELS = [ '20px', '28px', '34px', '37px', '42px', '52px' ];
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['size'];
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


const MIN_MAX_DESCRIPTION = `Use the \`min\` and \`max\` props to constrain the value range.
When the value reaches a boundary, the corresponding button becomes disabled.

\`\`\`html
<FNumberPicker :min="0" :max="10" />
\`\`\`
`;


export const MinMax = {
	name: 'Min / Max',
	parameters: {
		docs: {
			description: { story: MIN_MAX_DESCRIPTION },
		},
	},
	render: () => {
		return {
			components: { FNumberPicker },
			setup() {
				const value = ref(5);
				return { value };
			},
			template: `<FNumberPicker v-model="value" :min="0" :max="10" />`,
		};
	},
	args: {
		modelValue: 5,
		min: 0,
		max: 10,
	},
};


const SCHEME_TEMPLATE = `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td><FNumberPicker v-model="v1" /></td>
			</tr>
			<tr>
				<td><FNumberPicker v-model="v2" disabled /></td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td><FNumberPicker v-model="v3" /></td>
			</tr>
			<tr>
				<td><FNumberPicker v-model="v4" disabled /></td>
			</tr>
		</tbody></table>
	</div>
</div>`;


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: () => {
		return {
			name: 'FNumberPickerSchemeStory',
			components: { FNumberPicker },
			setup() {
				const v1 = ref(5);
				const v2 = ref(5);
				const v3 = ref(5);
				const v4 = ref(5);
				return { v1, v2, v3, v4 };
			},
			template: SCHEME_TEMPLATE,
		};
	},
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
	},
	args: {
		modelValue: '<value>',
		disabled: '<disabled>',
	},
};
