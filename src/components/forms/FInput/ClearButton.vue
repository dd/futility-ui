<template>
	<button
		class="fui-input-clear_btn fui-input-extra_btn"
		type="button"
		@click="clearValue"
	>
		<FIcon name="close" />
	</button>
</template>

<script setup >
import { inject } from 'vue';
import FIcon from '@/components/FIcon';

defineOptions({ name: 'FInputClearButton' });


const clearValue = inject('clearValue');
</script>
