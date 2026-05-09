import { h, ref } from 'vue';

import FButton from '@/FButton';
import FModal from './index.vue';
import { useFModal } from './useFModal';
import FMLayoutDefault from './layouts/FMLayoutDefault';


export default {
	title: 'FModal',
	component: FModal,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		modelValue: {
			control: 'boolean',
			description: 'Whether the modal is open (`v-model`).',
			table: {
				category: 'props',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		clickToClose: {
			control: 'boolean',
			table: {
				category: 'props',
				defaultValue: { summary: 'true' },
			},
		},
		escToClose: {
			control: 'boolean',
			table: {
				category: 'props',
				defaultValue: { summary: 'true' },
			},
		},
		// events
		opened: {
			action: 'opened',
			description: 'Emitted after the opening animation finishes.',
			table: { category: 'events' },
		},
		closed: {
			action: 'closed',
			description: 'Emitted after the closing animation finishes.',
			table: { category: 'events' },
		},
		// slots
		default: {
			control: { type: null },
			description: 'Modal content. Receives `{ close }` for closing the modal from inside.',
			table: { category: 'slots', type: { summary: 'vnode' }},
		},
	},
};


export const Default = {
	render: () => ({
		components: { FModal, FMLayoutDefault, FButton },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<FButton @click="isOpen = true">Open</FButton>
			<FModal v-model="isOpen">
				<template #default="{ close }">
					<FMLayoutDefault title="Title" @close="close">
						<p>Close it any way you like: with ×, a button, the overlay, or Escape.</p>
						<template #footer>
							<FButton design="outline" @click="close">Cancel</FButton>
							<FButton @click="close">Confirm</FButton>
						</template>
					</FMLayoutDefault>
				</template>
			</FModal>
		`,
	}),
};


export const Programmatic = {
	name: 'useFModal',
	render: () => ({
		components: { FButton },
		setup() {
			const { open } = useFModal(FMLayoutDefault, {
				props: { title: 'Programmatic opening' },
				slots: {
					default: 'This modal was opened with useFModal, without v-model in the template.',
					footer: ({ close }) => [
						h(FButton, { design: 'outline', onClick: close }, () => 'Close'),
						h(FButton, { onClick: close }, () => 'OK'),
					],
				},
			});
			return { open };
		},
		template: `<FButton @click="open">Open with useFModal</FButton>`,
	}),
};
