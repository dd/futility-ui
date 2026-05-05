import { ref } from 'vue';

import FButton from '@/FButton';
import FModal from '../index.vue';
import { SIZE_CHOICES } from '../constants';
import FMLayoutDefault from './FMLayoutDefault';


export default {
	title: 'FModal/Layouts/FMLayoutDefault',
	component: FMLayoutDefault,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `Default layout for general-purpose modals. It provides a standard panel with an optional title/header, content area, footer actions, and a close button.
Use it when the modal content does not need form semantics or a compact confirmation dialog layout.`,
			},
		},
	},
	argTypes: {
		// props
		size: {
			control: 'select',
			options: SIZE_CHOICES,
		},
		// slots
		default: {
			control: { type: null },
			description: 'Main modal content.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		header: {
			control: { type: null },
			description: 'Replaces the entire header content while keeping the × button. By default, renders `title` as an `<h3>`.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		footer: {
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
		title: 'Modal title',
		size: 'md',
		hideCloseButton: false,
		closeLabel: 'Close',
	},
};


export const Default = {
	render: (args) => ({
		components: { FMLayoutDefault, FButton },
		setup() { return { args }; },
		template: `
			<FMLayoutDefault v-bind="args" @close="args.close">
				<p>Main modal content. It can contain any HTML or components.</p>
				<template #footer>
					<FButton design="outline">Cancel</FButton>
					<FButton>Confirm</FButton>
				</template>
			</FMLayoutDefault>
		`,
	}),
};


export const NoTitle = {
	parameters: {
		docs: {
			description: {
				story: 'Without `title`, no header is rendered. The × button is absolutely positioned over the content, and the body gets extra `padding-top` to avoid overlapping it.',
			},
		},
	},
	args: {
		title: '',
	},
	render: (args) => ({
		components: { FMLayoutDefault, FButton },
		setup() { return { args }; },
		template: `
			<FMLayoutDefault v-bind="args" @close="args.close">
				<p>A modal without a title. The × button stays in the top-right corner.</p>
				<template #footer>
					<FButton>OK</FButton>
				</template>
			</FMLayoutDefault>
		`,
	}),
};


const SIZE_TEMP = `<div style="display:flex;gap:8px;flex-wrap:wrap;">
	<FButton v-for="size in SIZES" :key="size" @click="open(size)">{{ size[0] }}: {{ size[1] }}</FButton>
</div>
<FModal v-model="isOpen">
	<template #default="{ close }">
		<FMLayoutDefault
			:size="activeSize[0]"
			:title="'size: ' + activeSize[0] + ' / max-width: ' + activeSize[1]"
			@close="close"
		>
			<div style="width:100%;height:4px;background:#6366f1;border-radius:2px;" />
		</FMLayoutDefault>
	</template>
</FModal>`;


export const Sizes = {
	parameters: {
		docs: {
			description: {
				story: 'The `size` prop controls the panel size. Use one of the built-in presets, provide a custom size key for your own CSS, or pass an empty value to render without a size class. When omitted, it defaults to `md`.',
			},
		},
	},
	render: () => ({
		components: { FModal, FMLayoutDefault, FButton },
		setup() {
			const isOpen = ref(false);
			const SIZES = [
				['sm', '28rem'],
				['md', '32rem'],
				['lg', '48rem'],
				['xl', '64rem'],
				['full', '100%.'],
			];
			const activeSize = ref(SIZES[0]);
			const open = (size) => { activeSize.value = size; isOpen.value = true; };
			return { isOpen, activeSize, SIZES, SIZE_CHOICES, open };
		},
		template: SIZE_TEMP,
	}),
};
