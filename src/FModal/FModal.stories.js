import { h, ref } from 'vue';

import FButton from '@/FButton';
import FInput from '@/forms/FInput';
import Readme from './README.md?raw';
import FModal from './index.vue';
import { useFModal } from './useFModal';
import FMLayoutDefault from './layouts/FMLayoutDefault';
import FMLayoutForm from './layouts/FMLayoutForm';
import FMLayoutDialog from './layouts/FMLayoutDialog';


export default {
	title: 'FModal',
	component: FModal,
	tags: [ 'autodocs' ],
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: Readme.replace(/^# .+\n?/m, '') },
		},
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
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
	},
};


export const Default = {
	// name: 'v-model',
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


const PROGRAMMATIC_DESC = `\`useFModal\` lets you create and open a modal programmatically, without
\`v-model\` or a layout component in the template. Instead, define the layout, props, and slots in
the constructor.

\`\`\`js
import { h } from 'vue';
import { useFModal, FMLayoutDefault, FButton } from 'futility-ui';

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

open();
\`\`\``;


export const Programmatic = {
	name: 'useFModal',
	parameters: {
		docs: {
			description: { story: PROGRAMMATIC_DESC },
		},
	},
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
