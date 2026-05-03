<template>
	<textarea
		v-model="model"
		class="fui-textarea"
		:class="[
			`fui-textarea-size-${size}`,
			{
				'has-error': error,
			},
		]"
	/>
</template>


<script setup >
defineOptions({ name: 'FTextarea' });

const model = defineModel({
	type: String,
});
defineProps({
	/** Predefined size of the textarea. */
	size: {
		type: String,
		default: 'm',
	},

	/** Whether to display the textarea in an error state. */
	error: Boolean,
});
</script>
