import { WIDGET_BASE_ARG_TYPES, makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '../sb.stuff.js';
import { DEFAULT_WIDGETS } from '../constants.js';
import FNumberPickerWidgetComponent from './FNumberPickerWidget.vue';
import { getFormDefaults } from '../utils';


const DEFAULT_DESCRIPTION = `\`FNumberPickerWidget\` is the built-in widget for \`type: 'number_picker'\`.

It renders \`FNumberPicker\` — a numeric input with increment and decrement buttons.

Supports \`min\`, \`max\`, \`disableInput\`, \`allowExtremeClicks\`, \`focusableButtons\`,
and \`texts\` options via field meta. Field-level flags \`disabled\` and per-field
\`fieldErrors\` are forwarded automatically from the meta.`;


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FNumberPickerWidget',
	component: FNumberPickerWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DEFAULT_DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		...WIDGET_BASE_ARG_TYPES,
		min: {
			description: 'Minimum allowed value.',
			control: 'number',
			table: { category: 'props', subcategory: 'meta' },
		},
		max: {
			description: 'Maximum allowed value.',
			control: 'number',
			table: { category: 'props', subcategory: 'meta' },
		},
	},
	render: makeFGFWidgetRenderer(),
	args: {
		type: 'number_picker',
		label: 'Quantity',
		helpText: 'Select the desired quantity.',
		fields: [{ fieldName: 'quantity', default: 1 }],
		modelValue: { quantity: 1 },
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};


const STATES_DESCRIPTION = `The widget supports several visual and functional states:
default, disabled, with min/max constraints, and with input editing disabled.`;

const STATES_META = [
	{
		type: 'number_picker',
		label: 'Default',
		helpText: 'Standard number picker.',
		fields: [{ fieldName: 'default_val', default: 5 }],
	},
	{
		type: 'number_picker',
		label: 'With limits',
		helpText: 'Constrained to 0–10.',
		min: 0,
		max: 10,
		fields: [{ fieldName: 'limited_val', default: 5 }],
	},
	{
		type: 'number_picker',
		label: 'Input disabled',
		helpText: 'Value can only be changed via buttons.',
		disableInput: true,
		focusableButtons: true,
		fields: [{ fieldName: 'btn_only_val', default: 3 }],
	},
	{
		type: 'number_picker',
		label: 'Disabled',
		helpText: 'Fully disabled picker.',
		fields: [{ fieldName: 'disabled_val', default: 7, disabled: true }],
	},
];


export const States = {
	parameters: {
		docs: { description: { story: STATES_DESCRIPTION }},
	},
	render: makeFGFWidgetManyRenderer(),
	argTypes: {
		meta: { control: false },
		modelValue: { control: false },
	},
	args: {
		meta: STATES_META,
		modelValue: getFormDefaults(STATES_META, DEFAULT_WIDGETS),
	},
};


const ERRORS_DESCRIPTION = `Pass a \`fieldErrors\` object keyed by \`fieldName\` to surface
validation messages. The label highlights in red and the message appears next to the label.`;

export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	args: {
		fieldErrors: {
			quantity: 'Value must be between 1 and 100.',
		},
	},
};
