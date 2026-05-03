<template>
	<span
		ref="triggerWrapperRef"
		style="display: contents;"
	>
		<slot name="trigger" :open="isOpen" :toggle="toggle" />
	</span>

	<Teleport :to="teleportTo">
		<Transition name="fui-dropdown">
			<div
				v-if="isOpen"
				ref="floatingRef"
				v-bind="$attrs"
				:class="[
					'fui-dropdown',
					{ [`fui-dd-appearance-${appearance}`]: appearance },
				]"
				:data-placement="currentPlacement"
				:style="floatingStyles"
				@mouseenter="onFloatingMouseEnter"
				@mouseleave="onFloatingMouseLeave"
			>
				<slot :close="close" :open="open" />
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import {
	useFloating,
	flip,
	shift,
	offset as middlewareOffset,
	autoUpdate,
} from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';

import { PLACEMENT_CHOICES, TRIGGER_CHOICES } from './constants';


defineOptions({ name: 'FDropdown', inheritAttrs: false });

const isOpen = defineModel('open', { type: Boolean, default: false });
const props = defineProps({
	/** Placement of the floating panel relative to the trigger. */
	placement: {
		type: String,
		default: 'bottom-start',
		validator: (placement) => PLACEMENT_CHOICES.includes(placement),
	},

	/**
	 * What triggers the dropdown.
	 * - `click` - toggles on click
	 * - `hover` - opens on mouseenter, closes on mouseleave
	 * - `manual` - controlled exclusively via `v-model:open`
	 */
	trigger: {
		type: String,
		default: 'click',
		validator: (trigger) => TRIGGER_CHOICES.includes(trigger),
	},

	/**
	 * Visual preset that controls inner padding and item layout.
	 * Built-in values: `select` (all-around padding, for option lists),
	 * `menu` (vertical padding only, for action menus).
	 *
	 * A custom string can be passed - it will be applied as `fui-dd-appearance-{value}`,
	 * so you can define your own styles against that class.
	 *
	 * When omitted, no layout or padding is applied - the content slot is rendered as-is.
	 */
	appearance: {
		type: String,
	},

	/** Distance in pixels between the trigger element and the floating panel. */
	offset: {
		type: Number,
		default: 8,
	},

	/** Prevents the dropdown from opening when `true`. */
	disabled: {
		type: Boolean,
		default: false,
	},

	/**
	 * Target element for `<Teleport>`.
	 * Accepts any valid CSS selector or a DOM element.
	 */
	teleportTo: {
		type: [ String, Object ],
		default: 'body',
	},
});
const emit = defineEmits([ 'show', 'hide' ]);

const triggerWrapperRef = ref(null);
const floatingRef = ref(null);

const triggerEl = computed(() => triggerWrapperRef.value?.firstElementChild ?? null);

const { floatingStyles, placement: currentPlacement } = useFloating(
	triggerEl,
	floatingRef,
	{
		strategy: 'fixed',
		placement: computed(() => props.placement),
		middleware: computed(() => [
			middlewareOffset(props.offset),
			flip(),
			shift({ padding: 8 }),
		]),
		whileElementsMounted: autoUpdate,
	},
);


const open = () => {
	if (props.disabled) return;
	isOpen.value = true;
	emit('show');
};

const close = () => {
	isOpen.value = false;
	emit('hide');
};

const toggle = () => {
	if (isOpen.value) {
		close();
	} else {
		open();
	}
};


// Hover trigger: cancel close when cursor enters the floating element
let hideTimer = null;

const scheduleHide = () => {
	clearTimeout(hideTimer);
	hideTimer = setTimeout(close, 100);
};

const cancelHide = () => {
	clearTimeout(hideTimer);
};

const onFloatingMouseEnter = () => {
	if (props.trigger === 'hover') {
		cancelHide();
	}
};

const onFloatingMouseLeave = () => {
	if (props.trigger === 'hover') {
		scheduleHide();
	}
};


// Trigger event listeners
const setupTriggers = (el) => {
	if (!el) return;

	if (props.trigger === 'click') {
		el.addEventListener('click', toggle);
	} else if (props.trigger === 'hover') {
		el.addEventListener('mouseenter', open);
		el.addEventListener('mouseleave', scheduleHide);
	}
};

const cleanupTriggers = (el) => {
	if (!el) return;
	el.removeEventListener('click', toggle);
	el.removeEventListener('mouseenter', open);
	el.removeEventListener('mouseleave', scheduleHide);
};

watch(
	triggerEl,
	(newEl, oldEl) => {
		cleanupTriggers(oldEl);
		if (props.trigger !== 'manual') {
			setupTriggers(newEl);
		}
	},
	{ immediate: true, flush: 'post' },
);

watch(
	() => props.trigger,
	(newTrigger, oldTrigger) => {
		if (oldTrigger !== 'manual') cleanupTriggers(triggerEl.value);
		if (newTrigger !== 'manual') setupTriggers(triggerEl.value);
	},
);


// Close on click outside (not for manual trigger - caller controls open/close)
onMounted(() => {
	onClickOutside(
		floatingRef,
		(event) => {
			if (props.trigger === 'manual') return;
			if (triggerEl.value?.contains(event.target)) return;
			close();
		},
	);
});

// Close on Escape
const handleKeydown = (event) => {
	if (event.key === 'Escape' && isOpen.value) {
		close();
	}
};

onMounted(() => {
	document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
	clearTimeout(hideTimer);
	cleanupTriggers(triggerEl.value);
	document.removeEventListener('keydown', handleKeydown);
});
</script>
