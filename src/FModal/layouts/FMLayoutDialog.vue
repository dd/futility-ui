<template>
	<section class="fui-modal fui-modal-layout-dialog">
		<button
			v-if="!hideCloseButton"
			class="fui-modal-close"
			type="button"
			:aria-label="closeLabel"
			@click="emit('close')"
		>
			<FIcon name="close" />
		</button>

		<div v-if="hasIcon" class="fui-modal-icon" >
			<slot name="icon">
				<FIcon
					:name="iconName"
					:class="{
						'fui-modal-icon-colored': color,
					}"
				/>
			</slot>
		</div>
		<!-- <div class="fui-modal-body"><slot /></div> -->
		<slot />
		<footer v-if="!isEmptySlot(slots.controls)" class="fui-modal-controls">
			<slot name="controls" />
		</footer>
	</section>
</template>

<script setup>
import { computed, useSlots } from 'vue';

import FIcon from '@/FIcon';
import { isEmptySlot } from '@/composables/slot';

import { ICON_TYPES } from '../constants';


defineOptions({ name: 'FMLayoutDialog' });

const ICON_MAP = {
	info: {
		filled: 'info_circle_solid',
		outline: 'info_circle_outline',
	},
	success: {
		filled: 'check_circle_solid',
		outline: 'check_circle_outline',
	},
	warning: {
		filled: 'exclamation_circle_solid',
		outline: 'exclamation_circle_outline',
	},
	error: {
		filled: 'close_circle_solid',
		outline: 'close_circle_outline',
	},
};

const props = defineProps({
	/**
	 * Preset icon type. Renders a matching FIcon unless overridden via the `icon` slot.
	 * @values info, success, warning, error
	 */
	icon: {
		type: String,
		validator: (v) => ICON_TYPES.includes(v),
	},

	/** Use outline variants of the preset icon. */
	outline: {
		type: Boolean,
		default: false,
	},

	/** Apply semantic color to the preset icon. */
	color: {
		type: Boolean,
		default: false,
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

const hasIcon = computed(() => props.icon || !isEmptySlot(slots.icon));
const iconName = computed(() => {
	if (!props.icon) return null;
	return props.outline ? ICON_MAP[props.icon].outline : ICON_MAP[props.icon].filled;
});
</script>
