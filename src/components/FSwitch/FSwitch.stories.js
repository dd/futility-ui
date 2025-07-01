import { ref } from 'vue';
import { useArgs } from 'storybook/preview-api';
import FSwitch from '.';
import { makeRenderer, makeUpdateArg } from '@/utils/storybook';


const usage = `
### Usage

Import the component:

\`\`\`js
import { FSwitch } from 'futility-ui'
// or
import FSwitch from 'futility-ui/FSwitch'
\`\`\`

Use it in your template:

\`\`\`html
<FSwitch />
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
			type: 'boolean',
			description: 'Switch flag.',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
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
		// error: {
		// 	control: 'boolean',
		// 	description: 'Error flag.',
		// 	table: {
		// 		category: 'props',
		// 		type: { summary: 'boolean' },
		// 	},
		// },

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
	args: {
		modelValue: false,
		nullable: false,
		disabled: false,
		error: false,
	},
	render: makeRenderer([ 'modelValue' ]),
};

export const Default = {};

export const Types = {
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
			<table class="preview-table" >
				<thead>
					<tr>
						<th class="min-label" >Default</th>
						<th class="min-label" >Nullable</th>
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
		<table class="preview-table" ><tbody>
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
		<table class="preview-table" ><tbody>
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
