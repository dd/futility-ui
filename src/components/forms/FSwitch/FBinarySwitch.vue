<template>
	<input
		v-model="model"
		type="checkbox"
		class="fui-switch fui-binary_switch"
		:class="{
			'has-error': error,
		}"
	/>
</template>

<script setup >
defineOptions({ name: 'FBinarySwitch' });

defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: Boolean });

const props = defineProps({
	/** Error flag. */
	error: Boolean,
});
</script>
