import { h, markRaw } from 'vue';
import { useModal } from 'vue-final-modal';
import FModal from './index.vue';


/**
 * Programmatically open a modal with any layout component, without a template.
 *
 * @param {Component} LayoutComponent - FMLayoutDefault, FMLayoutDialog, FMLayoutForm, or custom.
 * @param {object} [options]
 * @param {object} [options.props]   - Props passed to LayoutComponent.
 * @param {object} [options.slots]   - Slots for LayoutComponent. Each value is a function
 *                                     receiving `{ close }` and returning vnodes.
 * @param {object} [options.modal]   - Props passed to FModal (transport).
 *
 * @returns vue-final-modal UseModalReturnType: { open, close, patchOptions, destroy }
 *
 * @example
 * const { open } = useFModal(FMLayoutDialog, {
 *   props: { icon: 'error', color: true },
 *   slots: {
 *     default: () => h('p', 'Delete this item?'),
 *     controls: ({ close }) => [
 *       h(FButton, { design: 'outline', onClick: close }, () => 'Cancel'),
 *       h(FButton, { color: 'red', onClick: close }, () => 'Delete'),
 *     ],
 *   },
 * })
 */
export function useFModal(LayoutComponent, options = {}) {
	const { props = {}, slots = {}, modal: modalProps = {} } = options;

	// Indirection so `close` in slot fns always calls the final instance.close
	const closeRef = { fn: null };
	const close = () => closeRef.fn?.();

	const slotFns = Object.fromEntries(
		Object.entries(slots).map(([ name, slot ]) => [
			name,
			typeof slot === 'function' ? () => slot({ close }) : () => slot,
		]),
	);

	const innerComponent = markRaw({
		name: 'FModalInner',
		setup() {
			return () => h(
				LayoutComponent,
				{ ...props, onClose: close },
				Object.keys(slotFns).length ? slotFns : undefined,
			);
		},
	});

	const instance = useModal({
		component: FModal,
		attrs: modalProps,
		slots: { default: innerComponent },
	});

	closeRef.fn = instance.close;

	return instance;
}
