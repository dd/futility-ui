import { computed } from 'vue';

import FButton from '@/FButton';

import { ICON_TYPES } from '../constants';
import { useFModalDialog } from '../useFModalDialog';


export default {
	title: 'FModal/Layouts/FMLayoutDialog/useFModalDialog',
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		message: {
			control: 'text',
			description: 'HTML message content shown in the dialog body.',
			table: {
				category: 'options',
				type: { summary: 'string' },
			},
		},
		icon: {
			control: 'select',
			options: [ undefined, ...ICON_TYPES ],
			description: 'Preset icon type. Also determines the apply button color: `success` → green, `error` → red.',
			table: {
				category: 'options',
				type: { summary: ICON_TYPES.join(' | ') },
			},
		},
		apply: {
			control: 'text',
			description: 'Apply button label.',
			table: {
				category: 'options',
				type: { summary: 'string' },
				defaultValue: { summary: 'Ok' },
			},
		},
		cancel: {
			control: 'text',
			description: 'Cancel button label.',
			table: {
				category: 'options',
				type: { summary: 'string' },
				defaultValue: { summary: 'Cancel' },
			},
		},
		applyDisabled: {
			control: 'boolean',
			description: 'Disable the apply button.',
			table: {
				category: 'options',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		cancelDisabled: {
			control: 'boolean',
			description: 'Disable the cancel button.',
			table: {
				category: 'options',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onApply: {
			action: 'apply',
			description: 'Called when the apply button is clicked. Receives `{ close }` so you can close the dialog after your action.',
			table: {
				category: 'options',
				type: { summary: '({ close }) => void' },
			},
		},
		onCancel: {
			action: 'cancel',
			description: 'Called when the cancel button is clicked. Defaults to `close()` if not provided.',
			table: {
				category: 'options',
				type: { summary: '({ close }) => void' },
			},
		},
	},
	args: {
		icon: 'warning',
		message: '<p>Are you sure you want to delete this item? <br>This action cannot be undone.</p>',
		apply: 'Yes, delete',
		cancel: 'No, cancel',
		applyDisabled: false,
		cancelDisabled: false,
	},
};


export const Default = {
	render: (args) => ({
		components: { FButton },
		setup() {
			const { open } = useFModalDialog(computed(() => ({
				...args,
				onApply: ({ close }) => { args.onApply(); close(); },
				onCancel: ({ close }) => { args.onCancel(); close(); },
			})));
			return { open };
		},
		template: `<FButton @click="open">Open Dialog</FButton>`,
	}),
};


export const Icons = {
	parameters: {
		docs: {
			description: { story: 'Apply button color changes automatically based on the icon type.' },
		},
	},
	render: () => ({
		components: { FButton },
		setup() {
			const VARIANTS = [
				{ icon: 'info',    label: 'Info',    message: '<p>Your session will expire in 5 minutes.</p>' },
				{ icon: 'success', label: 'Success', message: '<p>Are you sure you want to publish?</p>' },
				{ icon: 'warning', label: 'Warning', message: '<p>This will overwrite existing data.</p>' },
				{ icon: 'error',   label: 'Error',   message: '<p>This action cannot be undone. Delete anyway?</p>' },
			];
			const dialogs = VARIANTS.map(({ icon, message, label }) => {
				const { open } = useFModalDialog({
					icon,
					message,
					apply: 'Confirm',
					cancel: 'Cancel',
					onApply: ({ close }) => close(),
				});
				return { label, open };
			});
			return { dialogs };
		},
		template: `
			<div style="display:flex;gap:8px;flex-wrap:wrap">
				<FButton
					v-for="d in dialogs"
					:key="d.label"
					@click="d.open()"
				>{{ d.label }}</FButton>
			</div>
		`,
	}),
};
