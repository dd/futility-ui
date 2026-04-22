export const META_BASIC = [
	{
		type: 'string',
		label: 'First name',
		// help_text: null,
		fields: [
			{
				field_name: 'first_name',
				default: '',
				// required: true,
				// allow_null: false,
				// disabled: false,
				// readonly: false,
			},
		],
	},
	{
		type: 'string',
		label: 'Last name',
		help_text: null,
		fields: [
			{
				field_name: 'last_name',
				default: '',
				required: false,
				allow_null: false,
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
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
];


// All types currently registered in DEFAULT_WIDGETS (mirrors INPUT_WIDGET_TYPES in constants.js).
export const META_BUILTIN_WIDGETS = [
	{
		type: 'string',
		label: 'string',
		help_text: '"string" is an alias for "text"',
		fields: [
			{
				field_name: 'f_string',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'text',
		label: 'text',
		help_text: null,
		fields: [
			{
				field_name: 'f_text',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'search',
		label: 'search',
		help_text: null,
		fields: [
			{
				field_name: 'f_search',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'url',
		label: 'url',
		help_text: null,
		fields: [
			{
				field_name: 'f_url',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'email',
		label: 'email',
		help_text: null,
		fields: [
			{
				field_name: 'f_email',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'tel',
		label: 'tel',
		help_text: null,
		fields: [
			{
				field_name: 'f_tel',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'password',
		label: 'password',
		help_text: null,
		fields: [
			{
				field_name: 'f_password',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'number',
		label: 'number',
		help_text: null,
		fields: [
			{
				field_name: 'f_number',
				default: null,
				required: false,
				allow_null: true,
				disabled: false,
				readonly: false,
			},
		],
	},
];


export const META_STATES = [
	{
		type: 'string',
		label: 'Active',
		help_text: null,
		fields: [
			{
				field_name: 'active',
				default: 'Some text',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'string',
		label: 'Disabled',
		help_text: null,
		fields: [
			{
				field_name: 'disabled_field',
				default: 'Cannot edit',
				required: false,
				allow_null: false,
				disabled: true,
				readonly: false,
			},
		],
	},
	{
		type: 'string',
		label: 'Readonly',
		help_text: 'This field is read-only',
		fields: [
			{
				field_name: 'readonly_field',
				default: 'Read only',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: true,
			},
		],
	},
];


export const META_ERRORS = [
	{
		type: 'string',
		label: 'Username',
		help_text: null,
		fields: [
			{
				field_name: 'username',
				default: '',
				required: true,
				allow_null: false,
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
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
	{
		type: 'string',
		label: 'Website',
		help_text: null,
		fields: [
			{
				field_name: 'website',
				default: '',
				required: false,
				allow_null: false,
				disabled: false,
				readonly: false,
			},
		],
	},
];
