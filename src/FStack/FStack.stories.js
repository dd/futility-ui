import { fn } from 'storybook/test';
import FInput from '@/forms/FInput';
import FInputAutocomplete from '@/forms/FInputAutocomplete';
import FButton from '@/FButton';
import FIcon from '@/FIcon';

import Readme from './README.md?raw';
import FStack from '.';



const DEFAULT_TEMP = `<FStack>
	<FButton>Generate</FButton>
	<FInput placeholder="seed" style="width:70px" />
	<FInput placeholder="API key" />
	<FButton icon="square" color="white" ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" >Revoke</FButton>
</FStack>
<br />
<FStack>
	<FButton disabled >Generate</FButton>
	<FInput placeholder="seed" style="width:70px" disabled />
	<FInput placeholder="API key" disabled />
	<FButton icon="square" color="white" disabled ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" disabled >Revoke</FButton>
</FStack>
<br />
<FStack>
	<FButton disabled >Generate</FButton>
	<FInput placeholder="seed" style="width:70px" disabled />
	<FInput placeholder="API key" />
	<FButton icon="square" color="white" ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" disabled >Revoke</FButton>
</FStack>`;


export default {
	title: 'FStack',
	component: FStack,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		}
	},
	argTypes: {
		default: {
			control: { type: null },
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
	},
	render: (args) => ({
		name: 'FStackStory',
		components: { FStack, FButton, FInput, FIcon },
		setup() { return { args }; },
		template: DEFAULT_TEMP,
	}),
};

export const Default = {};


const requestHandler = fn((query, page) => {
	return new Promise((resolve) => {
		const OPTIONS = [
			{ value: 'us-east-1', label: 'US East (N. Virginia)' },
			{ value: 'us-west-2', label: 'US West (Oregon)' },
			{ value: 'eu-west-1', label: 'Europe (Ireland)' },
			{ value: 'eu-central-1', label: 'Europe (Frankfurt)' },
			{ value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
			{ value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
			{ value: 'sa-east-1', label: 'South America (São Paulo)' },
		];
		let opts = query ? OPTIONS.filter(o => o.label.toLowerCase().includes(query.toLowerCase())) : OPTIONS;
		const hasNext = opts.length > 5 * page;
		resolve({ options: opts.slice(5 * (page - 1), 5 * page), hasNext });
	});
});


export const WithAutocomplete = {
	name: 'With FInputAutocomplete',
	parameters: {
		docs: {
			description: {
				story: 'FInputAutocomplete combined with buttons in a single stack.',
			},
		},
	},
	render: () => ({
		name: 'FStackWithAutocompleteStory',
		components: { FStack, FButton, FIcon, FInputAutocomplete },
		setup() {
			return { requestHandler };
		},
		template: `<div style="display:flex; flex-direction:column; gap:12px; width:420px" >
	<FStack>
		<FInputAutocomplete :request-handler="requestHandler" placeholder-label="Select region" />
		<FButton color="primary" >Deploy</FButton>
	</FStack>
	<FStack>
		<FButton color="gray-200" ><FIcon name="search_outline" /></FButton>
		<FInputAutocomplete :request-handler="requestHandler" placeholder-label="Select region" />
		<FButton icon="square" color="white" ><FIcon name="clipboard_outline" /></FButton>
	</FStack>
</div>`,
	}),
};
