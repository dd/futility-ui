<template>
	<label
		:class="[
			'fui-control_label',
			`fui-cl-size-${size}`,
			`fui-cl-layout-${layout}`,
			{
				'is-disabled': disabled,
				'has-error': error,
			},
		]"
	>
		<span v-if="isLabelFirst" class="fui-cl-label" >
			<slot name="label" >{{ label }}</slot>
		</span>
		<slot />
		<span v-if="isLabelEnd" class="fui-cl-label" >
			<slot name="label" >{{ label }}</slot>
		</span>
	</label>
</template>

<script setup >
import { computed, useSlots } from 'vue';
import useSlotUtils from '@/composables/slot';
import { LAYOUT_CONTROL_FIRST, LAYOUT_LABEL_FIRST, LAYOUT_CHOICES } from './constants';

defineOptions({ name: 'FControlLabel' });
const props = defineProps({
	/** Plain text label. */
	label: {
		type: String,
		default: '',
	},

	/** Widget size. */
	size: {
		type: String,
		default: 'm',
	},

	/** Error flag. */
	error: {
		type: Boolean,
		default: false,
	},

	/** Disabled flag. */
	disabled: {
		type: Boolean,
		default: false,
	},

	/** Controls the order of the label and the control. */
	layout: {
		type: String,
		default: LAYOUT_CONTROL_FIRST,
		validator: (design) => LAYOUT_CHOICES.includes(design),
	},
});

const slots = useSlots();
const labelSlotIsEmpty = useSlotUtils(slots.label).slotIsEmpty;

const isLabelFirst = computed(() => {
	return props.layout === LAYOUT_LABEL_FIRST && (labelSlotIsEmpty || props.label);
});
const isLabelEnd = computed(() => {
	return props.layout === LAYOUT_CONTROL_FIRST && (labelSlotIsEmpty || props.label);
});
</script>
