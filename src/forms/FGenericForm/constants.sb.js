import { LAYOUT_CHOICES } from '@/forms/FFormRow/constants.js';
import { INPUT_WIDGET_TYPES, SIZE_CHOICES } from './constants.js';


export const META_BASIC = [
	{
		type: 'text',
		label: 'First name',
		placeholder: 'e.g. John',
		fields: [
			{
				fieldName: 'first_name',
				default: '',
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
	meta: {
		description: 'Widget meta entry (or array of entries for multi-row demos).',
		table: { category: 'props' },
	},
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
