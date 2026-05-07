import { ref } from 'vue';
import { useArgs } from 'storybook/preview-api';
import FSwitch from '.';
import { makeRenderer } from '@/sb.stuff.js';


const usage = `
A toggle switch component for switching between two or three states.

### Usage

Import the component:

\`\`\`js
import { FSwitch } from 'futility-ui'
// or
import FSwitch from 'futility-ui/forms/FSwitch'
\`\`\`

Use it in your template:

\`\`\`html
<FSwitch name="fswitch-1" />
\`\`\`

That's it!
`;


export default {
	title: 'Forms/FSwitch',
	component: FSwitch,
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
		modelValue: {
			description: 'Current switch value.',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the switch is disabled.',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
			},
		},
		// error: {
		// 	control: 'boolean',
		// 	description: 'Error flag.',
		// 	table: {
		// 		category: 'props',
		// 		type: { summary: 'boolean' },
		// 	},
		// },

		// EVENTS
		'update:modelValue': {
			action: 'update:modelValue',
			name: 'update:modelValue',
			control: false,
			description: 'Emitted when the value changes.',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		modelValue: false,
		nullable: false,
		disabled: false,
		// error: false,
	},
	render: makeRenderer([ 'modelValue' ]),
};


export const Default = {};


export const Types = {
	parameters: {
		docs: {
			description: {
				story: `The standard switch behaves like a checkbox: it toggles between \`true\` and \`false\`.
However, by enabling the \`nullable\` flag, you can make the switch three-state, adding a \`null\` value.`,
			},
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			name: 'FSwitchTypesStory',
			props: Object.keys(argTypes),
			components: { FSwitch },
			setup() {
				const dvalue = ref(false);
				const tvalue = ref(null);
				return { args, dvalue, tvalue };
			},
			template: `
			<table class="sbfui-preview-table" >
				<thead>
					<tr>
						<th class="sbfui-pt-min_label" >Default</th>
						<th class="sbfui-pt-min_label" >Nullable</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<FSwitch v-bind="args" v-model="dvalue" :nullable="false" />
						</td>
						<td>
							<FSwitch v-bind="args" v-model="tvalue" :nullable="true" />
						</td>
					</tr>
				</tbody>
			</table>`,
		}
	},
	argTypes: {
		modelValue: { control: { type: null }},
		nullable: { control: { type: null }},
	},
	args: {
		nullable: '<nullable>',
		modelValue: '<value>',
	},
};


// export const WithError = {
// 	argTypes: {
// 		error: { control: { type: null }},
// 	},
// 	args: {
// 		error: true,
// 	},
// };


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => ({
		name: 'FSwitchSchemeStory',
		props: Object.keys(argTypes),
		components: { FSwitch },
		setup() { return { args }; },
		template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="false" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="false" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="false" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="false" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="true" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="true" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="null" :nullable="true" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="null" :nullable="true" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="true" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="true" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="sbfui-preview-table" ><tbody>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="false" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="false" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="false" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="false" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="true" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="false" :nullable="true" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="null" :nullable="true" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="null" :nullable="true" disabled />
				</td>
			</tr>
			<tr>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="true" :disabled="false" />
				</td>
				<td>
					<FSwitch v-bind="args" :modelValue="true" :nullable="true" disabled />
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`,
	}),
	argTypes: {
		modelValue: { control: { type: null }},
		nullable: { control: { type: null }},
		disabled: { control: { type: null }},
	},
	args: {
		modelValue: '<value>',
		nullable: '<nullable>',
		disabled: '<disabled>',
	},
};
