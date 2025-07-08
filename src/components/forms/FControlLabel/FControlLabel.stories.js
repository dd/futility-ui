import { useArgs } from 'storybook/preview-api';

import FControlLabel from '.';
import FCheckbox from '@/components/forms/FCheckbox';
import FSwitch from '@/components/forms/FSwitch';
import FRadioButton from '@/components/forms/FRadioButton';
import { makeRenderer, makeUpdateArg } from '@/utils/storybook';


const usage = `
The \`FControlLabel\` component is designed to wrap form controls such as
[FCheckbox](?path=/docs/forms-fcheckbox--docs), [FSwitch](?path=/docs/forms-fswitch--docs), or
[FRadioButton](?path=/docs/forms-fradiobutton--docs) and provide a label alongside them.

### Usage

Import the component:

\`\`\`js
import { FControlLabel } from 'futility-ui'
// or
import FControlLabel from 'futility-ui/forms/FControlLabel'
\`\`\`

Use the label prop for plain text labels:

\`\`\`html
<FControlLabel label="Simple label." >
	<FCheckbox v-model="value" />
</FControlLabel>
\`\`\`

To include HTML elements inside the label, use the default slot.

> Wrap the content in a \`<span>\` or similar element to ensure proper layout.

\`\`\`html
<FControlLabel>
	<FCheckbox v-model="value" />
	<span>Complex label with <i>html</i>.</span>
</FControlLabel>
\`\`\`

That's it!
`;


export default {
	title: 'Forms/FControlLabel',
	component: FControlLabel,
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
		default: {
			control: 'text',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		label: '',
		error: false,
		default: `Complex label with <a href="https://en.wikipedia.org/wiki/HTML" target="_blank" >
html</a>.
`,
	},
	render: (args, { argTypes }) => {
		return {
			components: { FControlLabel, FCheckbox },
			props: Object.keys(argTypes),
			setup() {
				return { args }; },
			template: `<FControlLabel v-bind="args" >
		<FCheckbox />
		<span v-if="args.default" v-html="args.default" />
	</FControlLabel>`,
		};
	},
};


export const Default = {};


export const ErrorStyling = {
	args: {
		error: true,
	},
};


export const Checkbox = {
	render: (args, { argTypes }) => {
		return {
			components: { FControlLabel, FCheckbox },
			props: Object.keys(argTypes),
			setup() { return { args }; },
			template: `<FControlLabel v-bind="args" >
		<FCheckbox />
		<span v-if="args.default" v-html="args.default" />
	</FControlLabel>`,
		};
	},
};

export const Switch = {
	render: (args, { argTypes }) => {
		return {
			components: { FControlLabel, FSwitch },
			props: Object.keys(argTypes),
			setup() { return { args }; },
			template: `<FControlLabel v-bind="args" >
		<FSwitch />
		<span v-if="args.default" v-html="args.default" />
	</FControlLabel>`,
		};
	},
};

export const RadioButton = {
	render: (args, { argTypes }) => {
		return {
			components: { FControlLabel, FRadioButton },
			props: Object.keys(argTypes),
			setup() { return { args }; },
			template: `<FControlLabel v-bind="args" >
		<FRadioButton />
		<span v-if="args.default" v-html="args.default" />
	</FControlLabel>`,
		};
	},
};

// export const Checkbox = {
// 	render: (args, { argTypes, component }) => {
// 		const [ , updateArgs ] = useArgs();
// 		return {
// 			components: { [component.name]: component },
// 			props: Object.keys(argTypes),
// 			setup() {
// 				const updateValue = makeUpdateArg('modelValue', args, updateArgs);
// 				const promisedArgs = { [updateValue[0]]: updateValue[1] };
// 				return { args, promisedArgs };
// 			},
// 			template: `<div>
// 		<FCheckbox v-bind="args" v-on="promisedArgs" name="test_group" value="checkbox-1" />
// 		<FCheckbox v-bind="args" v-on="promisedArgs" name="test_group" value="checkbox-2" />
// 		<FCheckbox v-bind="args" v-on="promisedArgs" name="test_group" value="checkbox-3" />
// 	</div>`,
// 		};
// 	},
// 	args: {
// 		modelValue: [],
// 	},
// };

// export const Scheme = {
// 	name: 'Scheme (Light/Dark)',
// 	parameters: { layout: 'fullscreen' },
// 	render: (args, { argTypes }) => ({
// 		name: 'FCheckboxSchemeStory',
// 		props: Object.keys(argTypes),
// 		components: { FCheckbox },
// 		setup() { return { args }; },
// 		template: `<div class="sbpst-scheme_preview sbpst-row" >
// 	<div class="sbpst-light" >
// 		<table class="preview-table" ><tbody>
// 			<tr>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="false" :disabled="false" />
// 				</td>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="true" :disabled="false" />
// 				</td>
// 			</tr>
// 			<tr>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="false" disabled />
// 				</td>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="true" disabled />
// 				</td>
// 			</tr>
// 		</tbody></table>
// 	</div>
// 	<div class="sbpst-dark" >
// 		<table class="preview-table" ><tbody>
// 			<tr>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="false" :disabled="false" />
// 				</td>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="true" :disabled="false" />
// 				</td>
// 			</tr>
// 			<tr>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="false" disabled />
// 				</td>
// 				<td>
// 					<FCheckbox v-bind="args" :modelValue="true" disabled />
// 				</td>
// 			</tr>
// 		</tbody></table>
// 	</div>
// </div>`,
// 	}),
// 	argTypes: {
// 		modelValue: { control: { type: null }},
// 		disabled: { control: { type: null }},
// 	},
// 	args: {
// 		modelValue: '<value>',
// 		disabled: '<disabled>',
// 	},
// };
