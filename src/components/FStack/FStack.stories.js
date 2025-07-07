import FStack from '.';
import FInput from '@/components/forms/FInput';
import FButton from '@/components/FButton';
import FIcon from '@/components/FIcon';


const usage = `
### Usage

Import the component:

\`\`\`js
import { FStack } from 'futility-ui'
// or
import FStack from 'futility-ui/FStack'
\`\`\`

Use it in your template:

\`\`\`html
<FStack>
	<FButton>Generate</FButton>
	<FInput placeholder="API key" />
	<FButton icon="square" color="white" ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" >Revoke</FButton>
</FStack>
\`\`\`

That's it!
`;

export default {
	title: 'FStack',
	component: FStack,
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
		default: {
			control: { type: null },
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
	},
	render: (args, { argTypes, updateArgs }) => ({
		name: 'FIconDiversityStory',
		props: Object.keys(argTypes),
		components: { FStack, FButton, FInput, FIcon },
		setup() { return { args }; },
		template: `
<FStack>
	<FButton>Generate</FButton>
	<FInput placeholder="seed" style="width:50px" />
	<FInput placeholder="API key" />
	<FButton icon="square" color="white" ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" >Revoke</FButton>
</FStack>
<br />
<FStack>
	<FButton disabled >Generate</FButton>
	<FInput placeholder="seed" style="width:50px" disabled />
	<FInput placeholder="API key" disabled />
	<FButton icon="square" color="white" disabled ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" disabled >Revoke</FButton>
</FStack>
<br />
<FStack>
	<FButton disabled >Generate</FButton>
	<FInput placeholder="seed" style="width:50px" disabled />
	<FInput placeholder="API key" />
	<FButton icon="square" color="white" ><FIcon name="clipboard_outline" /></FButton>
	<FButton color="gray-200" disabled >Revoke</FButton>
</FStack>
`,
	}),
};

export const Default = {};
