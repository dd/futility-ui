<template>
	<input
		v-model="model"
		type="radio"
		class="fui-radiobutton"
		:class="{
			'has-error': error,
		}"
	/>
</template>

<script setup >
defineOptions({ name: 'FRadioButton' });

defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: [ Number, String ]});

defineProps({
	/** Error flag. */
	error: Boolean,
});
</script>
