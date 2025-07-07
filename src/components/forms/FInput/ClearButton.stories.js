import FInput from './index.vue';
import ClearButton from './ClearButton.vue';


const usage = `
### Usage

The \`FInputClearButton\` component provides a convenient way to add a clear (reset) button to any
\`FInput\` field.

\`\`\`js
import { FInputClearButton } from 'futility-ui'
// or
import FInputClearButton from 'futility-ui/forms/FInput/ClearButton'
\`\`\`

Example:

\`\`\`html
<FInput type="password" >
	<template #end ><FInputClearButton /></template>
</FInput>
\`\`\`

That's it!`;


export default {
	title: 'Forms/FInput/ClearButton',
	component: ClearButton,
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
			components: { FInput, ClearButton },
			setup() { return { args }; },
			template: `<FInput type="text" modelValue="Click cross →" >
		<template v-slot:end >
			<ClearButton v-bind="args" />
		</template>
	</FInput>`,
		};
	},
};

export const Default = {};
