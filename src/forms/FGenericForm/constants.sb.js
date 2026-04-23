import { INPUT_WIDGET_TYPES, LAYOUT_CHOICES, SIZE_CHOICES } from './constants.js';


export const META_BASIC = [
	{
		type: 'text',
		label: 'First name',
		// help_text: null,
		fields: [
			{
				field_name: 'first_name',
				default: '',
				// required: true,
				// disabled: false,
				// readonly: false,
			},
		],
	},
	{
		type: 'text',
		label: 'Last name',
		help_text: null,
		fields: [
			{
				field_name: 'last_name',
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
		help_text: 'Used for account notifications',
		fields: [
			{
				field_name: 'email',
				default: '',
				required: true,
				disabled: false,
				readonly: false,
			},
		],
	},
];


export const META_STATES = [
	{
		type: 'text',
		label: 'Active',
		help_text: null,
		fields: [
			{
				field_name: 'active',
				default: 'Some text',
				required: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'text',
		label: 'Disabled',
		help_text: null,
		fields: [
			{
				field_name: 'disabled_field',
				default: 'Cannot edit',
				required: false,
				disabled: true,
				readonly: false,
			},
		],
	},
	{
		type: 'text',
		label: 'Readonly',
		help_text: 'This field is read-only',
		fields: [
			{
				field_name: 'readonly_field',
				default: 'Read only',
				required: false,
				disabled: false,
				readonly: true,
			},
		],
	},
];


export const META_ERRORS = [
	{
		type: 'text',
		label: 'Username',
		help_text: null,
		fields: [
			{
				field_name: 'username',
				default: '',
				required: true,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'email',
		label: 'Email',
		help_text: null,
		fields: [
			{
				field_name: 'email',
				default: '',
				required: true,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'text',
		label: 'Website',
		help_text: null,
		fields: [
			{
				field_name: 'website',
				default: '',
				required: false,
				disabled: false,
				readonly: false,
			},
		],
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
\`{ field_name: 'Error message string' }\` Passed by FGenericForm from its \`errors\` prop.`,
		table: { category: 'props' },
	},
};


export const FINPUTWIDGET_META = INPUT_WIDGET_TYPES.map(type => ({
	type,
	label: type,
	fields: [{
		field_name: `f_${type.replace(/-/g, '_')}`,
		default: type === 'number' ? null : '',
	}],
}));
