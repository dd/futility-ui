<template>
	<component :is="tag" v-if="tag && isActive" ><slot /></component>
	<slot v-else-if="isActive" />
</template>


<script setup>
import { computed, inject, onUnmounted, watch } from 'vue';


defineOptions({ inheritAttrs: false });

const props = defineProps({
	/** Display name shown in the tab header. */
	name: {
		type: String,
		required: true,
	},

	/** URL-friendly identifier. Auto-generated from name if not provided. */
	slug: String,

	/** Prevents tab from being selected. */
	disabled: Boolean,

	/** Wrapper element tag. Omit to render slot content without a wrapper. */
	tag: String,
});

const addTab = inject('fuiTabs:addTab');
const updateTab = inject('fuiTabs:updateTab');
const removeTab = inject('fuiTabs:removeTab');
const activeTabID = inject('fuiTabs:activeTabID');


const ID = Math.random();

const actualSlug = computed(() => props.slug || slugify(props.name));
const isActive = computed(() => activeTabID.value === ID);


watch(
	() => [ props.name, props.disabled, actualSlug.value, props.as ],
	() => {
		updateTab({
			id: ID,
			name: props.name,
			disabled: props.disabled,
			slug: actualSlug.value,
			as: props.as,
		});
	},
	{ deep: true },
);

addTab({
	id: ID,
	name: props.name,
	disabled: props.disabled,
	slug: actualSlug.value,
	as: props.as,
});

onUnmounted(() => {
	removeTab(ID);
});


/**
 * Converts a string to a URL-friendly slug (ASCII only, no transliteration).
 *
 * @param {String} str
 * @returns {string}
 */
function slugify(str) {
	str = str.replace(/^\s+|\s+$/g, '');
	str = str.toLowerCase();
	str = str.replace(/[^a-z0-9\s-]/g, '');
	str = str.replace(/\s+/g, '-');
	str = str.replace(/-+/g, '-');
	str = str.replace(/^-+|-+$/g, '');
	return str;
}
</script>
