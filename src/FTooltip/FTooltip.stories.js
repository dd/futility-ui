import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/sb.stuff.js';
import FIcon from '@/FIcon';
import FButton from '@/FButton';
import Readme from './README.md?raw';
import FTooltip from './index.vue';
import { vTooltip } from './directive';
import { PLACEMENT_CHOICES, TRIGGER_CHOICES, THEME_CHOICES } from './constants';


const DEFAULT_TEMPLATE = `<FTooltip v-bind="args" >
	<div class="sbfui-ftooltip-trigger_example">Hover me</div>
</FTooltip>`;


export default {
	title: 'FTooltip',
	component: FTooltip,
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
			description: 'Open state of the tooltip (`v-model`). The trigger can update it, and the parent can control it programmatically.',
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
			description: 'Emitted when the open state changes.',
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
	render: (args) => {
		const [ , updateArgs ] = useArgs();
		const openArg = makeUpdateArg('open', updateArgs);
		return {
			components: { FTooltip },
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
		text: 'Tooltip text',
		placement: 'top',
		theme: 'tooltip',
		delay: 0,
		trigger: 'hover',
	},
};


export const Default = {};


const THEME_DESCRIPTION = `Built-in themes. The \`theme\` prop accepts any string and becomes a
CSS class: \`fui-tooltip-theme-<theme>\`, so you can define your own themes alongside the built-in
ones.

|       Theme      |             Use case               |
|------------------|------------------------------------|
| \`tooltip\`      | Short single-line hints            |
| \`tooltip-rich\` | Hints with a title and description |
`;


const THEME_TEMPLATE = `<div class="sbfui-preview-flex-x" >
	<FTooltip v-bind="args" theme="tooltip" text="Short hint" >
		<div class="sbfui-ftooltip-trigger_example" >tooltip</div>
	</FTooltip>

	<FTooltip v-bind="args" theme="tooltip-rich" >
		<div class="sbfui-ftooltip-trigger_example" >tooltip-rich</div>
		<template #content >
			<p class="fui-tooltip-header" >Tooltip title</p>
			<p>Additional text explaining what is going on here.</p>
		</template>
	</FTooltip>
</div>`;


export const Themes = {
	parameters: {
		docs: { description: { story: THEME_DESCRIPTION }},
	},
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FTooltip, FButton },
			setup() {
				const newArgs = computed(() => {
					const result = { ...args };
					delete result['theme'];
					delete result['open'];
					delete result['update:open'];
					delete result['text'];
					result['onShow'] = result.show;
					delete result['show'];
					result['onHide'] = result.hide;
					delete result['hide'];
					return result;
				});
				return { args: newArgs };
			},
			template: THEME_TEMPLATE,
		};
	},
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


const PLACEMENT_DESCRIPTION = `All 12 placement options are supported. The tooltip flips
automatically when it reaches the viewport edge.`;


const PLACEMENT_TEMPLATE = `<div class="sbfui-ftooltip-placement-preview" >
	<template v-for="p, i in PLACEMENT_CHOICES" >
		<FTooltip
			v-if="p"
			:key="i"
			v-bind="args"
			:placement="p"
			:text="\`placement: \${p}\`"
		>
			<div class="sbfui-ftooltip-trigger_example" >{{ p }}</div>
		</FTooltip>
		<div v-else :key="\`div-\${i}\`" />
	</template>
</div>`;


export const Placements = {
	parameters: {
		docs: {
			description: { story: PLACEMENT_DESCRIPTION },
		},
	},
	render: (args) => ({
		components: { FTooltip },
		setup() {
			const newArgs = computed(() => {
				const result = { ...args };
				delete result['placement'];
				delete result['text'];
				delete result['open'];
				delete result['update:open'];
				result['onShow'] = result.show;
				delete result['show'];
				result['onHide'] = result.hide;
				delete result['hide'];
				return result;
			});
			return {
				args: newArgs,
				PLACEMENT_CHOICES: [
					 null,        'top-start',    'top',    'top-end',    null,
					'left-start', null,           null,     null,        'right-start',
					'left',       null,           null,     null,        'right',
					'left-end',   null,           null,     null,        'right-end',
					 null,        'bottom-start', 'bottom', 'bottom-end', null,
				],
			};
		},
		template: PLACEMENT_TEMPLATE,
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
	render: (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		return {
			props: Object.keys(argTypes),
			components: { FTooltip },
			setup() {
				const newArgs = computed(() => {
					const result = { ...args };
					result['onShow'] = result.show;
					delete result['show'];
					result['onHide'] = result.hide;
					delete result['hide'];
					return result;
				});
				return { args: newArgs };
			},
			template: DEFAULT_TEMPLATE,
		};
	},
	args: {
		text: 'Appears after 400ms, hides after 200ms',
		delay: [ 400, 200 ],
	},
};


const NON_INT_DESCRIPTION = `By default the tooltip is **interactive**: the cursor can move inside
it without closing it.

The \`non-interactive\` flag disables this behaviour: the tooltip ignores the cursor and does not
intercept mouse events. Use it for plain text hints that should only be read, not interacted with.`;


const NON_INT_TEMPLATE = `<div class="sbfui-preview-flex-x" >
	<FTooltip v-bind="args" text="You can hover inside me" >
		<div class="sbfui-ftooltip-trigger_example" >Default (interactive)</div>
	</FTooltip>

	<FTooltip v-bind="args" text="You cannot hover inside me" non-interactive >
		<div class="sbfui-ftooltip-trigger_example" >Non-interactive</div>
	</FTooltip>
</div>`;


export const NonInteractive = {
	parameters: {
		docs: {
			description: { story: NON_INT_DESCRIPTION },
		},
	},
	render: (args) => ({
		components: { FTooltip },
		setup() {
			const newArgs = computed(() => {
				const result = { ...args };
				delete result['nonInteractive'];
				delete result['text'];
				delete result['open'];
				delete result['update:open'];
				result['onShow'] = result.show;
				delete result['show'];
				result['onHide'] = result.hide;
				delete result['hide'];
				return result;
			});
			return { args: newArgs };
		},
		template: NON_INT_TEMPLATE,
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


const TRIGGERS_DESC = `
| Trigger | Behaviour |
|---|---|
| \`hover\` | Shows on mouseenter and focus |
| \`click\` | Toggles on click |
| \`hover&click\` | Shows on hover; click pins it open so it stays visible after the cursor leaves |
| \`focus\` | Shows on focus only |
| \`manual\` | Controlled entirely via \`v-model:open\`. See the [v-model:open](?path=/docs/ftooltip--docs#v-modelopen) section |
`;


const TRIGGERS_TEMP = `<div class="sbfui-preview-flex-x">
	<FTooltip
		v-for="trigger, i in TRIGGER_CHOICES"
		:key="i"
		v-bind="args"
		:trigger="trigger"
		:text="LABELS[i]"
	>
		<FButton>{{ trigger }}</FButton>
	</FTooltip>
</div>`;


export const Triggers = {
	parameters: {
		docs: {
			description: { story: TRIGGERS_DESC },
		},
	},
	render: (args) => ({
		components: { FTooltip, FButton },
		setup() {
			const newArgs = computed(() => {
				const result = { ...args };
				delete result['trigger'];
				delete result['text'];
				delete result['open'];
				delete result['update:open'];
				result['onShow'] = result.show;
				delete result['show'];
				result['onHide'] = result.hide;
				delete result['hide'];
				return result;
			});
			return {
				args: newArgs,
				TRIGGER_CHOICES: TRIGGER_CHOICES.filter(t => t !== 'manual'),
				LABELS: [
					'Hover trigger',
					'Click trigger',
					'Hover and click trigger',
					'Focus trigger',
				],
			};
		},
		template: TRIGGERS_TEMP,
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


const VMODEL_DESC = `\`v-model:open\` syncs the open/closed state bidirectionally.

Triggers (hover, click, focus) update the bound value in the parent.
The parent can also open or close the tooltip programmatically by setting the value.

With \`trigger="manual"\` the tooltip is controlled **exclusively** via \`v-model:open\`.

\`\`\`html
<FTooltip v-model:open="isOpen" trigger="manual" text="Controlled">
	<FButton>Reference</FButton>
</FTooltip>
\`\`\`

> **Note:** when controlling visibility via \`v-model:open\`, the \`show\` and \`hide\` events are not emitted.
`;


const VMODEL_TEMPLATE = `<div class="sbfui-ftooltip-vmodel" >
	<FTooltip
		v-model:open="isOpen"
		v-bind="args"
		trigger="manual"
		text="Controlled via v-model:open"
	>
		<FIcon name="bell_ring_outline" />
	</FTooltip>

	<div class="sbfui-preview-flex-x" style="gap:4px;" >
		<FButton @click="isOpen = true" >Show</FButton>
		<FButton @click="isOpen = false" >Hide</FButton>
	</div>
</div>`;


export const VModelOpen = {
	name: 'v-model:open',
	parameters: {
		docs: {
			description: { story: VMODEL_DESC },
		},
	},
	render: (args) => ({
		components: { FTooltip, FButton, FIcon },
		setup() {
			const newArgs = computed(() => {
				const result = { ...args };
				delete result['text'];
				delete result['open'];
				delete result['update:open'];
				result['onShow'] = result.show;
				delete result['show'];
				result['onHide'] = result.hide;
				delete result['hide'];
				return result;
			});

			const isOpen = ref(false);
			return { args: newArgs, isOpen };
		},
		template: VMODEL_TEMPLATE,
	}),
	argTypes: {
		open: { control: { type: null } },
	},
	args: {
		open: '<bool>',
	},
};


const DIRECTIVE_DESCRIPTION = `The \`v-tooltip\` directive is convenient for simple use cases when
you do not need a wrapper component.

All the main props are available through the directive as well.

\`\`\`js
import { vTooltip } from 'futility-ui'
// or register globally: app.directive('tooltip', vTooltip)
\`\`\`

\`\`\`html
<button v-tooltip="'Hello world'">Hover me</button>
<!-- or -->
<button v-tooltip="{ text: 'Error!', placement: 'bottom', theme: 'tooltip' }">Hover me</button>
\`\`\`
`;


const DIRECTIVE_TEMPLATE = `<p>
	The directive lets you add a quick hint directly inside
	<span class="sbfui-ftooltip-text_example" v-tooltip="'Simple string'" >text</span> without
	wrapping anything in a component.
	<br />
	All the main options are available too -
	<span
		class="sbfui-ftooltip-text_example"
		v-tooltip="{ text: 'Bottom placement', ...args }"
	>just pass an object</span>.
</p>`;


export const Directive = {
	parameters: {
		docs: { description: { story: DIRECTIVE_DESCRIPTION }},
	},
	render: (args) => ({
		directives: { tooltip: vTooltip },
		setup() {
			const newArgs = computed(() => {
				const result = { ...args };
				delete result['text'];
				delete result['open'];
				delete result['update:open'];
				result['onShow'] = result.show;
				delete result['show'];
				result['onHide'] = result.hide;
				delete result['hide'];
				return result;
			});
			return { args: newArgs };
		},
		template: DIRECTIVE_TEMPLATE,
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
