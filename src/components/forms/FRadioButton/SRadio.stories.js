import FRadioButton from '.';


export default {
	title: 'Forms/FRadioButton',
	component: FRadioButton,
	tags: [ 'autodocs' ],
	parameters: { layout: 'centered' },
	argTypes: {
		modelValue: {
			type: 'string',
			description: 'The value of radio buttons group.',
			table: {
				category: 'props',
				type: { summary: 'text' },
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

		// EVENTS
		'onUpdate:modelValue': {
			action: 'update:modelValue',
			name: 'update:modelValue',
			control: false,
			description: 'Event on update value',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
};

export const Default = {
	render: (args, { argTypes }) => ({
		name: 'FRadioButtonDefaultStory',
		props: Object.keys(argTypes),
		components: { FRadioButton },
		setup() { return { args }; },
		template: `<FRadioButton v-bind="args" >label with random <a href="#" target="_blank" >link</a> inside.</FRadioButton>`,
	}),
	argTypes: {
		value: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'text' },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		value: 'value',
	},
};

export const Group = {
	render: (args, { argTypes }) => ({
		name: 'FRadioButtonGroupStory',
		props: Object.keys(argTypes),
		components: { FRadioButton },
		setup() { return { args }; },
		template: `<div>
	<FRadioButton v-bind="args" name="test_group" value="val1" >Varian #1</FRadioButton>
	<FRadioButton v-bind="args" name="test_group" value="val2" >Varian #2</FRadioButton>
	<FRadioButton v-bind="args" name="test_group" value="val3" >Varian #3</FRadioButton>
</div>`,
	}),
};
