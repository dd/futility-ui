import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/sb.stuff.js';
import FButton from '@/FButton';
import Readme from './README.md?raw';
import FDropdown from './index.vue';
import { PLACEMENT_CHOICES, OPEN_ON_CHOICES, APPEARANCE_CHOICES } from './constants';


const DEFAULT_TEMPLATE = `<FDropdown v-bind="args" >
	<template #trigger="{ triggerAttrs }" ><FButton v-bind="triggerAttrs" >Open dropdown</FButton></template>
	<div style="padding: 8px 16px;" >Dropdown content</div>
</FDropdown>`;


export default {
	title: 'FDropdown',
	component: FDropdown,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		},
	},
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Open state of the dropdown (`v-model:open`). Can be controlled programmatically or updated by triggers.',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		placement: {
			options: PLACEMENT_CHOICES,
			control: 'select',
		},
		openOn: {
			options: OPEN_ON_CHOICES,
			control: 'select',
			description: 'What opens the dropdown: `click`, `hover` (also keyboard focus) or `manual` (only `v-model:open`).',
			table: {
				category: 'props',
				type: { summary: 'string' },
				defaultValue: { summary: "'click'" },
			},
		},
		trigger: {
			control: { type: null },
			description: '**Deprecated**, use `open-on`.',
			table: { category: 'props', type: { summary: 'string' } },
		},
		appearance: {
			options: APPEARANCE_CHOICES,
			control: 'select',
		},
		offset: {
			control: { type: 'number' },
		},
		disabled: {
			control: 'boolean',
		},
		matchTriggerWidth: {
			control: 'boolean',
			description: 'Match the floating panel width to the trigger width (border-box).',
		},
		closeOnOutside: {
			control: 'boolean',
			description: 'Explicitly enables or disables outside-click closing.',
		},
		// Slots
		default: {
			control: { type: null },
			description: 'Dropdown content. Receives `{ close, open }` slot props.',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
			},
		},
		'slot:trigger': {
			control: { type: null },
			description: 'Trigger element. Receives `{ open, toggle, triggerAttrs }` slot props. Bind `triggerAttrs` (`aria-expanded`, `aria-controls`) to the focusable element.',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
			},
		},
		// Events
		'update:open': {
			action: 'update:open',
			description: 'Emitted when the open state changes.',
			table: { category: 'events', type: { summary: 'boolean' } },
		},
		show: {
			action: 'show',
			description: 'Emitted when the dropdown opens.',
			table: { category: 'events' },
		},
		hide: {
			action: 'hide',
			description: 'Emitted when the dropdown closes.',
			table: { category: 'events' },
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		const openArg = makeUpdateArg('open', updateArgs);
		return {
			components: { FDropdown, FButton },
			setup() {
				const newArgs = computed(() => {
					const { show, hide, ...result } = args;
					result['onShow'] = show;
					result['onHide'] = hide;
					delete result[openArg[1]];
					result[openArg[0]] = openArg[2];
					return result;
				});
				return { args: newArgs };
			},
			template: DEFAULT_TEMPLATE,
		};
	},
	args: {
		open: false,
		placement: 'bottom-start',
		openOn: 'click',
		offset: 8,
		disabled: false,
		matchTriggerWidth: false,
		closeOnOutside: undefined,
		appearance: 'default',
	},
};


export const Default = {};


const APPEARANCE_DESC = `The \`appearance\` prop sets padding and layout of the dropdown content:

* \`select\` - Option lists
* \`menu\` - Action menus

When omitted, no padding or layout is applied - the content slot renders as-is.`;


const APPEARANCE_TEMP = `<div class="sbfui-preview-flex-x" >
	<FDropdown v-bind="args" appearance="select" >
		<template #trigger ><FButton>select</FButton></template>
		<template #default="{ close }" >
			<button class="fui-dropdown-select_option" @click="close" >Option 1</button>
			<button class="fui-dropdown-select_option" @click="close" >Option 2</button>
			<button class="fui-dropdown-select_option" @click="close" >Option 3</button>
		</template>
	</FDropdown>

	<FDropdown v-bind="args" appearance="menu" >
		<template #trigger ><FButton>menu</FButton></template>
		<template #default="{ close }" >
			<button class="fui-dropdown-menu_item" @click="close" >Action 1</button>
			<button class="fui-dropdown-menu_item" @click="close" >Action 2</button>
			<button class="fui-dropdown-menu_item" @click="close" >Action 3</button>
		</template>
	</FDropdown>
</div>`;


export const Appearance = {
	parameters: {
		docs: {
			description: { story: APPEARANCE_DESC },
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { FDropdown, FButton },
			setup() {
				const newArgs = computed(() => {
					const { show, hide, open, appearance, ...result } = args;
					delete result['update:open'];
					result['onShow'] = show;
					result['onHide'] = hide;
					return result;
				});
				return { args: newArgs };
			},
			template: APPEARANCE_TEMP,
		};
	},
	argTypes: {
		appearance: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		appearance: '<appearance>',
		open: '<open>',
	},
};


const ITEMS_DESC = `Item states for both dropdown types.

**\`fui-dropdown-select_option\`** - option row for select-style dropdowns. Has the following
modifiers:

* \`.is-current\` - Currently selected value
* \`disabled\` (\`.is-disabled\`) - Disabled option

**\`fui-dropdown-menu_item\`** - action row for menu-style dropdowns. Has the following modifiers:

* \`.is-danger\` - Destructive action - renders in red
* \`disabled\` (\`.is-disabled\`) - Disabled action

**\`fui-dropdown-divider\`** - horizontal separator between item groups.

The default slot exposes \`{ close }\` to dismiss the dropdown after an action.`;


const ITEMS_TEMPLATE = `<div class="sbfui-preview-flex-x" >
	<FDropdown v-bind="args" appearance="select" >
		<template #trigger ><FButton>User</FButton></template>
		<template #default="{ close }" >
			<button class="fui-dropdown-select_option" @click="close" >User #1</button>
			<button class="fui-dropdown-select_option is-current" @click="close" >User #2</button>
			<button class="fui-dropdown-select_option" @click="close" >User #3</button>
			<button class="fui-dropdown-select_option" @click="close" disabled >User #4</button>
			<button class="fui-dropdown-select_option" @click="close" >User #5</button>
			<button class="fui-dropdown-select_option" @click="close" >User #6</button>
		</template>
	</FDropdown>

	<FDropdown v-bind="args" appearance="menu" >
		<template #trigger ><FButton>Actions</FButton></template>
		<template #default="{ close }" >
			<button class="fui-dropdown-menu_item" @click="close" >Edit</button>
			<button class="fui-dropdown-menu_item" @click="close" >Duplicate</button>
			<hr class="fui-dropdown-divider" />
			<button class="fui-dropdown-menu_item is-danger" @click="close" >Delete</button>
		</template>
	</FDropdown>
</div>`;


export const Items = {
	parameters: {
		docs: {
			description: { story: ITEMS_DESC },
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { FDropdown, FButton },
			setup() {
				const newArgs = computed(() => {
					const { show, hide, open, appearance, ...result } = args;
					delete result['update:open'];
					result['onShow'] = show;
					result['onHide'] = hide;
					return result;
				});
				return { args: newArgs };
			},
			template: ITEMS_TEMPLATE,
		};
	},
	argTypes: {
		appearance: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		appearance: '<appearance>',
		open: '<open>',
	},
};


export const HoverTrigger = {
	parameters: {
		docs: {
			description: { story: 'Opens on hover or keyboard focus, hides with a short delay after the pointer or focus leaves both the trigger and the panel.' },
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { FDropdown, FButton },
			setup() {
				const newArgs = computed(() => {
					const { show, hide, ...result } = args;
					result['onShow'] = show;
					result['onHide'] = hide;
					return result;
				});
				return { args: newArgs };
			},
			template: DEFAULT_TEMPLATE,
		};
	},
	argTypes: {
		openOn: { control: { type: null } },
	},
	args: {
		openOn: 'hover',
	},
};


const WIDTH_DESC = `\`match-trigger-width\` makes the panel exactly as wide as the trigger, including
its padding and border. Useful for select-like controls.`;


const WIDTH_TEMP = `<div class="sbfui-preview-flex-x" >
	<FDropdown v-bind="args" appearance="select" >
		<template #trigger="{ triggerAttrs }" >
			<FButton v-bind="triggerAttrs" style="width: 240px;" >Wide trigger</FButton>
		</template>
		<button class="fui-dropdown-select_option" >Option 1</button>
		<button class="fui-dropdown-select_option" >Option 2</button>
	</FDropdown>

	<FDropdown v-bind="args" appearance="select" :match-trigger-width="false" >
		<template #trigger="{ triggerAttrs }" >
			<FButton v-bind="triggerAttrs" style="width: 240px;" >Content width</FButton>
		</template>
		<button class="fui-dropdown-select_option" >Option 1</button>
		<button class="fui-dropdown-select_option" >Option 2</button>
	</FDropdown>
</div>`;


export const MatchTriggerWidth = {
	parameters: {
		docs: {
			description: { story: WIDTH_DESC },
		},
	},
	render: (args) => ({
		components: { FDropdown, FButton },
		setup() {
			const newArgs = computed(() => {
				const { show, hide, open, appearance, ...result } = args;
				delete result['update:open'];
				result['onShow'] = show;
				result['onHide'] = hide;
				return result;
			});
			return { args: newArgs };
		},
		template: WIDTH_TEMP,
	}),
	argTypes: {
		appearance: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		matchTriggerWidth: true,
		appearance: '<appearance>',
		open: '<open>',
	},
};


const HEIGHT_DESC = `The panel never grows past the viewport: its \`max-height\` is limited by the
space available on the chosen side (minus an 8px gap). Long content scrolls inside the panel.

FDropdown sets two CSS variables on the panel, styles decide how to use them:

* \`--fui-dropdown-available-height\` - space available for the panel
* \`--fui-dropdown-trigger-width\` - trigger width, used by \`match-trigger-width\`

A custom limit should keep the viewport bound:

\`\`\`css
.my-dropdown {
	max-height: min(320px, var(--fui-dropdown-available-height, 100vh));
}
\`\`\``;


const HEIGHT_TEMP = `<FDropdown v-bind="args" appearance="select" >
	<template #trigger="{ triggerAttrs }" ><FButton v-bind="triggerAttrs" >50 options</FButton></template>
	<template #default="{ close }" >
		<button
			v-for="n in 50"
			:key="n"
			class="fui-dropdown-select_option"
			@click="close"
		>Option {{ n }}</button>
	</template>
</FDropdown>`;


export const MaxHeight = {
	name: 'Max height',
	parameters: {
		docs: {
			description: { story: HEIGHT_DESC },
		},
	},
	render: (args) => ({
		components: { FDropdown, FButton },
		setup() {
			const newArgs = computed(() => {
				const { show, hide, open, appearance, ...result } = args;
				delete result['update:open'];
				result['onShow'] = show;
				result['onHide'] = hide;
				return result;
			});
			return { args: newArgs };
		},
		template: HEIGHT_TEMP,
	}),
	argTypes: {
		appearance: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		appearance: '<appearance>',
		open: '<open>',
	},
};


const PLACEMENTS_DESC = `All 6 placement options. The dropdown flips automatically near viewport
edges.`;


const PLACEMENTS_TEMP = `<div class="sbfui-dropdown-placement-preview" >
	<FDropdown
		v-for="p in PLACEMENTS"
		:key="p"
		:placement="p"
	>
		<template #trigger ><FButton>{{ p }}</FButton></template>
		<div style="padding: 8px 16px;"> placement: {{ p }}</div>
	</FDropdown>
</div>`;


export const Placements = {
	parameters: {
		docs: {
			description: { story: PLACEMENTS_DESC },
		},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { FDropdown, FButton },
			setup() {
				const newArgs = computed(() => {
					const { show, hide, placement, open, ...result } = args;
					delete result['update:open'];
					result['onShow'] = show;
					result['onHide'] = hide;
					return result;
				});
				const PLACEMENTS = [
					'top-start', 'top', 'top-end',
					'bottom-start', 'bottom', 'bottom-end',
				];
				return { args: newArgs, PLACEMENTS };
			},
			template: PLACEMENTS_TEMP,
		};
	},
	argTypes: {
		placement: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		placement: '<placement>',
		open: '<open>',
	},
};


const VMODEL_DESC = `With \`open-on="manual"\` the dropdown is controlled exclusively via
\`v-model:open\`.

> **Note:** in manual mode, click-outside detection is disabled. The dropdown will not close
> when the user clicks elsewhere - closing is entirely the caller's responsibility.

\`\`\`html
<FDropdown v-model:open="isOpen" open-on="manual">
	<template #trigger>
		<FButton @click="isOpen = !isOpen">Toggle</FButton>
	</template>
	<div>Content</div>
</FDropdown>
\`\`\``;


const VMODEL_TEMP = `<div class="sbfui-dropdown-vmodel-preview" >
	<FDropdown v-model:open="isOpen" v-bind="args" >
		<template #trigger ><span>Reference element</span></template>
		<div style="padding: 8px 16px;" >Controlled dropdown</div>
	</FDropdown>

	<FButton @click="isOpen = !isOpen" >Toggle</FButton>
</div>`;


export const ManualControl = {
	name: 'v-model:open',
	parameters: {
		docs: {
			description: { story: VMODEL_DESC },
		},
	},
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { FDropdown, FButton },
			setup() {
				const isOpen = ref(false);
				const newArgs = computed(() => {
					const { show, hide, open, ...result } = args;
					delete result['update:open'];
					result['onShow'] = show;
					result['onHide'] = hide;
					return result;
				});
				return { args: newArgs, isOpen };
			},
			template: VMODEL_TEMP,
		};
	},
	argTypes: {
		openOn: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		openOn: 'manual',
		open: '<open>',
	},
};
