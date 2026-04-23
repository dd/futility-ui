import { computed, ref } from 'vue';

import { WIDGET_BASE_ARG_TYPES, FINPUTWIDGET_META } from '../constants.sb.js';
import FInputWidgetComponent from './FInputWidget.vue';
import FGenericForm from '..';
import { getFormDefaults } from '../utils';
import { INPUT_WIDGET_TYPES } from '../constants.js';


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FInputWidget',
	component: FInputWidgetComponent,
	parameters: {
		layout: 'centered',
	},
	tags: [ 'autodocs' ],
	argTypes: WIDGET_BASE_ARG_TYPES,
	render: (args) => {
		return {
			name: 'FInputWidgetStory',
			components: { FGenericForm },
			setup() {
				const modelValue = ref(getFormDefaults(FINPUTWIDGET_META));
				return {
					modelValue,
					FINPUTWIDGET_META,
					layout: computed(() => args.layout),
					widgetSize: computed(() => args.size),
					errors: computed(() => args.fieldErrors),
				};
			},
			template: `<FGenericForm
				v-model="modelValue"
				:meta="FINPUTWIDGET_META"
				:layout="layout"
				:widget-size="widgetSize"
				:errors="errors"
			/>`,
		};
	},
	args: {
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


const _types = INPUT_WIDGET_TYPES.map(t => `\`${t}\``);
const _typeList = _types.slice(0, -1).join(', ') + ', and ' + _types.at(-1);

const FINPUTWIDGET_DESCRIPTION = `\`FInputWidget\` handles all text-like input types registered in
\`DEFAULT_WIDGETS\`: ${_typeList}.

The meta type \`'string'\` is normalised to \`'text'\` internally — use \`type: 'text'\` in your
field meta. Field-level flags \`disabled\`, \`readonly\`, \`required\`, and per-field \`errors\`
are all passed through field meta and routed automatically to each widget.`;


export const FInputWidget = {
	name: 'FInputWidget',
	parameters: {
		docs: { description: { story: FINPUTWIDGET_DESCRIPTION }},
	},
};


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
				const meta = [ ...FINPUTWIDGET_META ];
				meta[1].fields[0].disabled = true;
				meta[2].fields[0].readonly = true;
				const modelValue = ref({
					...getFormDefaults(meta),
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
			template: `<FGenericForm
				v-model="modelValue"
				:meta="meta"
				:layout="layout"
				:widget-size="widgetSize"
				:errors="errors"
			/>`,
		};
	},
};


const ERRORS_DESCRIPTION = `Pass a \`fieldErrors\` object keyed by \`field_name\` to surface
validation messages. The input highlights in red, the label turns red, and the message appears
in a tooltip on the error icon.`;

export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	args: {
		fieldErrors: {
			f_text: 'Username must be at least 3 characters.',
			f_email: 'Enter a valid email address.',
		},
	},
};
