import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import { DEFAULT_WIDGETS } from '../constants.js';
import FCheckboxWidgetComponent from './FCheckboxWidget.vue';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';


const DEFAULT_DESCRIPTION = `\`FCheckboxWidget\` is the built-in widget for \`type: 'checkbox'\`.

By default the label is rendered in \`FFormRow\`'s \`#label\` slot, aligning the checkbox
with other form fields in a two-column layout. Set \`meta.labelLayout\` to \`"control_first"\`
or \`"label_first"\` to switch to an inline \`FControlLabel\` instead.

Field-level flags \`disabled\`, \`required\`, and per-field \`fieldErrors\` are forwarded
automatically from the meta.`;


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


const STATES_DESCRIPTION = `Field-level \`disabled\` flag comes from the field meta and is
forwarded to the checkbox automatically.`;

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
validation messages. The label highlights in red and the message appears in a tooltip on the
error icon next to the input.`;

export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	args: {
		fieldErrors: {
			accept_terms: 'You must accept the terms to continue.',
		},
	},
};


const LAYOUTS_DESCRIPTION = `By default (\`labelLayout\` not set) the label is placed in
\`FFormRow\`'s \`#label\` slot - the checkbox sits in the right column alongside text inputs.

Set \`meta.labelLayout\` to \`"control_first"\` or \`"label_first"\` to render the label
inline via \`FControlLabel\`, with the checkbox and label side by side.

> **Note:** when \`labelLayout: "label_first"\` is used inside a two-column \`FFormRow\`,
> the inline label width is governed by the same \`--spacing-formrow-label\` CSS custom property
> that [FFormRow](?path=/docs/forms-fformrow--docs) uses for its own label column - so the two
> stay visually aligned.`;

const LAYOUTS_META = [
	{
		type: 'checkbox',
		label: 'Row label',
		helpText: 'Default - label in FFormRow slot.',
		fields: [{ fieldName: 'row_label', default: false }],
	},
	{
		type: 'checkbox',
		label: 'Control first',
		helpText: 'labelLayout: "control_first" - label inline via FControlLabel.',
		labelLayout: 'control_first',
		fields: [{ fieldName: 'control_first', default: false }],
	},
	{
		type: 'checkbox',
		label: 'Label first',
		helpText: 'labelLayout: "label_first" - label inline via FControlLabel.',
		labelLayout: 'label_first',
		fields: [{ fieldName: 'label_first', default: false }],
	},
];


export const Layouts = {
	parameters: {
		docs: { description: { story: LAYOUTS_DESCRIPTION }},
	},
	render: makeFGFWidgetManyRenderer(),
	argTypes: {
		meta: { control: false },
		modelValue: { control: false },
	},
	args: {
		meta: LAYOUTS_META,
		modelValue: getFormDefaults(LAYOUTS_META, DEFAULT_WIDGETS),
	},
};
