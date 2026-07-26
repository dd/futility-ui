<template>
	<nav
		v-if="!hiddenOnBar"
		:ref="renderMode === 'bar' ? setHostRef : undefined"
		v-bind="$attrs"
		:class="[ 'fui-header-nav', `is-${renderMode}` ]"
	>
		<template v-if="renderMode === 'bar'">
			<FHeaderNavItems
				:items="visibleItems"
				:open-index="openIndex"
				:dropdown-trigger="dropdownTrigger"
				:dropdown-placement="dropdownPlacement"
				:dropdown-offset="dropdownOffset"
				:appearance="panelAppearance"
				:teleport-to="teleportTo"
				:link-component="resolvedLinkComponent"
				@update:open-index="openIndex = $event"
				@item-click="forwardItemClick"
				@dropdown-open="emit('dropdown-open', $event)"
				@dropdown-close="emit('dropdown-close', $event)"
			>
				<template v-if="hasOverflow" #after>
					<FDropdown
						v-model:open="overflowOpen"
						:trigger="dropdownTrigger"
						:placement="dropdownPlacement"
						:offset="dropdownOffset"
						:teleport-to="teleportTo"
						:class="[
							'fui-header-dropdown-panel',
							'fui-header-more-panel',
							`fui-header-dropdown-appearance-${panelAppearance}`,
						]"
					>
						<template #trigger>
							<button
								class="fui-header-more-button"
								type="button"
								:aria-label="moreLabel"
								:aria-expanded="String(overflowOpen)"
							>
								<FIcon name="dots_horizontal" />
							</button>
						</template>

						<template #default="{ close }">
							<FHeaderNavChildList
								:items="overflowItems"
								variant="accordion"
								path-prefix="overflow."
								:expanded-keys="expandedKeys"
								:close-list="close"
								:link-component="resolvedLinkComponent"
								@item-click="forwardItemClick"
								@toggle="toggleExpanded"
							/>
						</template>
					</FDropdown>
				</template>
			</FHeaderNavItems>

			<div
				ref="measureRef"
				class="fui-header-nav-measure"
				aria-hidden="true"
				inert
			>
				<template v-for="(item, index) in barItems" :key="index">
					<span
						v-if="item.itemComponent"
						class="fui-header-nav-measure-node"
						data-fui-header-measure-item
					>
						<component
							:is="item.itemComponent"
							v-bind="getMeasureItemArgs(item)"
							class="fui-header-item fui-header-custom-item"
						/>
					</span>

					<span
						v-else
						class="fui-header-item fui-header-nav-measure-node"
						data-fui-header-measure-item
					>
						{{ item.label }}
						<FIcon
							v-if="hasChildContent(item)"
							name="chevron_down"
							class="fui-header-item-arrow"
							aria-hidden="true"
						/>
					</span>
				</template>

				<button
					ref="measureMoreRef"
					class="fui-header-more-button"
					type="button"
					tabindex="-1"
				>
					<FIcon name="dots_horizontal" />
				</button>
			</div>
		</template>

		<FHeaderNavChildList
			v-else
			:items="items"
			variant="accordion"
			:expanded-keys="expandedKeys"
			:close-list="closeMenuList"
			:link-component="resolvedLinkComponent"
			@item-click="forwardItemClick"
			@toggle="toggleExpanded"
		/>
	</nav>
</template>

<script setup>
import {
	computed,
	getCurrentInstance,
	inject,
	nextTick,
	onMounted,
	onUnmounted,
	ref,
	watch,
} from 'vue';

import FDropdown from '@/FDropdown';
import FIcon from '@/FIcon';

import {
	FHEADER_CONTEXT_KEY,
	HEADER_DROPDOWN_PLACEMENT_CHOICES,
	HEADER_DROPDOWN_TRIGGER_CHOICES,
	HEADER_REGION_MENU,
} from './constants';
import FHeaderNavChildList from './FHeaderNavChildList.vue';
import FHeaderNavItems from './FHeaderNavItems.vue';
import {
	getComponentArgs,
	hasChildContent,
} from './utils';


defineOptions({ name: 'FHeaderNav', inheritAttrs: false });


const props = defineProps({
	/** Menu item tree. */
	items: {
		type: Array,
		default: () => [],
	},

	/**
	 * Component used to render internal links. When omitted, a globally
	 * registered `NuxtLink` or `RouterLink` is picked up automatically;
	 * pass `'a'` to force plain anchors.
	 */
	linkComponent: {
		type: [ Object, Function, String ],
		default: null,
	},

	/** Desktop dropdown trigger. */
	dropdownTrigger: {
		type: String,
		default: 'click',
		validator: (value) => HEADER_DROPDOWN_TRIGGER_CHOICES.includes(value),
	},

	/** Desktop dropdown placement. */
	dropdownPlacement: {
		type: String,
		default: 'bottom-start',
		validator: (value) => HEADER_DROPDOWN_PLACEMENT_CHOICES.includes(value),
	},

	/** Distance between a desktop trigger and its dropdown. */
	dropdownOffset: {
		type: Number,
		default: 8,
	},

	/** Visual preset for dropdown panels. Defaults to the FHeader appearance. */
	appearance: {
		type: String,
		default: null,
	},

	/** Target element for dropdown teleport. */
	teleportTo: {
		type: [ String, Object ],
		default: 'body',
	},

	moreLabel: {
		type: String,
		default: 'Show hidden navigation items',
	},
});

const emit = defineEmits([ 'item-click', 'dropdown-open', 'dropdown-close' ]);


const context = inject(FHEADER_CONTEXT_KEY, null);
const instance = getCurrentInstance();


const renderMode = computed(() =>
	context?.region === HEADER_REGION_MENU ? 'menu' : 'bar',
);

const hiddenOnBar = computed(() =>
	renderMode.value === 'bar' && Boolean(context?.isMobile),
);

const panelAppearance = computed(() =>
	props.appearance ?? context?.appearance ?? 'auto',
);


const resolvedLinkComponent = computed(() => {
	if (props.linkComponent === 'a') return null;
	if (props.linkComponent) return props.linkComponent;

	const components = instance?.appContext?.components ?? {};
	return components.NuxtLink ?? components.RouterLink ?? null;
});


// --- shared item state ---

const openIndex = ref(null);
const overflowOpen = ref(false);
const expandedKeys = ref({});

const toggleExpanded = (key) => {
	expandedKeys.value = {
		...expandedKeys.value,
		[key]: !expandedKeys.value[key],
	};
};

const closeMenuList = () => {
	context?.closeMenu?.();
};

const forwardItemClick = (payload) => {
	emit('item-click', payload);
};


// --- overflow measuring (bar mode only) ---

const hostRef = ref(null);
const setHostRef = (element) => {
	hostRef.value = element;
};
const measureRef = ref(null);
const measureMoreRef = ref(null);
const barEntries = computed(() => props.items
	.map((item, index) => ({ item, index }))
	.filter(({ item }) => !item.divider));
const barItems = computed(() => barEntries.value.map(({ item }) => item));
const visibleCount = ref(barItems.value.length);

let resizeObserver = null;
let measureTimer = null;


const safeVisibleCount = computed(() =>
	Math.max(0, Math.min(visibleCount.value, barItems.value.length)),
);

const visibleItems = computed(() => barItems.value.slice(0, safeVisibleCount.value));
const overflowItems = computed(() => {
	const firstHiddenEntry = barEntries.value[safeVisibleCount.value];
	if (!firstHiddenEntry) return [];

	const hiddenItems = props.items.slice(firstHiddenEntry.index);
	while (hiddenItems.at(-1)?.divider) hiddenItems.pop();
	return hiddenItems;
});
const hasOverflow = computed(() => overflowItems.value.length > 0);


const getMeasureItemArgs = (item) => getComponentArgs(
	item,
	'itemArgs',
	{ mode: 'measure' },
);


const measureItems = async () => {
	await nextTick();

	const host = hostRef.value;
	const measure = measureRef.value;

	if (!host || !measure) {
		visibleCount.value = barItems.value.length;
		return;
	}

	const itemElements = Array.from(
		measure.querySelectorAll('[data-fui-header-measure-item]'),
	);
	const itemWidths = itemElements.map((element) => element.offsetWidth);
	const gap = parseFloat(getComputedStyle(measure).columnGap) || 0;
	const moreWidth = measureMoreRef.value?.offsetWidth || 40;
	const availableWidth = host.clientWidth;
	const totalWidth = itemWidths.reduce((sum, width) => sum + width, 0)
		+ Math.max(0, itemWidths.length - 1) * gap;

	if (totalWidth <= availableWidth) {
		visibleCount.value = barItems.value.length;
		overflowOpen.value = false;
		return;
	}

	let usedWidth = moreWidth;
	let count = 0;

	for (const width of itemWidths) {
		const nextWidth = usedWidth + width + gap;
		if (nextWidth > availableWidth) break;

		usedWidth = nextWidth;
		count += 1;
	}

	visibleCount.value = count;
};


/*
 * Coalesced with setTimeout, not requestAnimationFrame: rAF never fires in
 * hidden tabs (background tab, prerender), which would leave the overflow
 * unmeasured until the tab becomes visible.
 */
const scheduleMeasure = () => {
	if (typeof window === 'undefined') return;
	if (renderMode.value !== 'bar' || hiddenOnBar.value) return;

	if (measureTimer) {
		clearTimeout(measureTimer);
	}

	measureTimer = setTimeout(() => {
		measureTimer = null;
		measureItems();
	}, 0);
};


watch(
	() => props.items,
	() => {
		visibleCount.value = barItems.value.length;
		scheduleMeasure();
	},
	{ deep: true },
);

watch(hostRef, (newElement, oldElement) => {
	if (resizeObserver) {
		if (oldElement) resizeObserver.unobserve(oldElement);
		if (newElement) resizeObserver.observe(newElement);
	}

	if (newElement) {
		visibleCount.value = barItems.value.length;
		scheduleMeasure();
	}
});

/*
 * The measure strip is `width: max-content`, so it resizes exactly when the
 * item sizes change (a CSS variable override at a breakpoint, a web font
 * swap-in) - cases where the host width stays the same and observing only
 * the host would leave visibleCount stale.
 */
watch(measureRef, (newElement, oldElement) => {
	if (!resizeObserver) return;

	if (oldElement) resizeObserver.unobserve(oldElement);
	if (newElement) resizeObserver.observe(newElement);
});


// --- dev warning: nav hidden on the mobile bar, but the menu slot is empty ---

let warnedAboutEmptyMenu = false;

watch(hiddenOnBar, (hidden) => {
	if (!hidden || warnedAboutEmptyMenu || !context) return;
	if (context.hasMenuContent) return;

	warnedAboutEmptyMenu = true;
	console.warn(
		'[futility-ui] FHeaderNav is hidden on the mobile bar, but the FHeader '
		+ '#menu slot is empty. Add <FHeaderNav> to the #menu slot so navigation '
		+ 'stays reachable on mobile.',
	);
}, { immediate: true });


onMounted(() => {
	if (typeof ResizeObserver !== 'undefined') {
		resizeObserver = new ResizeObserver(scheduleMeasure);
		if (hostRef.value) resizeObserver.observe(hostRef.value);
		if (measureRef.value) resizeObserver.observe(measureRef.value);
	}

	scheduleMeasure();
});

onUnmounted(() => {
	if (measureTimer) {
		clearTimeout(measureTimer);
	}

	resizeObserver?.disconnect();
});
</script>
