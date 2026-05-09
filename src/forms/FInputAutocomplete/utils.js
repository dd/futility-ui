import { computed, ref } from 'vue';
import { defaultWindow, unrefElement, useActiveElement, useEventListener } from '@vueuse/core';


const EVENT_FOCUS_IN = 'focusin';
const EVENT_FOCUS_OUT = 'focusout';

/**
 * Track if focus is contained within the target element
 *
 * This is a copy of the VueUse implementation with an additional
 * `relatedTargets` parameter to prevent losing focus when switching
 * between elements inside the target. (In such cases, a `focusout` event fires on the first
 * element, followed by a `focusin` event on the second one.)
 *
 * @see https://vueuse.org/useFocusWithin
 * @param target The target element to track
 * @param options Focus within options
 */
export function useFocusWithin(target, options = {}, relatedTargets) {
	const { window = defaultWindow } = options;
	const targetElement = computed(() => unrefElement(target));
	const relatedTargetElements = computed(() => unrefElement(relatedTargets));
	const _focused = ref(false);
	const focused = computed(() => _focused.value);
	const activeElement = useActiveElement(options);

	if (!window || !activeElement.value) {
		return { focused };
	}

	useEventListener(targetElement, EVENT_FOCUS_IN, () => _focused.value = true);
	useEventListener(targetElement, EVENT_FOCUS_OUT, (event) => {
		// If focus moves to an element from the dropdown, keep focus state
		if (!relatedTargetElements.value.includes(event.relatedTarget)) {
			_focused.value = false;
		}
	});

	return { focused };
};
