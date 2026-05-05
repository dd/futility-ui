import { ref } from 'vue';

import FButton from '@/FButton';
import FModal from '../index.vue';
import { ICON_TYPES } from '../constants';
import FMLayoutDialog from './FMLayoutDialog';


export default {
	title: 'FModal/Layouts/FMLayoutDialog',
	component: FMLayoutDialog,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `A layout for confirmations and notifications with a fixed width and centered content.

For quick one-off dialogs without a template, use the [useFModalDialog](?path=/docs/fmodal-usefmodaldialog--docs) shortcut instead.`,
			},
		},
	},
	argTypes: {
		// props
		icon: {
			control: 'select',
			options: [ undefined, ...ICON_TYPES ],
			table: {
				category: 'props',
				type: { summary: ICON_TYPES.join(' | ') },
			},
		},
		outline: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		color: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		hideCloseButton: {
			control: 'boolean',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		closeLabel: {
			control: 'text',
			table: {
				category: 'props',
				type: { summary: 'string' },
				defaultValue: { summary: 'Close' },
			},
		},
		// slots
		default: {
			control: { type: null },
			description: 'Message text.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		icon: {
			control: { type: null },
			description: 'Replaces the preset icon entirely. Rendered only when the `icon` prop or this slot is provided.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		controls: {
			control: { type: null },
			description: 'Action buttons. Rendered only when provided.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		// events
		close: {
			action: 'close',
			description: 'Emitted when the × button is clicked.',
			table: { category: 'events' },
		},
	},
	args: {
		icon: 'error',
		outline: false,
		color: true,
		hideCloseButton: false,
	},
};


export const Default = {
	render: (args) => ({
		components: { FMLayoutDialog, FButton },
		setup() { return { args }; },
		template: `
			<FMLayoutDialog v-bind="args" @close="args.close">
				<p><strong>Delete item?</strong></p>
				<p>This action cannot be undone.</p>
				<template #controls>
					<FButton design="outline">Cancel</FButton>
					<FButton color="red">Delete</FButton>
				</template>
			</FMLayoutDialog>
		`,
	}),
};


const ICONS_TEMP = `<div class="sbfui-layoutdialog-icons-preview" >
	<FButton v-for="cfg in VARIANTS" :key="cfg.label" @click="open(cfg)">
		{{ cfg.label }}
	</FButton>
	<FButton
		v-for="cfg in VARIANTS"
		:key="\`\${cfg.label}-outline\`"
		@click="open({ ...cfg, outline: true })"
	>
		{{ cfg.label }} (outline)
	</FButton>
</div>
<FModal v-model="isOpen">
	<template #default="{ close }">
		<FMLayoutDialog :icon="active.icon" :outline="active.outline" color @close="close">
			<p><strong>{{ active.label }}</strong></p>
			<p>Example of the {{ active.icon }}{{ active.outline ? ' (outline)' : '' }} icon.</p>
			<template #controls>
				<FButton @click="close">OK</FButton>
			</template>
		</FMLayoutDialog>
	</template>
</FModal>`;


export const Icons = {
	parameters: {
		docs: {
			description: { story: 'All four icon types in filled and outline variants with `color`.' },
		},
	},
	render: () => ({
		components: { FModal, FMLayoutDialog, FButton },
		setup() {
			const isOpen = ref(false);
			const VARIANTS = [
				{ label: 'info', icon: 'info', },
				{ label: 'success', icon: 'success', },
				{ label: 'warning', icon: 'warning', },
				{ label: 'error', icon: 'error', },
			];
			const active = ref(VARIANTS[0]);
			const open = (cfg) => { active.value = cfg; isOpen.value = true; };
			return { isOpen, VARIANTS, active, open };
		},
		template: ICONS_TEMP,
	}),
};
