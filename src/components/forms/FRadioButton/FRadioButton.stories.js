import { useArgs } from 'storybook/preview-api';

import FRadioButton from '.';
import { makeRenderer, makeUpdateArg } from '@/utils/storybook';


const usage = `
### Usage

Import the component:

\`\`\`js
import { FRadioButton } from 'futility-ui'
// or
import FRadioButton from 'futility-ui/forms/FRadioButton'
\`\`\`

Use it in your template:

\`\`\`html
<FRadioButton />
\`\`\`

That's it!
`;


export default {
	title: 'Forms/FRadioButton',
	component: FRadioButton,
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
			description: 'The value of radio buttons group.',
			type: 'string',
			table: {
				category: 'props',
				type: { summary: 'text | number' },
			},
		},
		disabled: {
			description: 'Disabled flag.',
			control: 'boolean',
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
			description: 'Event on update value',
			control: false,
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		disabled: false,
		// error: false,
	},
	render: makeRenderer([ 'modelValue' ]),
};

export const Default = {};


export const RadioButtonGroup = {
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
		<FRadioButton v-bind="args" v-on="promisedArgs" name="test_group" value="variant-1" />
		<FRadioButton v-bind="args" v-on="promisedArgs" name="test_group" value="variant-2" />
		<FRadioButton v-bind="args" v-on="promisedArgs" name="test_group" value="variant-3" />
	</div>`,
		};
	},
	args: {
		modelValue: 'variant-1',
	},
};


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes, component }) => {
		return {
			name: 'FRadioButtonSchemeStory',
			props: Object.keys(argTypes),
			components: { FRadioButton },
			setup() { return { args }; },
			template: `<div class="sbpst-scheme_preview sbpst-row" >
		<div class="sbpst-light" >
			<table class="preview-table" ><tbody>
				<tr>
					<td>
						<FRadioButton v-bind="args" value=1 :disabled="false" />
					</td>
					<td>
						<FRadioButton v-bind="args" value=2 :disabled="false" />
					</td>
				</tr>
				<tr>
					<td>
						<FRadioButton v-bind="args" value=1 disabled />
					</td>
					<td>
						<FRadioButton v-bind="args" value=2 disabled />
					</td>
				</tr>
			</tbody></table>
		</div>
		<div class="sbpst-dark" >
			<table class="preview-table" ><tbody>
				<tr>
					<td>
						<FRadioButton v-bind="args" value=1 :disabled="false" />
					</td>
					<td>
						<FRadioButton v-bind="args" value=2 :disabled="false" />
					</td>
				</tr>
				<tr>
					<td>
						<FRadioButton v-bind="args" value=1 disabled />
					</td>
					<td>
						<FRadioButton v-bind="args" value=2 disabled />
					</td>
				</tr>
			</tbody></table>
		</div>
	</div>`,
		};
	},
	argTypes: {
		modelValue: { control: { type: null }},
		disabled: { control: { type: null }},
	},
	args: {
		modelValue: 1,
		disabled: '<disabled>',
	},
};
