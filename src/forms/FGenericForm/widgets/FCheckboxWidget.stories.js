import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import { DEFAULT_WIDGETS } from '../constants.js';
import FCheckboxWidgetComponent from './FCheckboxWidget.vue';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';


const DEFAULT_DESCRIPTION = `\`FCheckboxWidget\` is the built-in widget for \`type: 'checkbox'\`.
It renders \`FCheckbox\` with \`FControlLabel\`, and forwards field-level \`disabled\`,
\`required\`, and validation state from generic form metadata.`;


const DEFAULT_META = {
	type: 'checkbox',
	label: 'Accept terms',
	helpText: 'Required to continue.',
	fields: [{
		fieldName: 'accept_terms',
		default: false,
		required: true,
	}],
};


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FCheckboxWidget',
	component: FCheckboxWidgetComponent,
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


const STATES_META = [
	{
		type: 'checkbox',
		label: 'Email notifications',
		helpText: 'Receive product and billing updates.',
		fields: [{ fieldName: 'notifications', default: false }],
	},
	{
		type: 'checkbox',
		label: 'Team access',
		helpText: 'Disabled checkbox example.',
		fields: [{ fieldName: 'team_access', default: true, disabled: true }],
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


export const Errors = {
	args: {
		fieldErrors: {
			accept_terms: 'You must accept the terms to continue.',
		},
	},
};
