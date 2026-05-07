import { WIDGET_BASE_ARG_TYPES, makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '../sb.stuff.js';
import FInputWidgetComponent from './FInputWidget.vue';
import { getFormDefaults } from '../utils';
import { INPUT_WIDGET_TYPES, DEFAULT_WIDGETS } from '../constants.js';


const _types = INPUT_WIDGET_TYPES.map(t => `\`${t}\``);
const _typeList = _types.slice(0, -1).join(', ') + ', and ' + _types.at(-1);

const DEFAULT_DESCRIPTION = `\`FInputWidget\` handles all text-like input types registered in
\`DEFAULT_WIDGETS\`: ${_typeList}.

The meta type \`'string'\` is normalised to \`'text'\` internally - use \`type: 'text'\` in your
field meta. Field-level flags \`disabled\`, \`readonly\`, \`required\`, and per-field \`errors\`
are all passed through field meta and routed automatically to each widget.`;


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FInputWidget',
	component: FInputWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DEFAULT_DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		...WIDGET_BASE_ARG_TYPES,
		type: {
			description: 'Input type.',
			options: INPUT_WIDGET_TYPES,
			control: 'select',
			table: { category: 'props', subcategory: 'meta' },
		},
	},
	render: makeFGFWidgetRenderer(),
	args: {
		type: 'text',
		label: 'Text',
		helpText: 'Regular input field',
		fields: [{ fieldName: 'f_text', default: '', attrs: { placeholder: 'Enter text...' } }],
		modelValue: { f_text: '' },
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};


const STATES_DESCRIPTION = `Field-level \`disabled\` and \`readonly\` flags come from the
metadata and are forwarded to the widget automatically.`;

const STATES_META = [
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
		modelValue: {
			f_text: "Some text",
			f_search: "Search query",
			f_url: "https://github.com",
		},
	},
};


const ERRORS_DESCRIPTION = `Pass a \`fieldErrors\` object keyed by \`fieldName\` to surface
validation messages. The input highlights in red, the label turns red, and the message appears
in a tooltip on the error icon.`;


export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	args: {
		fieldErrors: {
			f_text: 'Required field.',
		},
	},
};


const TYPES_META = INPUT_WIDGET_TYPES.map(type => ({
	type,
	label: type,
	fields: [{
		fieldName: `f_${type.replace(/-/g, '_')}`,
		default: type === 'number' ? null : '',
	}],
}));


export const Types = {
	render: makeFGFWidgetManyRenderer(),
	argTypes: {
		meta: { control: false },
		modelValue: { control: false },
	},
	args: {
		meta: TYPES_META,
		modelValue: getFormDefaults(TYPES_META, DEFAULT_WIDGETS),
	},
};
