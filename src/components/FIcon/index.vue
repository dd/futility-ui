<template>
	<svg role="img" aria-hidden="true" class="fui-icon" >
		<use :xlink:href="`/__spritemap#ficon-${name}`"></use>
	</svg>
</template>

<script>
export default {
	props: {
		/** Name of icon */
		name: {
			type: String,
			required: true,
		},
	},
};
</script>
