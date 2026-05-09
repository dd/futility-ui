<template>
	<button
		class="fui-input-clear_btn fui-input-extra_btn"
		type="button"
		:aria-label="ariaLabel"
		:title="title"
		@click="clearValue"
	>
		<FIcon name="close" />
	</button>
</template>

<script setup >
import { inject } from 'vue';
import FIcon from '@/FIcon';

defineOptions({ name: 'FInputClearButton' });

const props = defineProps({
	/** Screen reader label */
	ariaLabel: {
		type: String,
		default: 'Clear input',
	},
	/** Tooltip text */
	title: {
		type: String,
		default: 'Clear',
	},
});

const clearValue = inject('clearValue');
</script>
