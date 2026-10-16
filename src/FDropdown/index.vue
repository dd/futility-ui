<template>
	<span
		v-if="!props.triggerRef"
		ref="triggerWrapperRef"
		style="display: contents;"
	>
		<slot
			name="trigger"
			:open="isOpen"
			:toggle="toggle"
			:trigger-attrs="triggerAttrs"
		/>
	</span>

	<Teleport :to="teleportTo">
		<Transition name="fui-dropdown">
			<div
				v-if="isOpen"
				ref="floatingRef"
				v-bind="$attrs"
				:id="floatingId"
				:class="[
					'fui-dropdown',
					{
						[`fui-dd-appearance-${appearance}`]: appearance,
						'is-match-trigger-width': matchTriggerWidth,
					},
				]"
				:data-placement="currentPlacement"
				:style="floatingStyles"
				@mouseenter="onFloatingMouseEnter"
				@mouseleave="onFloatingMouseLeave"
				@focusout="onFocusOut"
			>
				<slot :close="close" :open="open" />
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, isRef, useAttrs, useId } from 'vue';
import {
	useFloating,
	flip,
	shift,
	size,
	offset as middlewareOffset,
	autoUpdate,
} from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';

import { PLACEMENT_CHOICES, OPEN_ON_CHOICES } from './constants';


defineOptions({ name: 'FDropdown', inheritAttrs: false });

/** Minimal gap between the floating panel and the viewport edges. */
const VIEWPORT_PADDING = 8;

const isOpen = defineModel('open', { type: Boolean, default: false });
const props = defineProps({
	/** Placement of the floating panel relative to the trigger. */
	placement: {
		type: String,
		default: 'bottom-start',
		validator: (placement) => PLACEMENT_CHOICES.includes(placement),
	},

	/**
	 * What opens the dropdown.
	 * - `click` - toggles on click
	 * - `hover` - opens on mouseenter or focus, closes on mouseleave or focus loss
	 * - `manual` - controlled exclusively via `v-model:open`
	 */
	openOn: {
		type: String,
		default: 'click',
		validator: (openOn) => OPEN_ON_CHOICES.includes(openOn),
	},

	/** @deprecated Renamed to `openOn`. */
	trigger: {
		type: String,
		default: undefined,
		validator: (trigger) => OPEN_ON_CHOICES.includes(trigger),
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

	/**
	 * External trigger element. When provided, the `trigger` slot is not rendered
	 * and this element is used as the anchor instead.
	 * Accepts an `HTMLElement`, a Vue component instance, or a template ref object.
	 */
	triggerRef: {
		type: Object,
		default: null,
	},

	/** Makes the floating panel match the trigger width. */
	matchTriggerWidth: {
		type: Boolean,
		default: false,
	},

	/**
	 * Whether clicking outside closes the dropdown.
	 *
	 * By default this is enabled for `click`/`hover` and disabled for `manual`
	 * `openOn` for backwards compatibility. Pass an explicit boolean to
	 * override that behavior.
	 */
	closeOnOutside: {
		type: Boolean,
		default: null,
	},
});
const emit = defineEmits([ 'show', 'hide' ]);

// TODO: remove `trigger` together with the deprecation warning
const openOn = computed(() => props.trigger ?? props.openOn);

let warnedAboutTrigger = false;

watch(() => props.trigger, (trigger) => {
	if (trigger === undefined || warnedAboutTrigger) return;

	warnedAboutTrigger = true;
	console.warn(
		'[futility-ui] FDropdown `trigger` prop is deprecated, use `open-on` instead.',
	);
}, { immediate: true });

const triggerWrapperRef = ref(null);
const floatingRef = ref(null);

const resolveEl = (value) => {
	const target = isRef(value) ? value.value : value; // template ref object
	if (!target) return null;
	return target.$el ?? target; // component instance or raw HTMLElement
};

const triggerEl = computed(() =>
	props.triggerRef
		? resolveEl(props.triggerRef)
		: (triggerWrapperRef.value?.firstElementChild ?? null),
);

const focusTrigger = () => {
	const element = triggerEl.value;
	if (!element) return;

	const focusTarget = element.matches?.(
		'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
	)
		? element
		: element.querySelector?.(
			'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
		);

	// Returning focus must not reopen a hover dropdown via `focusin`
	isRestoringFocus = true;
	focusTarget?.focus();
	isRestoringFocus = false;
};

const { floatingStyles, placement: currentPlacement } = useFloating(
	triggerEl,
	floatingRef,
	{
		strategy: 'fixed',
		placement: computed(() => props.placement),
		middleware: computed(() => [
			middlewareOffset(props.offset),
			flip({ padding: VIEWPORT_PADDING }),
			shift({ padding: VIEWPORT_PADDING }),
			// Exposes geometry as CSS variables, styles decide how to use them:
			// `max-height` and `.is-match-trigger-width` in style.tailwind.css.
			size({
				padding: VIEWPORT_PADDING,
				apply({ availableHeight, rects, elements }) {
					const { style } = elements.floating;
					style.setProperty('--fui-dropdown-available-height', `${Math.max(0, availableHeight)}px`);
					style.setProperty('--fui-dropdown-trigger-width', `${rects.reference.width}px`);
				},
			}),
		]),
		whileElementsMounted: autoUpdate,
	},
);


// Accessibility: panel id + attributes for the trigger element
const attrs = useAttrs();
const autoId = useId();
const floatingId = computed(() => attrs.id ?? `fui-dropdown-${autoId}`);

const triggerAttrs = computed(() => ({
	'aria-expanded': String(isOpen.value),
	'aria-controls': isOpen.value ? floatingId.value : undefined,
}));

const shouldCloseOnOutside = computed(() =>
	props.closeOnOutside ?? openOn.value !== 'manual'
);


const open = () => {
	if (props.disabled) return;
	cancelHide();
	isOpen.value = true;
};

const close = () => {
	cancelHide();
	isOpen.value = false;
};

// Emitted from the state itself, so `v-model:open` changes from outside are covered too.
watch(isOpen, (value) => emit(value ? 'show' : 'hide'));

watch(() => props.disabled, (disabled) => {
	if (disabled) close();
});

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
	if (openOn.value === 'hover') {
		cancelHide();
	}
};

const onFloatingMouseLeave = () => {
	if (openOn.value === 'hover') {
		scheduleHide();
	}
};

// Hover trigger, keyboard: open on focus, hide when focus leaves trigger and panel
let isRestoringFocus = false;

const onTriggerFocusIn = () => {
	if (!isRestoringFocus) open();
};

const onFocusOut = (event) => {
	if (openOn.value !== 'hover') return;

	const next = event.relatedTarget;
	if (next && (triggerEl.value?.contains(next) || floatingRef.value?.contains(next))) return;
	scheduleHide();
};


// Trigger event listeners
const setupTriggers = (el) => {
	if (!el) return;

	if (openOn.value === 'click') {
		el.addEventListener('click', toggle);
	} else if (openOn.value === 'hover') {
		el.addEventListener('mouseenter', open);
		el.addEventListener('mouseleave', scheduleHide);
		el.addEventListener('focusin', onTriggerFocusIn);
		el.addEventListener('focusout', onFocusOut);
	}
};

const cleanupTriggers = (el) => {
	if (!el) return;
	el.removeEventListener('click', toggle);
	el.removeEventListener('mouseenter', open);
	el.removeEventListener('mouseleave', scheduleHide);
	el.removeEventListener('focusin', onTriggerFocusIn);
	el.removeEventListener('focusout', onFocusOut);
};

watch(
	triggerEl,
	(newEl, oldEl) => {
		cleanupTriggers(oldEl);
		if (openOn.value !== 'manual') {
			setupTriggers(newEl);
		}
	},
	{ immediate: true, flush: 'post' },
);

watch(
	openOn,
	(newOpenOn, oldOpenOn) => {
		if (oldOpenOn !== 'manual') cleanupTriggers(triggerEl.value);
		if (newOpenOn !== 'manual') setupTriggers(triggerEl.value);
	},
);


// Close on click outside when enabled for the selected `openOn` mode.
onMounted(() => {
	onClickOutside(
		floatingRef,
		(event) => {
			if (!shouldCloseOnOutside.value) return;
			if (triggerEl.value?.contains(event.target)) return;
			close();
		},
	);
});

// Close on Escape
const handleKeydown = (event) => {
	if (event.key === 'Escape' && isOpen.value) {
		close();
		focusTrigger();
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
