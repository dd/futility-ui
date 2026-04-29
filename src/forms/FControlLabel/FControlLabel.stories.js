import { computed } from 'vue';
import { useArgs } from 'storybook/preview-api';

import Readme from './README.md?raw';
import FControlLabel from '.';
import FCheckbox from '@/forms/FCheckbox';
import FSwitch from '@/forms/FSwitch';
import FRadioButton from '@/forms/FRadioButton';
import { makeRenderer, makeUpdateArg } from '@/utils/storybook';
import { SIZE_CHOICES, LAYOUT_CONTROL_FIRST, LAYOUT_CHOICES } from './constants';


const DEFAULT_TEMPLATE = `<FControlLabel v-bind="args" >
	<component :is="args.default" :size="args.size" :disabled="args.disabled" />
	<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
</FControlLabel>`;


export default {
	title: 'Forms/FControlLabel',
	component: FControlLabel,
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		size: {
			options: SIZE_CHOICES,
			control: 'select',
		},
		layout: {
			options: LAYOUT_CHOICES,
			control: 'select',
			table: {
				defaultValue: { summary: `'${LAYOUT_CONTROL_FIRST}'` },
			},
		},
		default: {
			description: 'Slot for the form control.',
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		labelSlot: {
			name: 'label',
			description: 'Slot for the label. Use when the label requires HTML or rich markup.',
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		size: 'm',
		label: '',
		layout: LAYOUT_CONTROL_FIRST,
		error: false,
		disabled: false,
		default: 'FCheckbox',
		labelSlot: 'Complex label with <a href="https://w.wiki/Pnc" target="_blank" >HTML</a>',
	},
	render: (args, { argTypes }) => {
		return {
			components: { FControlLabel, FCheckbox, FSwitch, FRadioButton },
			props: Object.keys(argTypes),
			setup: () => ({ args }),
			template: DEFAULT_TEMPLATE,
		};
	},
};


export const Default = {};


const LAYOUTS_TEMPLATE = `<div class="sbfui-preview-flex-y sbfui-fcontrollabel-layouts" >
	<FControlLabel
		v-for="layout in LAYOUT_CHOICES"
		:key="layout"

		v-bind="args"
		:layout="layout"
	>
		<component :is="args.default" :size="args.size" :disabled="args.disabled" />
		<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
	</FControlLabel>
</div>`;


export const Layouts = {
	parameters: {
		docs: {
			description: {
				story: 'The `layout` prop controls the order of the control and the label. '
					+ '`control_first` places the control on the left and the label on the right (default). '
					+ '`label_first` reverses the order.',
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FControlLabelLayoutsStory',
		props: Object.keys(argTypes),
		components: { FControlLabel, FCheckbox, FRadioButton, FSwitch },
		setup() {
			const clearArgs = computed(() => {
				const { 'layout': _a, ...filteredArgs } = args;
				return filteredArgs;
			});
			return { args: clearArgs, LAYOUT_CHOICES };
		},
		template: LAYOUTS_TEMPLATE,
	}),
	argTypes: {
		layout: { control: { type: null }},
	},
	args: {
		layout: '<layout>',
		default: 'FSwitch',
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
			<FControlLabel v-bind="args" >
				<component :is="args.default" :size="args.size" />
				<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
			</FControlLabel>
		</td>
		<td>
			<FControlLabel v-bind="args" error >
				<component :is="args.default" :size="args.size" error />
				<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
			</FControlLabel>
		</td>
	</tr>
	<tr>
		<td class="sbfui-pt-label" >disabled</td>
		<td>
			<FControlLabel v-bind="args" disabled >
				<component :is="args.default" :size="args.size" disabled />
				<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
			</FControlLabel>
		</td>
		<td>
			<FControlLabel v-bind="args" error disabled >
				<component :is="args.default" :size="args.size" error disabled />
				<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
			</FControlLabel>
		</td>
	</tr>
</tbody></table>`;


export const States = {
	parameters: {
		docs: {
			description: {
				story: 'The label color reflects the current state of the control: '
					+ 'it dims when the control is `disabled` and turns red when `error` is set. '
					+ 'Both props can be combined.',
			},
		},
	},
	render: (args, { argTypes }) => {
		return {
			components: { FControlLabel, FCheckbox, FRadioButton, FSwitch },
			props: Object.keys(argTypes),
			setup() {
				const clearArgs = computed(() => {
					const { 'disabled': _a, 'error': _b, ...filteredArgs } = args;
					return filteredArgs;
				});
				return { args: clearArgs };
			},
			template: STATES_TEMPLATE,
		};
	},
	argTypes: {
		disabled: { control: { type: null }},
		error: { control: { type: null }},
	},
	args: {
		label: 'Label',
		error: '<error>',
		disabled: '<disabled>',
		labelSlot: '',
	},
};


const SIZES_TEMPLATE = `<div class="sbfui-preview-flex-y" style="align-items:flex-start;" >
	<FControlLabel
		v-for="size in SIZE_CHOICES"
		:key="size[0]"

		v-bind="args"
		:size="size"
		:label="\`Size \${ size.toUpperCase() }\`"
	>
		<component :is="args.default" :size="size" :disabled="args.disabled" />
	</FControlLabel>
</div>`;


export const Sizes = {
	parameters: {
		docs: {
			description: {
				story: 'Pass the same `size` value to both `FControlLabel` and the wrapped control to keep them aligned.',
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FControlLabelSizesStory',
		props: Object.keys(argTypes),
		components: { FControlLabel, FCheckbox, FRadioButton, FSwitch },
		setup() {
			const clearArgs = computed(() => {
				const { 'size': _a, 'label': _b, 'labelSlot': _c, ...filteredArgs } = args;
				return filteredArgs;
			});
			return { args: clearArgs, SIZE_CHOICES };
		},
		template: SIZES_TEMPLATE,
	}),
	argTypes: {
		label: { control: { type: null }},
		size: { control: { type: null }},
		labelSlot: { control: { type: null }},
	},
	args: {
		label: '<label>',
		size: '<size>',
		labelSlot: '<label slot>',
	},
};


const CONTROLS_TEMPLATE = `<div class="sbfui-preview-flex-y" style="align-items: stretch;" >
	<FControlLabel v-bind="args" >
		<FCheckbox :disabled="args.disabled" :size="args.size" />
		<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
	</FControlLabel>
	<FControlLabel v-bind="args" >
		<FRadioButton :disabled="args.disabled" :size="args.size" />
		<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
	</FControlLabel>
	<FControlLabel v-bind="args" >
		<FSwitch :disabled="args.disabled" :size="args.size" />
		<template #label v-if="args.labelSlot" ><span v-html="args.labelSlot" /></template>
	</FControlLabel>
</div>`;


export const Controls = {
	parameters: {
		docs: {
			description: {
				story: '`FControlLabel` is control-agnostic - it works with `FCheckbox`, `FRadioButton`, `FSwitch`, '
					+ 'or any other element placed in the default slot.',
			},
		},
	},
	render: (args, { argTypes }) => {
		return {
			components: { FControlLabel, FCheckbox, FRadioButton, FSwitch },
			props: Object.keys(argTypes),
			setup() { return { args }; },
			template: CONTROLS_TEMPLATE,
		};
	},
	argTypes: {
		default: { control: { type: null }},
	},
	args: {
		default: '<default>',
	},
};


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { FControlLabel, FCheckbox },
		setup() {
			const newArgs = computed(() => {
				const result = { ...args };
				delete result['error'];
				delete result['disabled'];
				return result;
			});
			return { args: newArgs };
		},
		template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FControlLabel v-bind="args" >
						<component :is="args.default" :size="args.size" />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
			<tr>
				<td>
					<FControlLabel v-bind="args" disabled >
						<component :is="args.default" :size="args.size" disabled />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
			<tr>
				<td>
					<FControlLabel v-bind="args" error >
						<component :is="args.default" :size="args.size" />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
			<tr>
				<td>
					<FControlLabel v-bind="args" error disabled >
						<component :is="args.default" :size="args.size" disabled />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FControlLabel v-bind="args" >
						<component :is="args.default" :size="args.size" />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
			<tr>
				<td>
					<FControlLabel v-bind="args" disabled >
						<component :is="args.default" :size="args.size" disabled />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
			<tr>
				<td>
					<FControlLabel v-bind="args" error >
						<component :is="args.default" :size="args.size" />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
			<tr>
				<td>
					<FControlLabel v-bind="args" error disabled >
						<component :is="args.default" :size="args.size" disabled />
						<template #label v-if="args.labelSlot" >
							<span v-html="args.labelSlot" />
						</template>
					</FControlLabel>
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`,
	}),
	argTypes: {
		error: { control: { type: null }},
		disabled: { control: { type: null }},
	},
	args: {
		error: '<error>',
		disabled: '<disabled>',
	},
};
