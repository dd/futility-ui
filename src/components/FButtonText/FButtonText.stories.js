import React from 'react';
import { Title, Primary, Controls, Stories, Markdown, Subtitle, Description } from '@storybook/addon-docs/blocks';

import FIcon from '@/components/FIcon';
import { ICON_LIST_SOLID, ICON_LIST_OUTLINE, ICON_LIST_OTHER } from '@/components/FIcon/constants';
import FButtonText from '.';
import { COMPONENT_TYPES, COLOR_CHOICES } from './constants';


const usage = `
### Usage

Import the component:

\`\`\`js
import { FButtonText } from 'futility-ui'
// or
import FButtonText from 'futility-ui/FButtonText'
\`\`\`

Use it in your template:

\`\`\`html
<FButtonText>Button</FButtonText>
\`\`\`

That's it!
`;


export default {
	title: 'FButtonText',
	component: FButtonText,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			subtitle: 'Text button component',
			description: {
				component: usage,
			},
		},
	},
	argTypes: {
		type: {
			options: COMPONENT_TYPES,
			control: { type: 'select' },
		},

		color: {
			options: COLOR_CHOICES,
			control: { type: 'select' },
		},

		// SLOTS
		default: {
			control: 'text',
			description: 'The text is placed in the default slot.',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},

		iconName: {
			name: 'icon',
			control: {
				type: 'select',
				labels: {
					undefined: '—',
					...ICON_LIST_SOLID,
					...ICON_LIST_OUTLINE,
					...ICON_LIST_OTHER,
				},
			},
			options: [ undefined, ...ICON_LIST_SOLID, ...ICON_LIST_OUTLINE, ...ICON_LIST_OTHER ],
			description: 'Icon for use inside the icon button.',
			table: {
				category: 'slots',
				type: { summary: 'text' },
				defaultValue: { summary: null },
			},
		},

		// EVENTS
		onClick: {
			action: 'click',
			description: 'Click event.',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		type: 'button',
		color: 'primary',
		disabled: false,
		default: 'Button',
		iconName: undefined,
	},
};


export const Default = {
	render: (args, { argTypes }) => ({
		name: 'FButtonTextDefaultStory',
		props: Object.keys(argTypes),
		components: { FButtonText, FIcon },
		setup() { return { args }},
		template: '<FButtonText v-bind="args" :type="type" >{{ args.default }} <FIcon v-if="args.iconName" :name="args.iconName" /></FButtonText>',
	}),
};


export const Types = {
	parameters: {
		docs: {
			description: {
				story: `The \`type\` attribute defines the button type — either a regular button or a link.

\`\`\`html
<FButtonText type="<type>" >Button text</FButtonText>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonTextTypesStory',
		props: Object.keys(argTypes),
		components: { FButtonText },
		setup() { return { args }},
		template: `<p>The button supports multiple types:
	<FButtonText v-bind="args" type="button" >regular button</FButtonText>,
	<FButtonText v-bind="args" type="a" >link</FButtonText>,
	<FButtonText v-bind="args" type="router-link" >&#x3C;router-link&#x3E;</FButtonText>
	или <FButtonText v-bind="args" type="nuxt-link" >&#x3C;nuxt-link&#x3E;</FButtonText>
</p>`,
	}),
	argTypes: {
		type: { control: { type: null }},
		default: { control: { type: null }},
		iconName: { control: { type: null }},
	},
	args: {
		type: '<type>',
		default: '<button_content>',
	},
};


export const Content = {
	name: 'Content flexibility',
	render: (args, { argTypes }) => ({
		name: 'FButtonTextIconStory',
		props: Object.keys(argTypes),
		components: { FButtonText, FIcon },
		setup() {
			return { args };
		},
		template: `<p>
	A standard <FButtonText v-bind="args" >button</FButtonText>,
	a button with an <FButtonText v-bind="args" >icon <FIcon :name="args.iconName" /></FButtonText>,
	and an icon-only version <FButtonText v-bind="args" ><FIcon :name="args.iconName" /></FButtonText>
</p>`,
	}),
	argTypes: {
		default: { control: { type: null }},
	},
	args: {
		default: '<button_content>',
		iconName: 'copy_outline',
	},
};


export const Colors = {
	parameters: {
		docs: {
			description: {
				story: `The \`color\` prop defines the visual style of the button.:

\`\`\`html
<FButtonText color="<color>" >Button text</FButtonText>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonTextColorsStory',
		props: Object.keys(argTypes),
		components: { FButtonText, FIcon },
		setup() {
			return { args, COLOR_CHOICES };
		},
		template: `<p>Available color options:
	<template v-for="color, i in COLOR_CHOICES" :key="color" >
		<template v-if="i > 0" >, </template>
		<FButtonText v-bind="args" :color="color" >
			{{ color }}
			<FIcon v-if="args.iconName" :name="args.iconName" />
		</FButtonText>
	</template>
</p>`,
	}),
	argTypes: {
		color: { control: { type: null }},
		default: { control: { type: null }},
	},
	args: {
		color: '<color>',
		default: '<button_content>',
	},
};


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => ({
		name: 'FButtonTextSchemeStory',
		props: Object.keys(argTypes),
		components: { FButtonText, FIcon },
		setup() {
			return { args, COLOR_CHOICES };
		},
		template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="preview-table" ><tbody>
			<tr v-for="color in COLOR_CHOICES" :key="color" >
				<td>
					<FButtonText v-bind="args" :color="color" >
						{{ color }}
						<FIcon v-if="args.iconName" :name="args.iconName" />
					</FButtonText>
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="preview-table" ><tbody>
			<tr v-for="color in COLOR_CHOICES" :key="color" >
				<td>
					<FButtonText v-bind="args" :color="color" >
						{{ color }}
						<FIcon v-if="args.iconName" :name="args.iconName" />
					</FButtonText>
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`,
	}),

	argTypes: {
		color: { control: { type: null }},
		default: { control: { type: null }},
	},
	args: {
		color: '<color>',
		default: '<button_content>',
	},
};
