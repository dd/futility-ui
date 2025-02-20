<template>
	<svg
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		class="fui-loader"
		:class="{
			[`fui-loader-${size}`]: size,
		}"
		viewBox="0 0 100 100"
	>
		<circle
			v-if="!hideTrack"
			class="fui-load-track"
			fill="none"
			cx="50"
			cy="50"
			r="45"
			stroke-width="9"
		/>
		<circle
			class="fui-load-sign"
			fill="none"
			stroke="currentColor"
			cx="50"
			cy="50"
			r="45"
			stroke-width="9"
			stroke-linecap="round"
			transform="rotate(0 50 50)"
		>
			<animateTransform
				attributeName="transform"
				attributeType="xml"
				type="rotate"
				from="0 50 50"
				to="360 50 50"
				dur="1.1s"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="stroke-dasharray"
				attributeType="xml"
				values="212.058 70.686; 70.686 212.058; 212.058 70.686"
				keyTimes="0; 0.5; 1"
				dur="1.9s"
				repeatCount="indefinite"
			/>
		</circle>
	</svg>
</template>


<script setup >
defineOptions({ name: 'FLoader' });
defineProps({
	/** Loader size. */
	size: String,

	/** Hide track. */
	hideTrack: Boolean,
});
</script>

