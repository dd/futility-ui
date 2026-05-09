<template>
	<input
		v-model="model"
		type="radio"
		class="fui-radiobutton"
	/>
</template>

<script setup >
defineOptions({ name: 'FRadioButton' });

defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: [ Number, String ]});
</script>
