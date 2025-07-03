import { ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import FCheckbox from '.';
import { makeRenderer, makeUpdateArg } from '@/utils/storybook';


const usage = `
### Usage

Import the component:

\`\`\`js
import { FCheckbox } from 'futility-ui'
// or
import FCheckbox from 'futility-ui/forms/FCheckbox'
\`\`\`

Use it in your template:

\`\`\`html
<FCheckbox />
\`\`\`

That's it!
`;


export default {
	title: 'Forms/FCheckbox',
	component: FCheckbox,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: usage,
			},
		}
	},
	tags: [ 'autodocs' ],
	argTypes: {
		modelValue: {
			description: 'Checkbox flag.',
			table: {
				category: 'props',
				type: { summary: 'boolean | array' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled flag.',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		error: {
			table: { disable: true },
			control: false,
		},

		// EVENTS
		'update:modelValue': {
			action: 'update:modelValue',
			control: false,
			description: 'Event on update value',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		modelValue: false,
		disabled: false,
		// error: false,
	},
	render: makeRenderer([ 'modelValue' ]),
};

export const Default = {};

export const CheckboxGroup = {
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { [component.name]: component },
			props: Object.keys(argTypes),
			setup() {
				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
				const promisedArgs = { [updateValue[0]]: updateValue[1] };
				return { args, promisedArgs };
			},
			template: `<div>
		<FCheckbox v-bind="args" v-on="promisedArgs" name="test_group" value="checkbox-1" />
		<FCheckbox v-bind="args" v-on="promisedArgs" name="test_group" value="checkbox-2" />
		<FCheckbox v-bind="args" v-on="promisedArgs" name="test_group" value="checkbox-3" />
	</div>`,
		};
	},
	args: {
		modelValue: [],
		name: "test_group",
	},
};

export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => ({
		name: 'FCheckboxSchemeStory',
		props: Object.keys(argTypes),
		components: { FCheckbox },
		setup() { return { args }; },
		template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="preview-table" ><tbody>
			<tr>
				<td>
					<FCheckbox v-bind="args" :modelValue="false" :disabled="false" />
				</td>
				<td>
					<FCheckbox v-bind="args" :modelValue="true" :disabled="false" />
				</td>
			</tr>
			<tr>
				<td>
					<FCheckbox v-bind="args" :modelValue="false" disabled />
				</td>
				<td>
					<FCheckbox v-bind="args" :modelValue="true" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="preview-table" ><tbody>
			<tr>
				<td>
					<FCheckbox v-bind="args" :modelValue="false" :disabled="false" />
				</td>
				<td>
					<FCheckbox v-bind="args" :modelValue="true" :disabled="false" />
				</td>
			</tr>
			<tr>
				<td>
					<FCheckbox v-bind="args" :modelValue="false" disabled />
				</td>
				<td>
					<FCheckbox v-bind="args" :modelValue="true" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`,
	}),
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
	},
	args: {
		modelValue: '<value>',
		disabled: '<disabled>',
	},
};
