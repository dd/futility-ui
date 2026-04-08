import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/utils/storybook';
import FIcon from '@/FIcon';
import FButton from '@/FButton';
import FTooltip from './index.vue';
import { vTooltip } from './directive';
import { PLACEMENT_CHOICES, TRIGGER_CHOICES, THEME_CHOICES } from './constants';


const usage = `
\`FTooltip\` wraps a trigger element and shows a floating tooltip on interaction.
Positioning is handled by [@floating-ui](https://floating-ui.com/) - it automatically
flips and shifts to stay within the viewport.


### Component (simple)

\`\`\`js
import { FTooltip } from 'futility-ui'
// or
import FTooltip from 'futility-ui/FTooltip'
\`\`\`

\`\`\`html
<FTooltip text="Hello world">
	<FButton>Hover me</FButton>
</FTooltip>
\`\`\`


### Component (rich content)

\`\`\`html
<FTooltip theme="dropdown" trigger="click" >
	<FButton>Open menu</FButton>
	<template #content>
		<div>Any <strong>rich</strong> content here</div>
	</template>
</FTooltip>
\`\`\`


### Directive

\`\`\`js
import { vTooltip } from 'futility-ui'
// or register globally: app.directive('tooltip', vTooltip)
\`\`\`

\`\`\`html
<button v-tooltip="'Hello world'">Hover me</button>
<!-- or -->
<button v-tooltip="{ text: 'Error!', placement: 'bottom', theme: 'tooltip' }">Field</button>
\`\`\`
`;


export default {
	title: 'FTooltip',
	component: FTooltip,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: usage },
		},
	},
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Open/closed state of the tooltip (`v-model`). Works bidirectionally - triggers update the parent, parent can control visibility programmatically.',
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
		theme: {
			options: THEME_CHOICES,
			control: 'select',
		},
		delay: {
			table: {
				type: { summary: 'number | [number, number]' },
			},
		},
		trigger: {
			options: TRIGGER_CHOICES,
			control: 'select',
		},
		dirrectiveElement: { control: { type: null }},
		// Slots
		default: {
			control: { type: null },
			description: 'Trigger element.',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
			},
		},
		content: {
			control: { type: null },
			description: 'Rich tooltip content (overrides `text` prop).',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
			},
		},
		// Events
		'update:open': {
			action: 'update:open',
			description: 'Emitted when open/closed state changes.',
			table: { category: 'events', type: { summary: 'boolean' } },
		},
		show: {
			action: 'show',
			description: 'Emitted when the tooltip becomes visible.',
			table: { category: 'events' },
		},
		hide: {
			action: 'hide',
			description: 'Emitted when the tooltip is hidden.',
			table: { category: 'events' },
		},
	},
	args: {
		open: false,
		text: 'Tooltip text',
		placement: 'top',
		theme: 'tooltip',
		delay: 0,
		trigger: 'hover',
	},
	render: (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FTooltip },
			setup() {
				const newArgs = computed(() => {
					const { show, hide, ...filteredArgs } = args;
					return {
						...filteredArgs,
						'onShow': show,
						'onHide': hide,
					};
				});
				const updateOption = makeUpdateArg('open', null, updateArgs);
				const promisedArgs = { [updateOption[0]]: updateOption[1] };
				return { args: newArgs, promisedArgs };
			},
			template: `
<FTooltip v-bind="args" v-on="promisedArgs" >
	<div class="sb-ftooltip-trigger_example">Hover me</div>
</FTooltip>
			`,
		};
	},
};


export const Default = {};


const THEME_DESCRIPTION = `
Built-in themes. The \`theme\` prop is a free string - it becomes a CSS class
\`fui-tooltip-theme-<theme>\`, so you can define your own themes alongside the built-in ones.

|       Theme      |             Use case               |
|------------------|------------------------------------|
| \`tooltip\`      | Short single-line hints            |
| \`tooltip-rich\` | Hints with a title and description |
`;


export const Themes = {
	parameters: {
		docs: { description: { story: THEME_DESCRIPTION }},
	},
	render: (args) => ({
		components: { FTooltip, FButton },
		setup() {
			const newArgs = computed(() => {
				const { 'theme': _a, 'open': _b, show, hide, ...filteredArgs } = args;
				return {
					...filteredArgs,
					'onShow': show,
					'onHide': hide,
				};
			});
			const updateOption = makeUpdateArg('open');
			const promisedArgs = { [updateOption[0]]: updateOption[1] };
			return { args: newArgs, promisedArgs };
		},
		template: `<div class="preview-flex" >
	<FTooltip v-bind="args" v-on="promisedArgs" theme="tooltip" text="Short hint" >
		<div class="sb-ftooltip-trigger_example" >tooltip</div>
	</FTooltip>

	<FTooltip v-bind="args" v-on="promisedArgs" theme="tooltip-rich" >
		<div class="sb-ftooltip-trigger_example" >tooltip-rich</div>
		<template #content >
			<p class="fui-tooltip-header" >Tooltip title</p>
			<p>Additional text explaining what is going on here.</p>
		</template>
	</FTooltip>
</div>`,
	}),
	argTypes: {
		theme: { control: { type: null }},
		text: { control: { type: null }},
		open: { control: { type: null }},
	},
	args: {
		theme: '<theme>',
		text: '<text>',
		open: '<bool>',
	},
};


export const Placements = {
	parameters: {
		docs: {
			description: {
				story: `All 12 placement options. The tooltip flips automatically when it hits the
				viewport edge.`,
			},
		},
	},
	render: (args) => ({
		components: { FTooltip },
		setup() {
			const newArgs = computed(() => {
				const { 'placement': _a, 'text': _b, 'open': _c, show, hide, ...filteredArgs } = args;  // eslint-disable-line no-unused-vars
				return {
					...filteredArgs,
					'onShow': show,
					'onHide': hide,
				};
			});
			const updateOption = makeUpdateArg('open');
			const promisedArgs = { [updateOption[0]]: updateOption[1] };
			return {
				args: newArgs,
				PLACEMENT_CHOICES: [
					 null,        'top-start',    'top',    'top-end',    null,
					'left-start', null,           null,     null,        'right-start',
					'left',       null,           null,     null,        'right',
					'left-end',   null,           null,     null,        'right-end',
					 null,        'bottom-start', 'bottom', 'bottom-end', null,
				],
				promisedArgs,
			};
		},
		template: `<div class="sb-ftooltip-placement-preview" >
	<template v-for="p, i in PLACEMENT_CHOICES" >
		<FTooltip
			v-if="p"
			:key="i"
			v-bind="args"
			v-on="promisedArgs"
			:placement="p"
			:text="\`placement: \${p}\`"
		>
			<div class="sb-ftooltip-trigger_example" >{{ p }}</div>
		</FTooltip>
		<div v-else :key="\`div-\${i}\`" />
	</template>
</div>`,
	}),
	argTypes: {
		placement: { control: { type: null }},
		text: { control: { type: null }},
		open: { control: { type: null }},
	},
	args: {
		placement: '<placement>',
		text: '<text>',
		open: '<bool>',
	},
};


export const Delay = {
	args: {
		text: 'Appears after 400ms, hides after 200ms',
		delay: [ 400, 200 ],
	},
};


export const NonInteractive = {
	parameters: {
		docs: {
			description: {
				story: `By default the tooltip is **interactive** - the cursor can move inside it
without closing it.

The \`non-interactive\` flag disables this: the tooltip ignores the cursor and does not
intercept mouse events. Use it for plain text hints that should only be read, not interacted with.`,
			},
		},
	},
	render: (args) => ({
		components: { FTooltip },
		setup() {
			const newArgs = computed(() => {
				const { 'nonInteractive': _a, 'text': _b, 'open': _c, show, hide, ...filteredArgs } = args;
				return {
					...filteredArgs,
					'onShow': show,
					'onHide': hide,
				};
			});
			const updateOption = makeUpdateArg('open');
			const promisedArgs = { [updateOption[0]]: updateOption[1] };
			return { args: newArgs, promisedArgs };
		},
		template: `
<div class="preview-flex" >
	<FTooltip v-bind="args" v-bind="promisedArgs" text="You can hover inside me" >
		<div class="sb-ftooltip-trigger_example" >Default (interactive)</div>
	</FTooltip>

	<FTooltip v-bind="args" v-bind="promisedArgs" text="You cannot hover inside me" non-interactive >
		<div class="sb-ftooltip-trigger_example" >Non-interactive</div>
	</FTooltip>
</div>`,
	}),
	argTypes: {
		text: { control: { type: null }},
		nonInteractive: { control: { type: null }},
		open: { control: { type: null }},
	},
	args: {
		text: 'text',
		nonInteractive: '<bool>',
		open: '<bool>',
	},
};


export const Triggers = {
	parameters: {
		docs: {
			description: {
				story: `
| Trigger | Behaviour |
|---|---|
| \`hover\` | Shows on mouseenter and focus |
| \`click\` | Toggles on click |
| \`hover&click\` | Shows on hover; click pins it open so it stays visible after the cursor leaves |
| \`focus\` | Shows on focus only |
| \`manual\` | Controlled entirely via \`v-model:open\`. See the [v-model:open](?path=/docs/ftooltip--docs#v-modelopen) section |
`,
			},
		},
	},
	render: (args) => ({
		components: { FTooltip, FButton },
		setup() {
			const newArgs = computed(() => {
				const { 'trigger': _a, 'text': _b, 'open': _c, show, hide, ...filteredArgs } = args;  // eslint-disable-line no-unused-vars
				return {
					...filteredArgs,
					'onShow': show,
					'onHide': hide,
				};
			});
			const updateOption = makeUpdateArg('open');
			const promisedArgs = { [updateOption[0]]: updateOption[1] };
			return {
				args: newArgs,
				TRIGGER_CHOICES: TRIGGER_CHOICES.filter(t => t !== 'manual'),
				LABELS: [
					'Hover trigger',
					'Click trigger',
					'Hover and click trigger',
					'Focus trigger',
				],
				promisedArgs,
			};
		},
		template: `<div class="preview-flex">
	<FTooltip
		v-for="trigger, i in TRIGGER_CHOICES"
		:key="i"
		v-bind="args"
		v-on="promisedArgs"
		:trigger="trigger"
		:text="LABELS[i]"
	>
		<FButton>{{ trigger }}</FButton>
	</FTooltip>
</div>`,
	}),
	argTypes: {
		trigger: { control: { type: null } },
		text: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		trigger: '<trigger>',
		text: '<text>',
		open: '<bool>',
	},
};


export const VModelOpen = {
	name: 'v-model:open',
	parameters: {
		docs: {
			description: {
				story: `\`v-model:open\` syncs the open/closed state bidirectionally.

Triggers (hover, click, focus) update the bound value in the parent.
The parent can also open or close the tooltip programmatically by setting the value.

With \`trigger="manual"\` the tooltip is controlled **exclusively** via \`v-model:open\`.

\`\`\`html
<FTooltip v-model:open="isOpen" trigger="manual" text="Controlled">
	<FButton>Reference</FButton>
</FTooltip>
\`\`\`

> **Note:** when controlling visibility via \`v-model:open\`, the \`show\` and \`hide\` events are not emitted.
`,
			},
		},
	},
	render: (args) => ({
		components: { FTooltip, FButton, FIcon },
		setup() {
			const isOpen = ref(false);
			const newArgs = computed(() => {
				const { 'trigger': _a, 'text': _b, 'open': _c, show, hide, ...filteredArgs } = args;  // eslint-disable-line no-unused-vars
				return {
					...filteredArgs,
					'onShow': show,
					'onHide': hide,
				};
			});
			return { args: newArgs, isOpen };
		},
		template: `
<div class="sb-ftooltip-vmodel" >
	<FTooltip
		v-model:open="isOpen"
		v-bind="args"
		trigger="manual"
		text="Controlled via v-model:open"
	>
		<FIcon name="bell_ring_outline" />
	</FTooltip>

	<div class="preview-flex" style="gap:4px;" >
		<FButton @click="isOpen = true" >Show</FButton>
		<FButton @click="isOpen = false" >Hide</FButton>
	</div>
</div>`,
	}),
	argTypes: {
		trigger: { control: { type: null } },
		text: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		trigger: '<trigger>',
		text: '<text>',
		open: '<bool>',
	},
};


export const Directive = {
	parameters: {
		docs: {
			description: {
				story: `The \`v-tooltip\` directive for simple use cases - no wrapper component needed.

All the main props are available through the directive as well.`,
			},
		},
	},
	render: (args) => ({
		directives: { tooltip: vTooltip },
		setup() {
			const updateOption = makeUpdateArg('open');
			const newArgs = computed(() => {
				const { 'text': _a, 'update:open': _b, 'open': _c, show, hide, ...filteredArgs } = args;
				return {
					...filteredArgs,
					'onShow': show,
					'onHide': hide,
					'onUpdate:open': updateOption[1],
				};
			});
			return { args: newArgs };
		},
		template: `
<p>
	The directive lets you add a quick hint directly inside
	<span class="sb-ftooltip-text_example" v-tooltip="'Simple string'" >text</span> without
	wrapping anything in a component.
	<br />
	All the main options are available too -
	<span
		class="sb-ftooltip-text_example"
		v-tooltip="{ text: 'Bottom placement', ...args }"
	>just pass an object</span>.
</p>
		`,
	}),
	argTypes: {
		text: { control: { type: null } },
		open: { control: { type: null } },
	},
	args: {
		placement: 'bottom',
		text: '<text>',
		open: '<bool>',
	},
};
