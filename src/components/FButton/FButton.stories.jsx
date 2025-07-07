import React from 'react';
import { Title, Primary, Controls, Stories, Markdown } from '@storybook/addon-docs/blocks';

import FIcon from '@/components/FIcon';
import { ICON_LIST_SOLID, ICON_LIST_OUTLINE, ICON_LIST_OTHER } from '@/components/FIcon/constants';
import FButton from '.';
import { COMPONENT_TYPES, SIZE_CHOICES, COLOR_CHOICES, DESIGN_CHOICES, ICON_STYLE_CHOICES } from './constants';


const usage = `
### Usage

Import the component:

\`\`\`js
import { FButton } from 'futility-ui'
// or
import FButton from 'futility-ui/FButton'
\`\`\`

Use it in your template:

\`\`\`html
<FButton>Button</FButton>
\`\`\`

That's it!
`;


const ending = `
### Accessibility

- FButton includes \`aria-busy\` when \`busy\` is set
- Adds \`aria-disabled\` for non-button types
- When using \`icon\` mode, ensure your SVG has appropriate \`aria-label\` or \`title\`


### Roadmap

Planned enhancements:

- Support for \`full-width\` layout, not sure this is necessary
- Accessibility audits, maybe someday...
- Customising spinner (need it?)


### Color behavior in dark mode

In dark mode, I believe gray and white should invert:

* \`gray\` should become lighter
* \`white\` should become darker

This helps preserve visual accents and maintain a clear hierarchy.
I plan to revisit this behavior once Flowbite updates their theme — they mentioned a Figma refresh around **Q2 2025**, which should include revised button styles.
`;

export default {
	title: 'FButton',
	component: FButton,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Markdown children={usage} />
					<Primary />
					<Controls />
					<Stories includePrimary={false} title={null} />
					<Markdown children={ending} />
				</>
			),
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

		size: {
			options: SIZE_CHOICES,
			control: { type: 'select' },
		},

		design: {
			options: DESIGN_CHOICES,
			control: { type: 'select' },
		},

		icon: {
			options: [ undefined, ...ICON_STYLE_CHOICES ],
			control: {
				type: 'select',
				labels: {
					undefined: '—',
					...ICON_STYLE_CHOICES,
				},
			},
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
			control: { type: 'select' },
			options: [ ...ICON_LIST_SOLID, ...ICON_LIST_OUTLINE, ...ICON_LIST_OTHER ],
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
		size: 'm',
		design: 'normal',
		disabled: false,
		busy: false,
		icon: undefined,
		noBusyLoader: false,
	},
};


export const Default = {
	render: (args, { argTypes }) => ({
		name: 'FButtonDefaultStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() { return { args }},
		template: `<FButton v-bind="args" :type="type" >
	<FIcon v-if="args.icon" :name="args.iconName" />
	<template v-else >{{ args.default }}</template>
</FButton>`,
	}),
	args: {
		default: 'Button',
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Types = {
	parameters: {
		docs: {
			description: {
				story: `The \`type\` attribute defines the button type — either a regular button or a link.

\`\`\`html
<FButton type="<type>" >Button text</FButton>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonTypesStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			const LABELS = [
				'Button text',
				'Submit',
				'Anchor',
				'Router Link',
				'Nuxt Link',
			];
			return { args, COMPONENT_TYPES, LABELS };
		},
		template: `<table class="preview-table" ><tbody>
	<tr v-for="type, i in COMPONENT_TYPES" :key="type" >
		<td class="label" >{{ type }}</td>
		<td>
			<FButton v-bind="args" :type="type" >{{ LABELS[i] }}</FButton>
		</td>
	</tr>
</tbody></table>`,
	}),
	argTypes: {
		type: { control: { type: null }},
		default: { control: { type: null }},
		icon: { control: { type: null }},
		iconName: { control: { type: null }},
	},
	args: {
		type: '<type>',
		default: 'Button content',
	},
};


export const Design = {
	parameters: {
		docs: {
			description: {
				story: `There are several design variants available for the button

\`\`\`html
<FButton design="<design>" >Button text</FButton>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonDesignStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			const LABELS = [
				'Normal',
				'Outline',
				'Transparent',
				'Text',
			];
			return { args, LABELS, DESIGN_CHOICES };
		},
		template: `<table class="preview-table" ><tbody>
	<tr v-for="design, i in DESIGN_CHOICES" :key="design" >
		<td class="label" >{{ design }}</td>
		<td>
			<FButton v-bind="args" :design="design" >{{ LABELS[i] }}</FButton>
		</td>
	</tr>
</tbody></table>`,
	}),
	argTypes: {
		design: { control: { type: null }},
		default: { control: { type: null }},
		icon: { control: { type: null }},
		iconName: { control: { type: null }},
	},
	args: {
		design: '<design>',
		default: 'Button content',
	},
};


export const Sizes = {
	parameters: {
		docs: {
			description: {
				story: `Predefined sizes for different contexts:

\`\`\`html
<FButton size="<size>" >Button text</FButton>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonSizesStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			const LABELS = [
				'20px',
				'28px',
				'34px',
				'37px',
				'42px',
				'48px',
				'52px',
			];
			return { args, LABELS, SIZE_CHOICES };
		},
		template: `<table class="preview-table" ><tbody>
	<tr v-for="size, i in SIZE_CHOICES" :key="size[0]" >
		<td class="label" >{{ LABELS[i] }}</td>
		<td class="label" >{{ size }}</td>
		<td><FButton v-bind="args" :size="size" :icon="undefined" >{{ args.default }}</FButton></td>
		<td align="center" ><FButton v-bind="args" :size="size" ><FIcon :name="args.iconName" /></FButton></td>
	</tr>
</tbody></table>`,
	}),
	argTypes: {
		size: { control: { type: null }},
		default: { control: { type: null }},
		icon: {
			options: ICON_STYLE_CHOICES,
		},
	},
	args: {
		icon: ICON_STYLE_CHOICES[0],
		size: '<size>',
		default: 'Button text',
		iconName: 'plus',
	},
};


export const Icon = {
	name: 'Icon-only mode',
	parameters: {
		docs: {
			description: {
				story: `Use the \`icon\` prop for a icon-only button.

\`\`\`html
<FButton icon="<icon_style>" >Button text</FButton>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonIconStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, ICON_STYLE_CHOICES };
		},
		template: `<table class="preview-table" ><tbody>
	<tr v-for="istyle in ICON_STYLE_CHOICES" :key="istyle" >
		<td class="label" >{{ istyle }}</td>
		<td><FButton v-bind="args" :icon="istyle" ><FIcon :name="args.iconName" /></FButton></td>
	</tr>
</tbody></table>`,
	}),
	argTypes: {
		icon: { control: { type: null }},
		default: { control: { type: null }},
	},
	args: {
		icon: ICON_STYLE_CHOICES.join('|'),
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Content = {
	name: 'Content flexibility',
	render: (args, { argTypes }) => ({
		name: 'FButtonComplexContentStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() { return { args }},
		template: `<FButton v-bind="args" >
	{{ args.default }}
	<FIcon :name="args.iconName" />
</FButton>`,
	}),
	argTypes: {
		icon: { control: { type: null }},
	},
	args: {
		icon: undefined,
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Busy = {
	name: 'Busy state',
	parameters: {
		docs: {
			description: {
				story: `Use the \`busy\` prop to disable the button and show a spinner.

\`\`\`html
<FButton :busy="true" >Button text</FButton>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonBusyStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() { return { args }},
		template: `<table class="preview-table" ><tbody>
	<tr>
		<td><FButton v-bind="args" :icon="undefined" >{{ args.default }}</FButton></td>
		<td><FButton v-bind="args" ><FIcon :name="args.iconName" /></FButton></td>
	</tr>
</tbody></table>`,
	}),
	argTypes: {
		icon: {
			options: ICON_STYLE_CHOICES,
		},
	},
	args: {
		icon: ICON_STYLE_CHOICES[0],
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
		busy: true,
	},
};


export const Colors = {
	name: 'Colors',
	parameters: {
		docs: {
			description: {
				story: `Predefined color values include:

\`\`\`html
<FButton color="<color>" >Button text</FButton>
\`\`\`
`,
			},
		},
	},
	render: (args, { argTypes }) => ({
		name: 'FButtonColorsStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, COLOR_CHOICES };
		},
		template: `<table class="preview-table" ><tbody>
	<tr v-for="color in COLOR_CHOICES" :key="color" >
		<td class="label" >{{ color }}</td>
		<td>
			<FButton v-bind="args" :color="color" >
				<FIcon v-if="args.icon" :name="args.iconName" />
				<template v-else >{{ args.default }}</template>
			</FButton>
		</td>
	</tr>
</tbody></table>`,
	}),
	argTypes: {
		color: { control: { type: null }},
	},
	args: {
		color: '<color>',
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Scheme = {
	name: 'Scheme (Light/Dark)',
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => ({
		name: 'FButtonSchemeStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, COLOR_CHOICES, DESIGN_CHOICES };
		},
		template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="preview-table" ><tbody>
			<tr v-for="color in COLOR_CHOICES" :key="color" >
				<td v-for="design in DESIGN_CHOICES" :key="design" >
					<FButton v-bind="args" :color="color" :design="design" >
						<FIcon v-if="args.icon" :name="args.iconName" />
						<template v-else >{{ args.default }}</template>
					</FButton>
				</td>
			</tr>
		</tbody></table>
	</div>
	<div class="sbpst-dark" >
		<table class="preview-table" ><tbody>
			<tr v-for="color in COLOR_CHOICES" :key="color" >
				<td v-for="design in DESIGN_CHOICES" :key="design" >
					<FButton v-bind="args" :color="color" :design="design" >
						<FIcon v-if="args.icon" :name="args.iconName" />
						<template v-else >{{ args.default }}</template>
					</FButton>
				</td>
			</tr>
		</tbody></table>
	</div>
</div>`,
	}),
	argTypes: {
		color: { control: { type: null }},
		design: { control: { type: null }},
	},
	args: {
		default: 'Button text',
		color: '<color>',
		design: '<design>',
		iconName: ICON_LIST_SOLID[0],
	},
};
