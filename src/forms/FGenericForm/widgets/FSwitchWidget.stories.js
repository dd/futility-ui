import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import { DEFAULT_WIDGETS } from '../constants.js';
import FSwitchWidgetComponent from './FSwitchWidget.vue';
import { getFormDefaults } from '../utils';


const DEFAULT_DESCRIPTION = `\`FSwitchWidget\` is the built-in widget for \`type: 'switch'\`.

It renders \`FSwitch\`, supporting both binary (boolean) and ternary (true/false/null) modes -
set \`allowNull: true\` on the field to enable the ternary variant.

By default the label is rendered in \`FFormRow\`'s \`#label\` slot, aligning the switch with
other form fields in a two-column layout. Set \`meta.labelLayout\` to \`"label_first"\` or
\`"control_first"\` to switch to an inline \`FControlLabel\` instead.

Field-level flags \`disabled\`, \`required\`, and per-field \`fieldErrors\` are forwarded
automatically from the meta.`;


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FSwitchWidget',
	component: FSwitchWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DEFAULT_DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		...WIDGET_BASE_ARG_TYPES,
		labelLayout: {
			description: 'Inline label layout via `FControlLabel`. Omit to use `FFormRow`\'s label slot.',
			options: [undefined, 'label_first', 'control_first'],
			control: 'select',
			table: { category: 'props', subcategory: 'meta' },
		},
	},
	render: makeFGFWidgetRenderer(),
	args: {
		type: 'switch',
		label: 'Enable feature',
		helpText: 'Toggle this feature on or off.',
		fields: [{ fieldName: 'feature_enabled', default: false }],
		modelValue: { feature_enabled: false },
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};


const STATES_DESCRIPTION = `The widget supports three visual states: default (binary boolean),
disabled, and ternary (three-way true/false/null toggle via \`allowNull: true\` on the field).`;

const STATES_META = [
	{
		type: 'switch',
		label: 'Notifications',
		helpText: 'Receive product and billing updates.',
		fields: [{ fieldName: 'notifications', default: false }],
	},
	{
		type: 'switch',
		label: 'Dark mode',
		helpText: 'Disabled switch example.',
		fields: [{ fieldName: 'dark_mode', default: true, disabled: true }],
	},
	{
		type: 'switch',
		label: 'Auto-save',
		helpText: 'Ternary switch - allows null state.',
		fields: [{ fieldName: 'auto_save', default: null, allowNull: true }],
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
			feature_enabled: 'This field is required.',
		},
	},
};


const LAYOUTS_DESCRIPTION = `By default (\`labelLayout\` not set) the label is placed in
\`FFormRow\`'s \`#label\` slot - the switch sits in the right column alongside text inputs.

Set \`meta.labelLayout\` to \`"label_first"\` or \`"control_first"\` to render the label
inline via \`FControlLabel\`, with the switch and label side by side.

> **Note:** when \`labelLayout: "label_first"\` is used inside a two-column \`FFormRow\`,
> the inline label width is governed by the same \`--spacing-formrow-label\` CSS custom property
> that [FFormRow](?path=/docs/forms-fformrow--docs) uses for its own label column - so the two
> stay visually aligned.`;

const LAYOUTS_META = [
	{
		type: 'switch',
		label: 'Row label',
		helpText: 'Default - label in FFormRow slot.',
		fields: [{ fieldName: 'row_label', default: false }],
	},
	{
		type: 'switch',
		label: 'Label first',
		helpText: 'labelLayout: "label_first" - label inline via FControlLabel.',
		labelLayout: 'label_first',
		fields: [{ fieldName: 'label_first', default: false }],
	},
	{
		type: 'switch',
		label: 'Control first',
		helpText: 'labelLayout: "control_first" - label inline via FControlLabel.',
		labelLayout: 'control_first',
		fields: [{ fieldName: 'control_first', default: false }],
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
