<template>
	<label
		class="fui-radiobutton"
		:class="{
			'has-error': error,
		}"
	>
		<input
			v-model="model"
			type="radio"
			class="fui-rb-input"
			v-bind="$attrs"
		/>

		<span class="fui-rb-slot" ><slot /></span>
	</label>
</template>


<script setup >
defineOptions({
	name: 'FRadioButton',
	inheritAttrs: false,
});
const model = defineModel({
	type: [ Number, String ],
});
defineProps({
	/** Error flag. */
	error: Boolean,
});
</script>
