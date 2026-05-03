import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import { DEFAULT_WIDGETS } from '../constants.js';
import FTextareaWidgetComponent from './FTextareaWidget.vue';
import { getFormDefaults } from '../utils';


const DEFAULT_DESCRIPTION = `\`FTextareaWidget\` is the built-in widget for \`type: 'textarea'\`.

It renders \`FTextarea\` inside \`FFormRow\`.

Field-level flags \`disabled\`, \`readonly\`, \`required\`, and per-field \`fieldErrors\` are forwarded
automatically from the meta.`;


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FTextareaWidget',
	component: FTextareaWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DEFAULT_DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		...WIDGET_BASE_ARG_TYPES,
	},
	render: makeFGFWidgetRenderer(),
	args: {
		type: 'textarea',
		label: 'Description',
		helpText: 'Enter a detailed description.',
		fields: [{ fieldName: 'description', default: '' }],
		modelValue: { description: '' },
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};


const STATES_DESCRIPTION = `Field-level \`disabled\` and \`readonly\` flags are driven by meta.`;

const STATES_META = [
	{
		type: 'textarea',
		label: 'Bio',
		helpText: 'Tell us about yourself.',
		fields: [{ fieldName: 'bio', default: '' }],
	},
	{
		type: 'textarea',
		label: 'Notes',
		helpText: 'Disabled textarea example.',
		fields: [{ fieldName: 'notes', default: 'Some notes', disabled: true }],
	},
	{
		type: 'textarea',
		label: 'Comments',
		helpText: 'Read-only textarea example.',
		fields: [{ fieldName: 'comments', default: 'Read-only text', readonly: true }],
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
validation messages.`;

export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	args: {
		fieldErrors: {
			description: 'This field is required.',
		},
	},
};
