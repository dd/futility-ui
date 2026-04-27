import { computed, ref } from 'vue';

import { WIDGET_BASE_ARG_TYPES, FCHECKBOXWIDGET_META } from '../constants.sb.js';
import FCheckboxWidgetComponent from './FCheckboxWidget.vue';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';


const DESCRIPTION = `\`FCheckboxWidget\` is the built-in widget for \`type: 'checkbox'\`.
It renders \`FCheckbox\` with \`FControlLabel\`, and forwards field-level \`disabled\`,
\`required\`, and validation state from generic form metadata.`;


const DEFAULT_TEMPLATE = `<FGenericForm
	v-model="modelValue"
	:meta="meta"
	:layout="layout"
	:widget-size="widgetSize"
	:errors="errors"
/>`;


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FCheckboxWidget',
	component: FCheckboxWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DESCRIPTION } },
	},
	tags: [ 'autodocs' ],
	argTypes: WIDGET_BASE_ARG_TYPES,
	render: (args) => ({
		components: { FGenericForm },
		setup() {
			const modelValue = ref(getFormDefaults(FCHECKBOXWIDGET_META));
			return {
				modelValue,
				meta: FCHECKBOXWIDGET_META,
				layout: computed(() => args.layout),
				widgetSize: computed(() => args.size),
				errors: computed(() => args.fieldErrors),
			};
		},
		template: DEFAULT_TEMPLATE,
	}),
	args: {
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};

export const States = {
	render: (args) => ({
		name: 'FCheckboxWidgetStatesStory',
		components: { FGenericForm },
		setup() {
			const meta = [
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
			const modelValue = ref(getFormDefaults(meta));
			return {
				modelValue,
				meta,
				layout: computed(() => args.layout),
				widgetSize: computed(() => args.size),
				errors: computed(() => args.fieldErrors),
			};
		},
		template: DEFAULT_TEMPLATE,
	}),
};

export const Errors = {
	render: (args) => ({
		name: 'FCheckboxWidgetErrorsStory',
		components: { FGenericForm },
		setup() {
			const meta = [
				{
					type: 'checkbox',
					label: 'Accept terms',
					fields: [{ fieldName: 'accept_terms', default: false, required: true }],
				},
			];
			const modelValue = ref(getFormDefaults(meta));
			return {
				modelValue,
				meta,
				layout: computed(() => args.layout),
				widgetSize: computed(() => args.size),
				errors: computed(() => args.fieldErrors),
			};
		},
		template: DEFAULT_TEMPLATE,
	}),
	args: {
		fieldErrors: {
			accept_terms: 'You must accept the terms to continue.',
		},
	},
};
