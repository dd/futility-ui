import { computed, ref } from 'vue';

import { WIDGET_BASE_ARG_TYPES, FINPUTWIDGET_META } from '../constants.sb.js';
import FInputWidgetComponent from './FInputWidget.vue';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';
import { INPUT_WIDGET_TYPES, DEFAULT_WIDGETS } from '../constants.js';


const _types = INPUT_WIDGET_TYPES.map(t => `\`${t}\``);
const _typeList = _types.slice(0, -1).join(', ') + ', and ' + _types.at(-1);

const DESCRIPTION = `\`FInputWidget\` handles all text-like input types registered in
\`DEFAULT_WIDGETS\`: ${_typeList}.

The meta type \`'string'\` is normalised to \`'text'\` internally - use \`type: 'text'\` in your
field meta. Field-level flags \`disabled\`, \`readonly\`, \`required\`, and per-field \`errors\`
are all passed through field meta and routed automatically to each widget.`;


const DEFAULT_TEMPLATE = `<FGenericForm
	v-model="modelValue"
	:meta="meta"
	:layout="layout"
	:widget-size="widgetSize"
	:errors="errors"
/>`;


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FInputWidget',
	component: FInputWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: WIDGET_BASE_ARG_TYPES,
	render: (args) => {
		return {
			components: { FGenericForm },
			setup() {
				const modelValue = ref(getFormDefaults(FINPUTWIDGET_META, DEFAULT_WIDGETS));
				return {
					modelValue,
					meta: FINPUTWIDGET_META,
					layout: computed(() => args.layout),
					widgetSize: computed(() => args.size),
					errors: computed(() => args.fieldErrors),
				};
			},
			template: DEFAULT_TEMPLATE,
		};
	},
	args: {
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};


const STATES_DESCRIPTION = `Field-level \`disabled\` and \`readonly\` flags come from the
metadata and are forwarded to the widget automatically.`;


export const States = {
	parameters: {
		docs: { description: { story: STATES_DESCRIPTION } },
	},
	render: (args) => {
		return {
			name: 'FInputWidgetStatesStory',
			components: { FGenericForm },
			setup() {
				const meta = [
					{
						label: "text",
						type: "text",
						fields: [{ fieldName: 'f_text', default: '' }],
						helpText: 'Default field',
					},
					{
						label: "search",
						type: "search",
						fields: [{ fieldName: 'f_search', default: '', disabled: true }],
						helpText: 'Disabled field',
					},
					{
						label: "url",
						type: "url",
						fields: [{ fieldName: 'f_url', default: '', readonly: true }],
						helpText: 'Read-only field',
					},
				];
				const modelValue = ref({
					f_text: "Some text",
					f_search: "Search query",
					f_url: "https://github.com",
				});
				return {
					modelValue,
					meta,
					layout: computed(() => args.layout),
					widgetSize: computed(() => args.size),
					errors: computed(() => args.fieldErrors),
				};
			},
			template: DEFAULT_TEMPLATE,
		};
	},
};


const ERRORS_DESCRIPTION = `Pass a \`fieldErrors\` object keyed by \`fieldName\` to surface
validation messages. The input highlights in red, the label turns red, and the message appears
in a tooltip on the error icon.`;


export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	render: (args) => {
		return {
			name: 'FInputWidgetStatesStory',
			components: { FGenericForm },
			setup() {
				const meta = [
					{
						label: "Username",
						type: "text",
						fields: [{ fieldName: 'f_username', default: '' }],
					},
					{
						label: "Email",
						type: "email",
						fields: [{ fieldName: 'f_email', default: '' }],
					},
				];
				const modelValue = ref({
					f_username: "dd",
					f_email: "user@@example.com",
				});
				return {
					modelValue,
					meta,
					layout: computed(() => args.layout),
					widgetSize: computed(() => args.size),
					errors: computed(() => args.fieldErrors),
				};
			},
			template: DEFAULT_TEMPLATE,
		};
	},
	args: {
		fieldErrors: {
			f_username: 'Username must be at least 3 characters.',
			f_email: 'Enter a valid email address.',
		},
	},
};
