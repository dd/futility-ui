import FInput from './index.vue';
import ShowPasswordButton from './ShowPasswordButton.vue';


const usage = `
### Usage

To enable password visibility toggling, use the \`FInputShowPasswordButton\` component.
You can place it into any slot of the [FInput](?path=/docs/forms-finput--docs) field with
\`type="password"\`.

\`\`\`js
import { FInputShowPasswordButton } from 'futility-ui'
// or
import FInputShowPasswordButton from 'futility-ui/forms/FInput/ShowPasswordButton'
\`\`\`

Example:

\`\`\`html
<FInput type="password" >
	<template #end ><FInputShowPasswordButton /></template>
</FInput>
\`\`\`

That's it!`;


export default {
	title: 'Forms/FInput/ShowPasswordButton',
	component: ShowPasswordButton,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: usage,
			},
		},
	},
	tags: [ 'autodocs' ],
	render: (args, { argTypes, component }) => {
		return {
			props: Object.keys(argTypes),
			components: { FInput, ShowPasswordButton },
			setup() { return { args }; },
			template: `<FInput type="password" modelValue="secret password" >
		<template v-slot:end >
			<ShowPasswordButton v-bind="args" />
		</template>
	</FInput>`,
		};
	},
	argTypes: {
		toggleMode: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
	},
	args: {
		toggleMode: false,
	},
};

export const Default = {};
