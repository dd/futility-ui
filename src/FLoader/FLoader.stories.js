import FLoader from '.';


const usage = `
A loading spinner component used to indicate ongoing work such as data fetching or form submission.


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
				story: 'Choose one of the built-in loader sizes:',
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
<div class="sbfui-loader_preview-table-wrapper" >
	<table class="sbfui-preview-table sbfui-loader_preview-table" >
		<tbody>
			<tr>
				<td class="sbfui-pt-label" >sm: 25px</td>
				<td class="sbfui-pt-label" >md: 50px</td>
				<td class="sbfui-pt-label" >lg: 75px</td>
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

export const WithoutTrack = {
	parameters: {
		docs: {
			description: {
				story: `If needed, you can hide the loader track by setting the \`hideTrack\` prop.`,
			},
		},
	},
	argTypes: {
		hideTrack: { control: { type: null }},
	},
	args: {
		hideTrack: true,
	},
};


export const CustomSize = {
	parameters: {
		docs: {
			description: {
				story: `
If needed, you can define a custom size with the \`fui-loader-<custom_size>\` selector.

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
