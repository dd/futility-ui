import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeRenderer, makeUpdateArg } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import FRadioButtonWidgetComponent from './FRadioButtonWidget.vue';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';


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
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FRadioButtonWidgetStory',
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', args, updateArgs);
				const formArgs = computed(() => {
					const result = {
						'modelValue': args.modelValue,
						[modelValueArg[0]]: modelValueArg[2],
						'meta': [args.meta],
						'layout': args.layout,
						'widgetSize': args.size,
						'errors': args.fieldErrors,
					};
					return result;
				});

				return { formArgs };
			},
			template: '<FGenericForm v-bind="formArgs" />',
		};
	},
	args: {
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
		meta: DEFAULT_META,
		modelValue: getFormDefaults([DEFAULT_META]),
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
	render: (args) => ({
		name: 'FRadioButtonWidgetStatesStory',
		components: { FGenericForm },
		setup() {
			const modelValue = ref(args.modelValue);
			const formArgs = computed(() => {
				const result = {
					'meta': args.meta,
					'layout': args.layout,
					'widgetSize': args.size,
					'errors': args.fieldErrors,
				};
				return result;
			});
			return { modelValue, formArgs };
		},
		template: '<FGenericForm v-model="modelValue" v-bind="formArgs" />',
	}),
	argTypes: {
		meta: { control: false },
		modelValue: { control: false },
	},
	args: {
		meta: STATES_META,
		modelValue: getFormDefaults(STATES_META),
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
		modelValue: getFormDefaults([ERRORS_META]),
	},
};
