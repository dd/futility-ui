import FLoader from '.';


export default {
	title: 'FLoader',
	component: FLoader,
	tags: [ 'autodocs' ],
	parameters: { layout: 'centered' },
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
	</table>
</div>
<p>You can specify any custom size if needed — the loader will receive a class in the format <code>.fui-loader-&lt;size&gt;</code>, which you can then style according to your design.</p>
<p style="text-align: center" ><FLoader v-bind="args" size="custom" /></p>
`,
	}),
	argTypes: {
		size: { control: { type: null }},
	},
	args: {
		size: '<size>',
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
