<template>
	<label
		class="fui-control_label"
		:class="{
			'has-error': error,
		}"
	>
		<slot />
		<span v-if="label" >{{ label }}</span>
	</label>
</template>

<script setup>
const props = defineProps({
	/** Plain text label. */
	label: {
		type: String,
		default: '',
	},

	/** Error flag. */
	error: {
		type: Boolean,
		default: false,
	},
});
</script>
