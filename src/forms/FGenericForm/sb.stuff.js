import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { LAYOUT_CHOICES } from '@/forms/FFormRow/constants.js';
import { makeUpdateArg } from '@/sb.stuff.js';
import FGenericForm from '.';
import { INPUT_WIDGET_TYPES, SIZE_CHOICES } from './constants.js';


/**
 * Base meta argTypes shared by every built-in widget.
 * Spread into a story's argTypes alongside widget-specific meta fields.
 * The renderer collects all args with table.category === 'props' && table.subcategory === 'meta'
 * into the meta object.
 */
export const META_BASE_ARG_TYPES = {
	type: {
		description: 'Widget type identifier - used by FGenericForm to route to the correct widget.',
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


/**
 * Render function for single-widget stories inside FGenericForm.
 *
 * Collects all args whose argType has `table.category === 'meta'` and assembles them
 * into the single meta entry object, then wraps it in an array for FGenericForm.
 * Forwards `layout`, `size → widgetSize`, `fieldErrors → errors`, and `widgets`.
 * The `modelValue` arg is kept in sync with Storybook controls via `makeUpdateArg`.
 *
 * Use for Default / Errors stories where a single widget instance is shown
 * and the user can interact with the form via Storybook controls.
 */
export const makeFGFWidgetRenderer = (widgets) => {
	return (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		const metaKeys = Object.keys(argTypes).filter((k) => {
			const categoryOk = argTypes[k]?.table?.category === 'props';
			const subcategoryOk = argTypes[k]?.table?.subcategory === 'meta';
			return categoryOk && subcategoryOk;
		});
		return {
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', updateArgs);
				const formArgs = computed(() => {
					const meta = Object.fromEntries(metaKeys.map(k => [k, args[k]]));
					return {
						'modelValue': args.modelValue,
						[modelValueArg[0]]: modelValueArg[2],
						'meta': [meta],
						'layout': args.layout,
						'widgetSize': args.size,
						'errors': args.fieldErrors,
					};
				});

				return { formArgs, widgets };
			},
			template: '<FGenericForm v-bind="formArgs" :widgets="widgets" />',
		};
	};
};


/**
 * Render function for multi-widget stories inside FGenericForm.
 *
 * Expects `meta` to already be an array of entries and mounts a single
 * `FGenericForm` with all of them. Forwards `layout`, `size → widgetSize`,
 * `fieldErrors → errors`, and `widgets`.
 *
 * Unlike `makeFGFWidgetRenderer`, `modelValue` is held in a local `ref` and is
 * NOT synced back to Storybook controls — intentional for static demo stories
 * (States, Types) where field controls are disabled and the initial values are
 * all that matter.
 *
 * Use when showing multiple field variants side by side with fixed initial values.
 */
export const makeFGFWidgetManyRenderer = (widgets) => {
	return (args) => ({
		components: { FGenericForm },
		setup() {
			const modelValue = ref(args.modelValue);
			const formArgs = computed(() => ({
				'meta': args.meta,
				'layout': args.layout,
				'widgetSize': args.size,
				'errors': args.fieldErrors,
			}));
			return { modelValue, formArgs, widgets };
		},
		template: '<FGenericForm v-model="modelValue" v-bind="formArgs" :widgets="widgets" />',
	});
};
