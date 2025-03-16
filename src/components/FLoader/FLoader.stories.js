import FLoader from '.';


export default {
	title: 'FLoader',
	component: FLoader,
	tags: [ 'autodocs' ],
	parameters: { layout: 'centered' },
	argTypes: {
		size: {
			options: [ 'sm', null, 'lg' ],
			control: {
				type: 'select',
				labels: { null: 'Default' },
			},
		},
	},
	args: {
		size: null,
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
<div class="loader_preview" >
	<FLoader v-bind="args" size="sm" />
	<FLoader v-bind="args" />
	<FLoader v-bind="args" size="lg" />
</div>
`,
	}),
	argTypes: {
		size: { control: { type: null }},
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
