<template><slot /></template>

<script setup>
/**
 * Internal renderless provider. `provide()` is per component instance, so
 * FHeader alone cannot give its two subtrees (bar and mobile menu) different
 * context values under one key. Each FHeaderRegion instance re-provides the
 * shared FHeader context with its own `region`, letting smart children
 * (FHeaderNav, FHeaderBurger) adapt to where they are rendered.
 */

import { provide, reactive } from 'vue';

import { FHEADER_CONTEXT_KEY } from './constants';


defineOptions({ name: 'FHeaderRegion' });


const props = defineProps({
	/** Shared FHeader context (refs and methods). */
	context: {
		type: Object,
		required: true,
	},

	/** Region this subtree belongs to: `bar` or `menu`. */
	region: {
		type: String,
		required: true,
	},
});


provide(FHEADER_CONTEXT_KEY, reactive({
	...props.context,
	region: props.region,
}));
</script>
