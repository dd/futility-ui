<template>
	<!--
		Transparent wrapper - display:contents makes it invisible to layout.
		triggerEl = first child = actual trigger element.
	-->
	<span
		v-if="!dirrectiveElement"
		ref="triggerWrapperRef"
		style="display: contents;"
	>
		<slot />
	</span>

	<Teleport :to="teleportTo">
		<Transition name="fui-tooltip">
			<div
				v-if="isOpen"
				:id="tooltipId"
				ref="floatingRef"
				class="fui-tooltip"
				:class="[
					`fui-tooltip-theme-${theme}`,
					{ 'fui-tooltip-non_interactive': nonInteractive },
				]"
				:data-placement="currentPlacement"
				:style="floatingStyles"
				role="tooltip"
				@mouseenter="onFloatingMouseEnter"
				@mouseleave="onFloatingMouseLeave"
			>
				<div ref="arrowRef" class="fui-tooltip-arrow" :style="arrowStyle" />
				<div class="fui-tooltip-content" >
					<slot name="content">{{ text }}</slot>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { ref, computed, watch, onUnmounted, useId } from 'vue';
import {
	useFloating,
	flip,
	shift,
	arrow as middlewareArrow,
	autoUpdate,
} from '@floating-ui/vue';

import { PLACEMENT_CHOICES, TRIGGER_CHOICES } from './constants';


defineOptions({ name: 'FTooltip', inheritAttrs: false });

/**
 * v-model:open - open/closed state of the tooltip.
 *
 * Works bidirectionally:
 * - triggers (hover, click, focus) update the parent value
 * - parent can close/open programmatically by setting the value
 *
 * With `trigger="manual"` the tooltip is controlled exclusively via v-model:open.
 */
const isOpen = defineModel('open', { type: Boolean, default: false });

const props = defineProps({
	/** Tooltip text (simple mode). For rich content use the _#content_ slot. */
	text: String,

	/** Placement relative to the reference element. */
	placement: {
		type: String,
		default: 'top',
		validator: (placement) => PLACEMENT_CHOICES.includes(placement),
	},

	/**
	 * Theme - applied as CSS class `fui-tooltip-theme-<theme>`.
	 * Pass any string to apply custom styles. Built-in: 'tooltip', 'tooltip-rich'.
	 */
	theme: {
		type: String,
		default: 'tooltip',
	},

	/**
	 * Show/hide delay in ms.
	 * Pass a number for equal delays, or `[showDelay, hideDelay]` for separate values.
	 */
	delay: {
		type: [ Number, Array ],
		default: 0,
	},

	/**
	 * What triggers the tooltip.
	 * - `hover` - mouseenter/mouseleave + focus/blur
	 * - `click` - toggles on click
	 * - `hover&click` - shows on hover, click pins it open so it stays visible after the cursor leaves
	 * - `focus` - focus/blur only
	 * - `manual` - controlled exclusively via v-model:open
	 */
	trigger: {
		type: String,
		default: 'hover',
		validator: (trigger) => TRIGGER_CHOICES.includes(trigger),
	},

	/** Make tooltip not interactive. */
	nonInteractive: {
		type: Boolean,
		default: false,
	},

	/**
	 * Target element for Teleport.
	 * Accepts any valid CSS selector or a DOM element.
	 * Useful when `body` is not the right stacking context - e.g. inside a modal.
	 */
	teleportTo: {
		type: [ String, Object ],
		default: 'body',
	},

	/**
	 * Reference element for the tooltip - used internally by the `v-tooltip` directive.
	 * When provided, the slot wrapper is not rendered and this element is used as the trigger directly.
	 * Do not set this prop manually; use the directive or the default slot instead.
	 */
	dirrectiveElement: {
		type: Object,
		default: null,
	},
});

const emit = defineEmits([ 'show', 'hide' ]);

// DOM refs
const triggerWrapperRef = ref(null);
const floatingRef = ref(null);
const arrowRef = ref(null);

// The actual trigger element (first child of the transparent wrapper)
const triggerEl = computed(() => props.dirrectiveElement ?? triggerWrapperRef.value?.firstElementChild ?? null);

// Unique ID for aria-describedby
const tooltipId = useId();


// Floating UI
const { floatingStyles, placement: currentPlacement, middlewareData } = useFloating(
	triggerEl,
	floatingRef,
	{
		placement: computed(() => props.placement),
		middleware: computed(() => {
			return [
				flip(),
				shift({ padding: 8 }),
				middlewareArrow({ element: arrowRef }),
			];
		}),
		whileElementsMounted: autoUpdate,
	},
);


// Show / hide logic
let showTimer = null;
let hideTimer = null;

const getDelays = () => {
	const d = props.delay;
	return Array.isArray(d) ? d : [ d, d ];
};

const doShow = () => {
	isOpen.value = true;
	emit('show');
};

const doHide = () => {
	isOpen.value = false;
	emit('hide');
};

const scheduleShow = () => {
	clearTimeout(hideTimer);
	showTimer = setTimeout(doShow, getDelays()[0] || 0);
};

const scheduleHide = () => {
	if (pinTooltip.value) return;
	clearTimeout(showTimer);
	hideTimer = setTimeout(doHide, getDelays()[1] || 0);
};

const toggle = () => {
	if (isOpen.value) {
		scheduleHide();
	} else {
		scheduleShow();
	}
};


// Interactive: cancel hide when cursor enters the floating element
const onFloatingMouseEnter = () => {
	if (!props.nonInteractive) {
		clearTimeout(hideTimer);
	}
};

const onFloatingMouseLeave = () => {
	if (!props.nonInteractive) {
		scheduleHide();
	}
};


// Pin tooltip
const pinTooltip = ref(false);
const pinToggle = () => {
	pinTooltip.value = !pinTooltip.value;
};


// Trigger event listeners (attached imperatively to the reference element)
const setupTriggers = (el) => {
	if (!el) return;

	if (props.trigger === 'hover') {
		el.addEventListener('mouseenter', scheduleShow);
		el.addEventListener('mouseleave', scheduleHide);
		el.addEventListener('focus', scheduleShow);
		el.addEventListener('blur', scheduleHide);

	} else if (props.trigger === 'click') {
		el.addEventListener('click', toggle);

	} else if (props.trigger === 'hover&click') {
		el.addEventListener('mouseenter', scheduleShow);
		el.addEventListener('mouseleave', scheduleHide);
		el.addEventListener('focus', scheduleShow);
		el.addEventListener('blur', scheduleHide);
		el.addEventListener('click', pinToggle);

	} else if (props.trigger === 'focus') {
		el.addEventListener('focus', scheduleShow);
		el.addEventListener('blur', scheduleHide);
	}
};

const cleanupTriggers = (el) => {
	if (!el) return;

	el.removeEventListener('mouseenter', scheduleShow);
	el.removeEventListener('mouseleave', scheduleHide);
	el.removeEventListener('focus', scheduleShow);
	el.removeEventListener('blur', scheduleHide);
	el.removeEventListener('click', toggle);
	el.removeEventListener('click', pinToggle);
};

watch(
	triggerEl,
	(newEl, oldEl) => {
		cleanupTriggers(oldEl);

		if (props.trigger !== 'manual') {
			setupTriggers(newEl);
		}
	},
	{ immediate: true },
);

watch(
	() => props.trigger,
	(newTrigger, oldTrigger) => {
		if (oldTrigger !== 'manual') cleanupTriggers(triggerEl.value);
		if (newTrigger !== 'manual') setupTriggers(triggerEl.value);
	},
);


// aria-describedby - set on the reference element while tooltip is open
watch(
	isOpen,
	(open) => {
		const el = triggerEl.value;
		if (!el) return;

		if (open) {
			el.setAttribute('aria-describedby', tooltipId);
		} else {
			el.removeAttribute('aria-describedby');
		}
	}
);

onUnmounted(() => {
	clearTimeout(showTimer);
	clearTimeout(hideTimer);
	cleanupTriggers(triggerEl.value);
});


// Arrow positioning style
const arrowStyle = computed(() => {
	const data = middlewareData.value.arrow;
	const result = {};
	if (data?.x != null) {
		result.left = `${data.x}px`;
	}
	if (data?.y != null) {
		result.top = `${data.y}px`;
	}
	return result;
});
</script>
