import FBooleanFlag from '.';


const usage = `
A simple boolean indicator that displays a check or cross icon.


### Usage

Import the component:

\`\`\`js
import { FBooleanFlag } from 'futility-ui'
// or
import FBooleanFlag from 'futility-ui/FBooleanFlag'
\`\`\`

Use it in your template:

\`\`\`html
<FBooleanFlag ok />
<FBooleanFlag />
\`\`\`
`;

export default {
	title: 'FBooleanFlag',
	component: FBooleanFlag,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: usage,
			},
		},
	},
	args: {
		ok: true,
	},
};

export const Default = {};

export const Variations = {
	parameters: {
		docs: {
			description: {
				story: 'The two possible states of the boolean flag:',
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FBooleanFlagVariationsStory',
		props: Object.keys(argTypes),
		components: { FBooleanFlag },
		setup() {
			return { args };
		},
		template: `
<div class="sbfui-loader_preview-table-wrapper" >
	<table class="sbfui-preview-table" >
		<tbody>
			<tr>
				<td class="sbfui-pt-label" >ok</td>
				<td class="sbfui-pt-label" >not ok</td>
			</tr>
			<tr>
				<td><FBooleanFlag ok /></td>
				<td><FBooleanFlag /></td>
			</tr>
		</tbody>
	</table>
</div>
`,
	}),
	argTypes: {
		ok: { control: { type: null } },
	},
};

export const Scheme = {
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => ({
		name: 'FBooleanFlagSchemeStory',
		props: Object.keys(argTypes),
		components: { FBooleanFlag },
		setup() {
			return { args };
		},
		template: `<div class="sbpst-scheme_preview sbpst-row" >
		<div class="sbpst-light" ><FBooleanFlag v-bind="args" /></div>
		<div class="sbpst-dark" ><FBooleanFlag v-bind="args" /></div>
</div>`,
	}),
};
