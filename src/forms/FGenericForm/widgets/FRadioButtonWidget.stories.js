import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import FRadioButtonWidgetComponent from './FRadioButtonWidget.vue';
import { getFormDefaults } from '../utils';
import { DEFAULT_WIDGETS } from '../constants.js';


const DESCRIPTION = `\`FRadioButtonWidget\` is the built-in widget for \`type: 'radio'\`.
It renders a group of \`FRadioButton\` inputs with \`FControlLabel\`, driven by \`meta.choices\`.
The field value is the selected choice's \`value\`.`;


const PLAN_CHOICES = [
	{ value: 'free', label: 'Free' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'enterprise', label: 'Enterprise' },
];


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FRadioButtonWidget',
	component: FRadioButtonWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		...WIDGET_BASE_ARG_TYPES,
		choices: {
			description: 'List of options: `[{ value, label, disabled? }]`.',
			control: 'object',
			table: { category: 'props', subcategory: 'meta' },
		},
	},
	render: makeFGFWidgetRenderer(),
	args: {
		type: 'radio',
		label: 'Plan',
		helpText: 'Choose your subscription plan.',
		choices: PLAN_CHOICES,
		fields: [{ fieldName: 'plan', default: null, required: true }],
		modelValue: { plan: null },
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};


const STATES_META = [
	{
		type: 'radio',
		label: 'Notifications',
		helpText: 'How often would you like to be notified?',
		choices: [
			{ value: 'never', label: 'Never' },
			{ value: 'weekly', label: 'Weekly' },
			{ value: 'daily', label: 'Daily' },
		],
		fields: [{ fieldName: 'notifications', default: 'weekly' }],
	},
	{
		type: 'radio',
		label: 'Role',
		helpText: 'Disabled group example.',
		choices: [
			{ value: 'viewer', label: 'Viewer' },
			{ value: 'editor', label: 'Editor' },
		],
		fields: [{ fieldName: 'role', default: 'viewer', disabled: true }],
	},
];


export const States = {
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
validation messages. The label highlights in red and the message appears in a tooltip on the
error icon.`;

export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	args: {
		fieldErrors: {
			plan: 'Please select a plan to continue.',
		},
	},
};
