// https://www.telerik.com/blogs/checking-vue-3-slots-emptiness

import { computed, Comment, Fragment, Text } from 'vue';


/**
 * Determines whether a slot is empty for Vue 3: https://github.com/vuejs/vue-next/issues/3056
 *
 * Adapted from https://github.com/vuejs/vue-next/blob/ca17162e377e0a0bf3fae9d92d0fdcb32084a9fe/packages/runtime-core/src/helpers/renderSlot.ts#L77
 *
 * @param {Function} slot - The slot $slot.name
 * @returns {Boolean}
 */
export const vNodeIsEmpty = vnodes => {
	return vnodes.every(node => {
		if (node.type === Comment) return true;

		if (node.type === Text && !node.children.trim()) return true;

		if (node.type === Fragment && vNodeIsEmpty(node.children)) {
			return true;
		}

		return false;
	});
};


/**
 * Returns true if a slot has no content
 *
 * @param {Function | Object} slot a Vue 3 slot function or a Vue 2 slot object
 * @returns {Boolean}
 */
export const isEmptySlot = slot => {
	if (!slot) return true;

	// if we get a slot that is not a function, we're in vue 2 and there is content, so it's not empty
	if (typeof(slot) !== 'function') return false;

	return vNodeIsEmpty(slot());
};


const useSlotUtils = (slot) => {
	const slotIsEmpty = computed(() => isEmptySlot(slot));
	return {
		slotIsEmpty,
	};
};

export default useSlotUtils;
