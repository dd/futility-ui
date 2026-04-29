import { LAYOUT_CHOICES } from '@/forms/FFormRow/constants.js';
import { INPUT_WIDGET_TYPES, SIZE_CHOICES } from './constants.js';


/**
 * Base meta argTypes shared by every built-in widget.
 * Spread into a story's argTypes alongside widget-specific meta fields.
 * The renderer collects all args with table.category === 'props' && table.subcategory === 'meta'
 * into the meta object.
 */
export const META_BASE_ARG_TYPES = {
	type: {
		description: 'Widget type identifier — used by FGenericForm to route to the correct widget.',
		control: false,
		table: { category: 'props', subcategory: 'meta' },
	},
	label: {
		description: 'Field label text.',
		control: 'text',
		table: { category: 'props', subcategory: 'meta' },
	},
	helpText: {
		description: 'Help text shown below the field.',
		control: 'text',
		table: { category: 'props', subcategory: 'meta' },
	},
	fields: {
		description: 'Field definitions: `[{ fieldName, default, disabled?, readonly?, required?, allowNull?, attrs? }]`.',
		control: 'object',
		table: { category: 'props', subcategory: 'meta' },
	},
};


export const WIDGET_BASE_ARG_TYPES = {
	modelValue: {
		description: 'The form data object (v-model).',
		table: { category: 'props' },
	},
	'update:modelValue': {
		action: 'update:modelValue',
		description: 'Emitted when any field value changes.',
		control: false,
		table: { category: 'events', type: { summary: null } },
	},
	...META_BASE_ARG_TYPES,
	layout: {
		description: 'Row layout - forwarded to FFormRow.',
		options: LAYOUT_CHOICES,
		control: 'select',
		table: { category: 'props' },
	},
	size: {
		description: 'Widget size - forwarded to FFormRow.',
		options: SIZE_CHOICES,
		control: 'select',
		table: { category: 'props' },
	},
	fieldErrors: {
		description: `Error messages for this widget's fields. Shape:
\`{ fieldName: 'Error message string' }\` Passed by FGenericForm from its \`errors\` prop.`,
		table: { category: 'props' },
	},
};


export const META_BASIC = [
	{
		type: 'text',
		label: 'First name',
		fields: [
			{
				fieldName: 'first_name',
				default: '',
				attrs: { placeholder: 'e.g. John' },
			},
		],
	},
	{
		type: 'text',
		label: 'Last name',
		helpText: 'Not required',
		fields: [
			{
				fieldName: 'last_name',
				default: '',
				required: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'email',
		label: 'Email',
		helpText: 'Used for account notifications',
		fields: [
			{
				fieldName: 'email',
				default: '',
				required: true,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'checkbox',
		label: 'Email notifications',
		helpText: 'Receive product and billing updates.',
		fields: [{ fieldName: 'notifications', default: false }],
	},
	{
		type: 'switch',
		label: 'Push notifications',
		helpText: 'Receive push notifications.',
		fields: [{ fieldName: 'push_notifications', default: false }],
	},
	{
		type: 'radio',
		label: 'User type',
		choices: [
			{ value: 'admin', label: 'Admin' },
			{ value: 'user', label: 'User' },
		],
		fields: [{ fieldName: 'user_type', default: 'user', required: true }],
	},
];
