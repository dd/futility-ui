<template>
	<header
		ref="rootRef"
		v-bind="$attrs"
		:class="[
			'fui-header',
			`fui-header-appearance-${appearance}`,
			{
				'is-balanced': balanced,
				'is-mobile': isMobile,
				'is-menu-open': menuVisible,
			},
		]"
	>
		<FHeaderRegion v-if="hasTopContent" :context="context" region="top">
			<div class="fui-header-row is-top">
				<div class="fui-header-content fui-header-row-content">
					<slot name="top" v-bind="topSlotProps" />
				</div>
			</div>
		</FHeaderRegion>

		<FHeaderRegion :context="context" region="bar">
			<div class="fui-header-bar">
				<div class="fui-header-content fui-header-bar-content">
					<div v-if="$slots.left" class="fui-header-section is-left">
						<slot name="left" v-bind="barSlotProps" />
					</div>

					<div v-if="$slots.center" class="fui-header-section is-center">
						<slot name="center" v-bind="barSlotProps" />
					</div>

					<div v-if="$slots.right" class="fui-header-section is-right">
						<slot name="right" v-bind="barSlotProps" />
					</div>
				</div>
			</div>
		</FHeaderRegion>

		<FHeaderRegion v-if="hasBottomContent" :context="context" region="bottom">
			<div class="fui-header-row is-bottom">
				<div class="fui-header-content fui-header-row-content">
					<slot name="bottom" v-bind="bottomSlotProps" />
				</div>
			</div>
		</FHeaderRegion>

		<Teleport :to="teleportTo">
			<Transition name="fui-header-menu">
				<div
					v-if="menuVisible"
					:class="[
						'fui-header-menu-layer',
						`fui-header-appearance-${appearance}`,
					]"
					:style="{ '--fui-header-menu-top': `${menuTop}px` }"
				>
					<FHeaderRegion :context="context" region="menu">
						<div
							:id="menuId"
							ref="menuRef"
							class="fui-header-menu"
							role="dialog"
							aria-modal="true"
							tabindex="-1"
						>
							<div class="fui-header-menu-body">
								<slot name="menu" v-bind="menuSlotProps" />
							</div>

							<div v-if="$slots['menu-bottom']" class="fui-header-menu-bottom">
								<slot name="menu-bottom" v-bind="menuSlotProps" />
							</div>
						</div>
					</FHeaderRegion>
				</div>
			</Transition>
		</Teleport>
	</header>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, useSlots, watch } from 'vue';
import { useScrollLock } from '@vueuse/core';

import { isEmptySlot } from '@/composables/slot';

import { HEADER_APPEARANCE_CHOICES } from './constants';
import FHeaderRegion from './FHeaderRegion.vue';


defineOptions({ name: 'FHeader', inheritAttrs: false });


const menuOpen = defineModel('menuOpen', { type: Boolean, default: false });

const props = defineProps({
	/** Container width below which the header switches to the mobile mode. */
	breakpoint: {
		type: Number,
		default: 768,
	},

	/**
	 * Color scheme of the header:
	 * - `auto` - follows the page color scheme
	 * - `light` / `dark` - pins the scheme regardless of the page theme
	 */
	appearance: {
		type: String,
		default: 'auto',
		validator: (value) => HEADER_APPEARANCE_CHOICES.includes(value),
	},

	/**
	 * Gives the side sections equal width, so `#center` content sits at the
	 * exact center of the bar. Trade-off: a nav in a side section gets less
	 * room and moves items behind the overflow button earlier.
	 */
	balanced: {
		type: Boolean,
		default: false,
	},

	/** Target element for the mobile menu teleport. */
	teleportTo: {
		type: [ String, Object ],
		default: 'body',
	},
});

const emit = defineEmits([ 'menu-open', 'menu-close' ]);


const slots = useSlots();

const rootRef = ref(null);
const menuRef = ref(null);
const rootWidth = ref(0);
const menuTop = ref(0);
const menuId = `fui-header-menu-${Math.random().toString(36).slice(2)}`;

let resizeObserver = null;
let lastFocusedElement = null;

const scrollLock = useScrollLock(typeof document !== 'undefined' ? document.body : null);


const isMobile = computed(() =>
	rootWidth.value > 0 && rootWidth.value < props.breakpoint,
);

const menuVisible = computed(() => isMobile.value && menuOpen.value);

const hasMenuContent = computed(() => {
	if (slots.menu && !isEmptySlot(() => slots.menu(menuSlotProps.value))) return true;
	return Boolean(slots['menu-bottom']);
});

const hasTopContent = computed(() =>
	Boolean(slots.top) && !isEmptySlot(() => slots.top(topSlotProps.value)),
);

const hasBottomContent = computed(() =>
	Boolean(slots.bottom) && !isEmptySlot(() => slots.bottom(bottomSlotProps.value)),
);


const openMenu = () => {
	menuOpen.value = true;
};

const closeMenu = () => {
	menuOpen.value = false;
};

const toggleMenu = () => {
	menuOpen.value = !menuOpen.value;
};


const context = {
	isMobile,
	menuOpen,
	hasMenuContent,
	menuId,
	appearance: computed(() => props.appearance),
	openMenu,
	closeMenu,
	toggleMenu,
};

const makeSlotProps = (region) => computed(() => ({
	region,
	isMobile: isMobile.value,
	menuOpen: menuOpen.value,
	openMenu,
	closeMenu,
	toggleMenu,
}));

const topSlotProps = makeSlotProps('top');
const barSlotProps = makeSlotProps('bar');
const bottomSlotProps = makeSlotProps('bottom');
const menuSlotProps = makeSlotProps('menu');


const updateMenuTop = () => {
	menuTop.value = Math.max(0, rootRef.value?.getBoundingClientRect().bottom ?? 0);
};

const updateRootWidth = () => {
	rootWidth.value = rootRef.value?.clientWidth ?? 0;

	if (menuVisible.value) {
		updateMenuTop();
	}
};


const onKeydown = (event) => {
	if (event.key === 'Escape' && menuVisible.value) {
		closeMenu();
	}
};


watch(menuVisible, async (visible) => {
	scrollLock.value = visible;

	if (visible) {
		updateMenuTop();
		lastFocusedElement = document.activeElement;
		await nextTick();
		menuRef.value?.focus({ preventScroll: true });
	} else if (lastFocusedElement?.isConnected) {
		lastFocusedElement.focus({ preventScroll: true });
		lastFocusedElement = null;
	}
});

watch(isMobile, (value) => {
	if (!value) {
		menuOpen.value = false;
	}
});

watch(menuOpen, (value) => {
	emit(value ? 'menu-open' : 'menu-close');
});


onMounted(() => {
	updateRootWidth();
	document.addEventListener('keydown', onKeydown);

	if (typeof ResizeObserver !== 'undefined') {
		resizeObserver = new ResizeObserver(updateRootWidth);
		if (rootRef.value) resizeObserver.observe(rootRef.value);
	}
});

onUnmounted(() => {
	resizeObserver?.disconnect();
	document.removeEventListener('keydown', onKeydown);
	scrollLock.value = false;
});
</script>
