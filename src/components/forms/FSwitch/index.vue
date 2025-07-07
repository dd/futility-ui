<template>
	<FTernarySwitch v-if="nullable" />
	<FBinarySwitch v-else />
</template>

<script setup >
import { defineAsyncComponent } from 'vue';
const FBinarySwitch = defineAsyncComponent(() => import('./FBinarySwitch.vue'));
const FTernarySwitch = defineAsyncComponent(() => import('./FTernarySwitch.vue'));

defineOptions({ name: 'FSwitch' });

defineProps({
	/** Flag of whether the switch has a null state */
	nullable: Boolean,
});
</script>
