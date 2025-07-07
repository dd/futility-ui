<template>
	<input
		v-model="model"
		type="checkbox"
		class="fui-checkbox"
		:class="{
			'has-error': error,
		}"
	/>
</template>

<script setup >
defineOptions({ name: 'FCheckbox' });

defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: [ Boolean, Array ]});

const props = defineProps({
	/** Error flag. */
	error: Boolean,
});
</script>
