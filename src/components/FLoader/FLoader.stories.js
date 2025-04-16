import FLoader from '.';


const usage = `
### Usage

Import the component:

\`\`\`js
import { FLoader } from 'futility-ui'
// or
import FLoader from 'futility-ui/FLoader'
\`\`\`

Use it in your template:

\`\`\`html
<FLoader />
\`\`\`

That's it!
`;

export default {
	title: 'FLoader',
	component: FLoader,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: usage,
			},
		}
	},
	argTypes: {
		size: {
			options: [ 'sm', 'md', 'lg' ],
			control: { type: 'select' },
		},
	},
	args: {
		size: 'md',
		hideTrack: false,
	},
};

export const Default = {};


export const Sizes = {
	parameters: {
		docs: {
			description: {
				story: 'You can use one of the standard throbber sizes:',
			},
		},
	},
	render: (args, { argTypes, updateArgs }) => ({
		name: 'FLoaderSizesStory',
		props: Object.keys(argTypes),
		components: { FLoader },
		setup() {
			return { args };
		},
		template: `
<div class="loader_preview-table-wrapper" >
	<table class="preview-table loader_preview-table" >
		<tbody>
			<tr>
				<td class="label" >sm: 25px</td>
				<td class="label" >md: 50px</td>
				<td class="label" >lg: 75px</td>
			</tr>
			<tr>
				<td><FLoader v-bind="args" size="sm" /></td>
				<td><FLoader v-bind="args" size="md" /></td>
				<td><FLoader v-bind="args" size="lg" /></td>
			</tr>
		</tbody>
	</table>
</div>
`,
	}),
	argTypes: {
		size: { control: { type: null }},
	},
	args: {
		size: '<size>',
	},
};


export const CustomSize = {
	parameters: {
		docs: {
			description: {
				story: `
If needed, define a custom size by using the \`fui-loader-<custom_size>\` selector.

\`\`\`css
.fui-loader-custom {
	height: 100px;
}
\`\`\`
`,
			},
		},
	},
	argTypes: {
		size: { control: { type: null }},
	},
	args: {
		size: 'custom',
	},
};

export const Scheme = {
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes, updateArgs }) => ({
		name: 'FLoaderSchemeStory',
		props: Object.keys(argTypes),
		components: { FLoader },
		setup() {
			return { args };
		},
		template: `<div class="sbpst-scheme_preview sbpst-row" >
		<div class="sbpst-light" ><FLoader v-bind="args" /></div>
		<div class="sbpst-dark" ><FLoader v-bind="args" /></div>
</div>`,
	}),
};
