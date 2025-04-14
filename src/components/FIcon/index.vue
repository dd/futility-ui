<template>
	<svg role="img" aria-hidden="true" :class="['fui-icon', `fui-icon-${name}`]" >
		<use :xlink:href="iconPath"></use>
	</svg>
</template>

<script setup>
import { computed } from 'vue';

import spriteUrl from './__spritemap';


defineOptions({ name: 'FIcon' });
const props = defineProps({
	/** Name of icon */
	name: {
		type: String,
		required: true,
	},
});


const iconPath = computed(() => {
	if (import.meta.env.DEV) {
		return `/__spritemap#ficon-${props.name}`;
	}

	return `${spriteUrl}#ficon-${props.name}`;
});
</script>
