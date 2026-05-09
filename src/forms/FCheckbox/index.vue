<template>
	<input
		v-model="model"
		type="checkbox"
		class="fui-checkbox"
	/>
</template>

<script setup >
defineOptions({ name: 'FCheckbox' });

defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: [ Boolean, Array ]});
</script>
