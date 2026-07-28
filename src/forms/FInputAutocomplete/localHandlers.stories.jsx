import FInputAutocomplete from '.';
import { createLocalHandlers } from './requestHandlers';


const CITIES = [
	{ value: 1, label: 'Amsterdam' },
	{ value: 2, label: 'Berlin' },
	{ value: 3, label: 'Copenhagen' },
	{ value: 4, label: 'Dublin' },
	{ value: 5, label: 'Edinburgh' },
];


export default {
	title: 'Forms/FInputAutocomplete/createLocalHandlers',
	component: FInputAutocomplete,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `Generates the two handlers required by \`FInputAutocomplete\`
from an existing local options list. The default filter performs a case-insensitive substring
search against each option's \`label\`.`,
			},
		},
	},
};


export const Default = {
	render: () => ({
		components: { FInputAutocomplete },
		setup() {
			return {
				handlers: createLocalHandlers({ options: CITIES }),
			};
		},
		template: `<FInputAutocomplete
	v-bind="handlers"
	placeholder-label="Select a city"
	placeholder-filter="Type to filter…"
/>`,
	}),
};


export const CustomFilter = {
	render: () => ({
		components: { FInputAutocomplete },
		setup() {
			return {
				handlers: createLocalHandlers({
					options: CITIES,
					filterOption: (option, query) => (
						option.label.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
					),
				}),
			};
		},
		template: `<FInputAutocomplete
	v-bind="handlers"
	placeholder-label="Select a city"
	placeholder-filter="Filter by prefix…"
/>`,
	}),
};
