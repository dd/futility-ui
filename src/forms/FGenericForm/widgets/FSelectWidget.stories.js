import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import { DEFAULT_WIDGETS } from '../constants.js';
import FSelectWidgetComponent from './FSelectWidget.vue';
import { getFormDefaults } from '../utils';


const DEFAULT_DESCRIPTION = `\`FSelectWidget\` is the built-in widget for \`type: 'select'\`.

It renders \`FSelect\` inside \`FFormRow\`, driven by \`meta.choices\` — the same shape used by
\`FRadioButtonWidget\`: \`[{ value, label, disabled? }]\`.

Set \`meta.emptyOptionLabel\` to add a blank placeholder option at the top of the list
(its value defaults to \`null\`, overridable via \`meta.emptyOptionValue\`).

Field-level flags \`disabled\`, \`required\`, and per-field \`fieldErrors\` are forwarded
automatically from the meta.`;


const PLAN_CHOICES = [
	{ value: 'free', label: 'Free' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'enterprise', label: 'Enterprise' },
];

const DEFAULT_META = {
	type: 'select',
	label: 'Plan',
	helpText: 'Choose your subscription plan.',
	emptyOptionLabel: '---',
	choices: PLAN_CHOICES,
	fields: [{
		fieldName: 'plan',
		default: null,
	}],
};


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FSelectWidget',
	component: FSelectWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DEFAULT_DESCRIPTION }},
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


const STATES_DESCRIPTION = `Field-level \`disabled\` flag and the \`emptyOptionLabel\` placeholder
are both driven by meta — no extra props needed on the widget.`;

const STATES_META = [
	{
		type: 'select',
		label: 'Plan',
		helpText: 'With empty option placeholder.',
		emptyOptionLabel: '---',
		choices: PLAN_CHOICES,
		fields: [{ fieldName: 'plan', default: null }],
	},
	{
		type: 'select',
		label: 'Role',
		helpText: 'Disabled select example.',
		choices: [
			{ value: 'viewer', label: 'Viewer' },
			{ value: 'editor', label: 'Editor' },
		],
		fields: [{ fieldName: 'role', default: 'viewer', disabled: true }],
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
validation messages. The select highlights in red and the message appears in a tooltip on the
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
