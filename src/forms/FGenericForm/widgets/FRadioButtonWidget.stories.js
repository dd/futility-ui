import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import FRadioButtonWidgetComponent from './FRadioButtonWidget.vue';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';
import { DEFAULT_WIDGETS } from '../constants.js';


const DESCRIPTION = `\`FRadioButtonWidget\` is the built-in widget for \`type: 'radio'\`.
It renders a group of \`FRadioButton\` inputs with \`FControlLabel\`, driven by \`meta.choices\`.
The field value is the selected choice's \`value\`.`;


const DEFAULT_META = {
	type: 'radio',
	label: 'Plan',
	helpText: 'Choose your subscription plan.',
	choices: [
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'enterprise', label: 'Enterprise' },
	],
	fields: [{
		fieldName: 'plan',
		default: null,
		required: true,
	}],
};


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FRadioButtonWidget',
	component: FRadioButtonWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: WIDGET_BASE_ARG_TYPES,
	render: makeFGFWidgetRenderer(),
	args: {
		meta: DEFAULT_META,
		modelValue: getFormDefaults([DEFAULT_META], DEFAULT_WIDGETS),
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


const ERRORS_META = {
	type: 'radio',
	label: 'Plan',
	choices: [
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
	],
	fields: [{ fieldName: 'plan', default: null, required: true }],
};


export const Errors = {
	args: {
		fieldErrors: {
			plan: 'Please select a plan to continue.',
		},
		meta: ERRORS_META,
		modelValue: getFormDefaults([ERRORS_META], DEFAULT_WIDGETS),
	},
};
