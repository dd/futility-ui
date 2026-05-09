<template>
	<input
		v-model="model"
		type="checkbox"
		class="fui-switch fui-binary_switch"
		role="switch"
	/>
</template>

<script setup >
defineOptions({ name: 'FBinarySwitch' });

defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: Boolean });
</script>
