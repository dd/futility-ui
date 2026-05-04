<template>
	<section
		:class="[
			'fui-modal',
			'fui-modal-layout-default',
			{
				'fui-modal-with_header': hasHeaderSlot || title,
				[`fui-modal-${size}`]: size,
			}
		]"
	>
		<button
			v-if="!hideCloseButton"
			class="fui-modal-close"
			type="button"
			:aria-label="closeLabel"
			@click="emit('close')"
		>
			<FIcon name="close" />
		</button>
		<slot name="header"><h3 v-if="title" class="fui-modal-title">{{ title }}</h3></slot>
		<div class="fui-modal-body"><slot /></div>
		<footer v-if="hasFooterSlot" class="fui-modal-footer">
			<slot name="footer" />
		</footer>
	</section>
</template>

<script setup>
import { computed, useSlots } from 'vue';

import FIcon from '@/FIcon';
import { isEmptySlot } from '@/composables/slot';

defineOptions({ name: 'FMLayoutDefault' });
defineProps({
	/** Modal title shown in the header. */
	title: {
		type: String,
	},

	/**
	 * Controls the max-width of the modal panel.
	 * Use a preset, a custom size key, or an empty value for no size class.
	 */
	size: {
		type: String,
		default: 'md',
	},

	/** Hide the × close button. */
	hideCloseButton: {
		type: Boolean,
		default: false,
	},

	/** Accessible label for the close button. */
	closeLabel: {
		type: String,
		default: 'Close',
	},
});

const emit = defineEmits([ 'close' ]);
const slots = useSlots();

const hasHeaderSlot = computed(() => slots.header && !isEmptySlot(slots.header));
const hasFooterSlot = computed(() => slots.footer && !isEmptySlot(slots.footer));
</script>
