import { computed } from 'vue';

import Readme from './README.md?raw';
import FInput from '@/forms/FInput';
import FFormRow from '.';
import { SIZE_CHOICES, LAYOUT_CHOICES } from './constants';


const DEFAULT_TEMPLATE = `<div class="sbfui-fformrow" >
	<FFormRow v-bind="clearArgs" >
		<template #label ><span v-html="args.label" /></template>
		<FInput
			:id="args.id"
			:error="args.errorHighlight"
			:disabled="args.disabled"
			placeholder="Placeholder"
		/>
		<template #help ><span v-html="args.help" /></template>
	</FFormRow>
</div>`;


export default {
	title: 'Forms/FFormRow',
	component: FFormRow,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		},
	},
	argTypes: {
		id: {
			control: { type: 'text' },
			table: {
				type: { summary: 'string | number' },
			},
		},
		layout: {
			options: LAYOUT_CHOICES,
			control: { type: 'select' },
		},
		size: {
			options: SIZE_CHOICES,
			control: 'select',
		},
		// Slots
		label: {
			description: 'Slot for the row label.',
			control: { type: 'text' },
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		default: {
			description: 'Slot for form fields or custom widgets.',
			control: { type: null },
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		help: {
			description: 'Slot for hint or help text shown below the field.',
			control: { type: 'text' },
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FFormRowStory',
		props: Object.keys(argTypes),
		components: { FFormRow, FInput },
		setup() {
			const clearArgs = computed(() => {
				const { 'default': _a, 'label': _b, 'help': _c, ...filteredArgs } = args;
				return filteredArgs;
			});
			return { args, clearArgs };
		},
		template: DEFAULT_TEMPLATE,
	}),
	args: {
		id: 'test-row',
		layout: 'one_column',
		size: 'm',
		errorHighlight: false,
		disabled: false,
		label: 'Label',
		help: 'Helper text with a <a href="#" target=_blank >link</a>',
	},
};


export const Default = {
	args: {
		id: 'default-preview-row',
	},
};


const ERROR_DESCRIPTION = `
Use \`errorHighlight\` to highlight the label in red, and \`errorText\` to show a tooltip icon next
to the input. Both props are independent and can be used separately or together.
`;


export const errorHighlight = {
	parameters: {
		docs: { description: { story: ERROR_DESCRIPTION }},
	},
	args: {
		id: 'error-highlight-preview-row',
		errorHighlight: true,
	},
};


export const errorText = {
	args: {
		id: 'error-text-preview-row',
		errorText: "Error text",
	},
};


export const Disabled = {
	args: {
		id: 'disabled-preview-row',
		disabled: true,
	},
};


const LAYOUT_ONE_DESCRIPTION = `Label is placed above the input. Suitable for narrow containers or mobile
layouts.

The \`layout\` prop is a free string - built-in values are \`one_column\` and \`two_columns\`, but
you can pass any custom value and target it with a \`.fui-fr-layout-{value}\` CSS class.`;


const LAYOUT_ONE_TEMPLATE = `<div class="sbfui-preview-flex-y sbfui-fformrow" style="gap:20px;" >
	<FFormRow v-bind="clearArgs" id="layout_one_column-input-1" layout="one_column" >
		<template #label >Field 1</template>
		<FInput
			id="layout_one_column-input-1"
			:error="args.errorHighlight"
			:disabled="args.disabled"
			placeholder="Placeholder"
		/>
		<template #help >Help text for field 1</template>
	</FFormRow>
	<FFormRow v-bind="clearArgs" id="layout_one_column-input-2" layout="one_column" >
		<template #label >Field 2</template>
		<FInput
			id="layout_one_column-input-2"
			:error="args.errorHighlight"
			:disabled="args.disabled"
			placeholder="Placeholder"
		/>
		<template #help >Help text for field 2</template>
	</FFormRow>
</div>`;


export const layoutOneColumn = {
	name: 'Layout: One Column',
	parameters: {
		docs: {
			description: { story: LAYOUT_ONE_DESCRIPTION },
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FFormRowLayoutOneColumnStory',
		props: Object.keys(argTypes),
		components: { FFormRow, FInput },
		setup() {
			const clearArgs = computed(() => {
				const { 'label': _a, 'help': _b, 'id': _c, 'layout': _d, ...filteredArgs } = args;
				return filteredArgs;
			});
			return { args, clearArgs };
		},
		template: LAYOUT_ONE_TEMPLATE,
	}),
	argTypes: {
		label: { control: { type: null }},
		help: { control: { type: null }},
		id: { control: { type: null }},
		layout: { control: { type: null }},
	},
	args: {
		label: '<label>',
		help: '<help>',
		id: '<id>',
		layout: 'one_column',
	},
};


const LAYOUT_TWO_DESCRIPTION = `Label is placed to the left of the input at a fixed width
(\`--spacing-formrow-label\`, default \`150px\`). The label is vertically aligned to the input
baseline based on the \`size\` prop.`;


const LAYOUT_TWO_TEMPLATE = `<div class="sbfui-preview-flex-y sbfui-fformrow" style="gap:20px;" >
	<FFormRow v-bind="clearArgs" id="layout_two_columns-input-1" layout="two_columns" >
		<template #label >Field 1</template>
		<FInput
			id="layout_two_columns-input-1"
			:error="args.errorHighlight"
			:disabled="args.disabled"
			placeholder="Placeholder"
		/>
		<template #help >Help text for field 1</template>
	</FFormRow>
	<FFormRow v-bind="clearArgs" id="layout_two_columns-input-2" layout="two_columns" >
		<template #label >Field 2</template>
		<FInput
			id="layout_two_columns-input-2"
			:error="args.errorHighlight"
			:disabled="args.disabled"
			placeholder="Placeholder"
		/>
		<template #help >Help text for field 2</template>
	</FFormRow>
</div>`;


export const layoutTwoColumns = {
	name: 'Layout: Two Columns',
	parameters: {
		docs: {
			description: { story: LAYOUT_TWO_DESCRIPTION },
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FFormRowLayoutTwoColumnsStory',
		props: Object.keys(argTypes),
		components: { FFormRow, FInput },
		setup() {
			const clearArgs = computed(() => {
				const { 'label': _a, 'help': _b, 'id': _c, 'layout': _d, ...filteredArgs } = args;
				return filteredArgs;
			});
			return { args, clearArgs };
		},
		template: LAYOUT_TWO_TEMPLATE,
	}),
	argTypes: {
		label: { control: { type: null }},
		help: { control: { type: null }},
		id: { control: { type: null }},
		layout: { control: { type: null }},
	},
	args: {
		label: '<label>',
		help: '<help>',
		id: '<id>',
		layout: 'two_columns',
	},
};


const SIZES_DESCRIPTION = `The \`size\` prop adjusts the label's top padding so it aligns with the
input's text baseline in \`two_columns\` layout. Built-in values are \`s\`, \`m\`, and \`xl\`.

The \`size\` prop is a free string - you can pass any custom value and define label alignment with
a \`.fui-fr-size-{value}\` CSS class inside \`.fui-fr-layout-two_columns\`.`;


const SIZES_TEMPLATE = `<div class="sbfui-preview-flex-y sbfui-fformrow-size" >
	<FFormRow
		v-for="size in SIZE_CHOICES"
		:key="size[0]"
		v-bind="clearArgs"
		:size="size"
		:id="\`size-input-\${size}\`"
	>
		<template #label >Size {{ size.toUpperCase() }}</template>
		<FInput
			:id="\`size-input-\${size}\`"
			:size="size"
			:error="args.errorHighlight"
			:disabled="args.disabled"
			placeholder="Placeholder"
		/>
		<template #help >Form row with size: '{{ size }}'</template>
	</FFormRow>
</div>`;


export const Sizes = {
	parameters: {
		docs: {
			description: { story: SIZES_DESCRIPTION },
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FFormRowSizesStory',
		props: Object.keys(argTypes),
		components: { FFormRow, FInput },
		setup() {
			const clearArgs = computed(() => {
				const { 'label': _a, 'help': _b, 'id': _c, 'size': _d, ...filteredArgs } = args;
				return filteredArgs;
			});
			return { args, clearArgs, SIZE_CHOICES };
		},
		template: SIZES_TEMPLATE,
	}),
	argTypes: {
		label: { control: { type: null }},
		help: { control: { type: null }},
		id: { control: { type: null }},
		size: { control: { type: null }},
	},
	args: {
		label: '<label>',
		help: '<help>',
		id: '<id>',
		layout: 'two_columns',
		size: '<size>',
	},
};


const SCHEME_TEMPLATE = `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FFormRow v-bind="clearArgs" id="scheme-input_def-1" >
						<template #label >Default field</template>
						<FInput
							id="scheme-input_def-1"
							:size="args.size"
							placeholder="Placeholder"
						/>
						<template #help >
							Helper text with a <a href="#" target=_blank >link</a>
						</template>
					</FFormRow>
				</td>
			</tr>
			<tr>
				<td>
					<FFormRow
						v-bind="clearArgs"
						id="scheme-input_error-1"
						errorHighlight
						errorText="Error text example"
					>
						<template #label >Field with Error</template>
						<FInput
							id="scheme-input_error-1"
							:size="args.size"
							placeholder="Placeholder"
							error
						/>
						<template #help >
							Helper text with a <a href="#" target=_blank >link</a>
						</template>
					</FFormRow>
				</td>
			</tr>
			<tr>
				<td>
					<FFormRow
						v-bind="clearArgs"
						id="scheme-input_disabled-1"
						disabled
					>
						<template #label >Field with Error</template>
						<FInput
							id="scheme-input_disabled-1"
							:size="args.size"
							placeholder="Placeholder"
							disabled
						/>
						<template #help >
							Helper text with a <a href="#" target=_blank >link</a>
						</template>
					</FFormRow>
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FFormRow v-bind="clearArgs" id="scheme-input_def-2" >
						<template #label >Default field</template>
						<FInput
							id="scheme-input_def-2"
							:size="args.size"
							placeholder="Placeholder"
						/>
						<template #help >
							Helper text with a <a href="#" target=_blank >link</a>
						</template>
					</FFormRow>
				</td>
			</tr>
			<tr>
				<td>
					<FFormRow
						v-bind="clearArgs"
						id="scheme-input_error-2"
						errorHighlight
						errorText="Error text example"
					>
						<template #label >Field with Error</template>
						<FInput
							id="scheme-input_error-2"
							:size="args.size"
							placeholder="Placeholder"
							error
						/>
						<template #help >
							Helper text with a <a href="#" target=_blank >link</a>
						</template>
					</FFormRow>
				</td>
			</tr>
			<tr>
				<td>
					<FFormRow
						v-bind="clearArgs"
						id="scheme-input_disabled-1"
						disabled
					>
						<template #label >Field with Error</template>
						<FInput
							id="scheme-input_disabled-1"
							:size="args.size"
							placeholder="Placeholder"
							disabled
						/>
						<template #help >
							Helper text with a <a href="#" target=_blank >link</a>
						</template>
					</FFormRow>
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`;


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: {
		layout: 'fullscreen',
	},
	render: (args, { argTypes }) => ({
		name: 'FFormRowSchemeStory',
		props: Object.keys(argTypes),
		components: { FFormRow, FInput },
		setup() {
			const clearArgs = computed(() => {
				const {
					'label': _a,
					'help': _b,
					'id': _c,
					'errorHighlight': _d,
					'errorText': _e,
					'disabled': _f,
					...filteredArgs
				} = args;
				return filteredArgs;
			});
			return { args, clearArgs };
		},
		template: SCHEME_TEMPLATE,
	}),
	argTypes: {
		label: { control: { type: null }},
		help: { control: { type: null }},
		id: { control: { type: null }},
		errorHighlight: { control: { type: null }},
		errorText: { control: { type: null }},
		disabled: { control: { type: null }},
	},
	args: {
		label: '<label>',
		help: '<help>',
		id: '<id>',
		errorHighlight: '<bool>',
		errorText: '<error text>',
		disabled: '<disabled>',
	},
};
