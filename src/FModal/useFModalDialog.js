import { h } from 'vue';

import FButton from '@/FButton';

import FMLayoutDialog from './layouts/FMLayoutDialog';
import { useFModal } from './useFModal';


const ICON_COLOR_MAP = {
	success: 'green',
	error: 'red',
};

/**
 * Shortcut for typical confirmation/alert dialogs.
 *
 * @param {object} options
 * @param {string} options.message        - HTML message content.
 * @param {string} [options.icon]         - Icon type: info, success, warning, error.
 * @param {string} [options.apply]        - Apply button text (default: "Ok").
 * @param {string} [options.cancel]       - Cancel button text (default: "Cancel").
 * @param {boolean} [options.applyDisabled]
 * @param {boolean} [options.cancelDisabled]
 * @param {Function} [options.onApply]    - Called on apply click, receives { close }.
 * @param {Function} [options.onCancel]   - Called on cancel click, receives { close }.
 * @param {object} [options.modal]        - Extra props for FModal (clickToClose, escToClose, etc).
 *
 * @returns { open, close, patchOptions, destroy }
 *
 * @example
 * const { open, close } = useFModalDialog({
 *   icon: 'warning',
 *   message: '<p>Are you sure you want to delete this item?</p>',
 *   apply: 'Yes, delete',
 *   cancel: 'No, cancel',
 *   onApply: ({ close }) => { doDelete(); close(); },
 * });
 * open();
 */
export function useFModalDialog(options = {}) {
	const {
		message,
		icon,
		apply,
		cancel,
		applyDisabled = false,
		cancelDisabled = false,
		onApply,
		onCancel,
		modal: modalProps = {},
	} = options;

	const buttonColor = ICON_COLOR_MAP[icon] || 'primary';

	return useFModal(FMLayoutDialog, {
		props: {
			icon,
			color: true,
		},
		slots: {
			default: () => h('div', { innerHTML: message }),
			controls: ({ close }) => [
				h(FButton, {
					color: buttonColor,
					disabled: applyDisabled,
					size: 's',
					onClick: () => (onApply ? onApply({ close }) : close()),
				}, () => apply || 'Ok'),
				h(FButton, {
					design: 'outline',
					color: 'gray-200',
					disabled: cancelDisabled,
					size: 's',
					onClick: () => (onCancel ? onCancel({ close }) : close()),
				}, () => cancel || 'Cancel'),
			],
		},
		modal: modalProps,
	});
}
