import { makeFGFWidgetRenderer, makeFGFWidgetManyRenderer } from '@/.storybook/utils.js';
import { WIDGET_BASE_ARG_TYPES } from '../constants.sb.js';
import { DEFAULT_WIDGETS } from '../constants.js';
import FAutocompleteWidgetComponent from './FAutocompleteWidget.vue';
import { getFormDefaults } from '../utils';


const DEFAULT_DESCRIPTION = `\`FAutocompleteWidget\` is the built-in widget for \`type: 'autocomplete'\`.

It renders \`FInputAutocomplete\` inside \`FFormRow\`, driven by two handler functions that
you provide on the meta entry:

- **\`meta.requestHandler(query, page, { signal })\`** - called on every query change and page load.
  Must return a Promise resolving to \`{ options: [{ value, label }], hasNext: boolean }\`.
- **\`meta.requestCurrentHandler(value)\`** - called to resolve the display label for an
  externally set value. Must return a Promise resolving to \`{ value, label }\`.

For REST APIs, you can use the [createRestHandlers](?path=/docs/forms-finputautocomplete-createresthandlers--docs)
utility from \`@/forms/FInputAutocomplete/requestHandlers\` to generate both handlers from a URL and
a mapping function - no boilerplate required.

Field-level flags \`disabled\`, \`required\`, and per-field \`fieldErrors\` are forwarded
automatically from the meta.`;


const MOCK_OPTIONS = [
	{ value: 1, label: 'Amsterdam' },
	{ value: 2, label: 'Berlin' },
	{ value: 3, label: 'Copenhagen' },
	{ value: 4, label: 'Dublin' },
	{ value: 5, label: 'Edinburgh' },
	{ value: 6, label: 'Frankfurt' },
	{ value: 7, label: 'Geneva' },
	{ value: 8, label: 'Helsinki' },
	{ value: 9, label: 'Istanbul' },
	{ value: 10, label: 'Lisbon' },
	{ value: 11, label: 'London' },
	{ value: 12, label: 'Madrid' },
];

const mockRequestHandler = (query, _page, { signal }) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (signal?.aborted) {
				reject(new DOMException('Aborted', 'AbortError'));
				return;
			}
			let opts = [ ...MOCK_OPTIONS ];
			if (query) opts = opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
			resolve({ options: opts, hasNext: false });
		}, 150);
	});
};

const mockRequestCurrentHandler = (value) => {
	return Promise.resolve(MOCK_OPTIONS.find((o) => o.value === value) ?? { value, label: String(value) });
};


const DEFAULT_META = {
	type: 'autocomplete',
	label: 'City',
	helpText: 'Start typing to search.',
	placeholderLabel: 'Select a city',
	placeholderFilter: 'Type to filter…',
	requestHandler: mockRequestHandler,
	requestCurrentHandler: mockRequestCurrentHandler,
	fields: [{
		fieldName: 'city_id',
		default: null,
	}],
};


export default {
	title: 'Forms/FGenericForm/Widgets/Built-in/FAutocompleteWidget',
	component: FAutocompleteWidgetComponent,
	parameters: {
		layout: 'centered',
		docs: { description: { component: DEFAULT_DESCRIPTION }},
	},
	tags: [ 'autodocs' ],
	argTypes: WIDGET_BASE_ARG_TYPES,
	render: makeFGFWidgetRenderer(),
	args: {
		meta: DEFAULT_META,
		modelValue: getFormDefaults([DEFAULT_META], DEFAULT_WIDGETS),
		layout: 'two_columns',
		size: 'm',
		fieldErrors: {},
	},
};


export const Default = {};


const STATES_DESCRIPTION = `Field-level \`disabled\` and \`required\` flags are driven by meta -
no extra props needed on the widget.`;

const STATES_META = [
	{
		type: 'autocomplete',
		label: 'City',
		helpText: 'Default state.',
		placeholderLabel: 'Select a city',
		placeholderFilter: 'Type to filter…',
		requestHandler: mockRequestHandler,
		requestCurrentHandler: mockRequestCurrentHandler,
		fields: [{ fieldName: 'city_id', default: null }],
	},
	{
		type: 'autocomplete',
		label: 'Country',
		helpText: 'Disabled autocomplete.',
		placeholderLabel: 'Select a country',
		placeholderFilter: 'Type to filter…',
		requestHandler: mockRequestHandler,
		requestCurrentHandler: mockRequestCurrentHandler,
		fields: [{ fieldName: 'country_id', default: null, disabled: true }],
	},
	{
		type: 'autocomplete',
		label: 'Region',
		helpText: 'Required - clear button is hidden.',
		placeholderLabel: 'Select a region',
		placeholderFilter: 'Type to filter…',
		requestHandler: mockRequestHandler,
		requestCurrentHandler: mockRequestCurrentHandler,
		fields: [{ fieldName: 'region_id', default: null, required: true }],
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
		modelValue: getFormDefaults(STATES_META, DEFAULT_WIDGETS),
	},
};


const ERRORS_DESCRIPTION = `Pass a \`fieldErrors\` object keyed by \`fieldName\` to surface
validation messages. The autocomplete highlights in red and the message appears in a tooltip on
the error icon.`;

export const Errors = {
	parameters: {
		docs: { description: { story: ERRORS_DESCRIPTION }},
	},
	args: {
		fieldErrors: {
			city_id: 'Please select a city to continue.',
		},
	},
};
