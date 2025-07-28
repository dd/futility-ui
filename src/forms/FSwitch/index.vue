<template>
	<FTernarySwitch v-if="nullable" />
	<FBinarySwitch v-else />
</template>

<script setup >
import { defineAsyncComponent } from 'vue';
import FBinarySwitch from './FBinarySwitch';
import FTernarySwitch from './FTernarySwitch';

defineOptions({ name: 'FSwitch' });

defineProps({
	/** Flag of whether the switch has a null state */
	nullable: Boolean,
});
</script>
