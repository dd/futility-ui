<template>
	<div
		:class="[
			'fui-form_row',
			`fui-fr-layout-${layout}`,
			`fui-fr-size-${size}`,
			{
				'has-error': errorHighlight,
				'is-disabled': disabled,
			},
		]"
	>
		<label
			v-if="!labelSlotIsEmpty"
			class="fui-fr-label"
			:for="id"
		>
			<slot name="label" />
		</label>
		<div class="fui-fr-content" >
			<div class="fui-fr-input" >
				<slot />
				<FIcon
					v-if="errorText"
					v-tooltip="errorText"
					name="exclamation_circle_solid"
					class="fui-fr-error_icon"
				/>
			</div>
			<p v-if="!helpSlotIsEmpty" class="fui-fr-help_text" ><slot name="help" /></p>
		</div>
	</div>
</template>

<script setup >
import { useSlots } from 'vue';
import useSlotUtils from '@/composables/slot';
import FIcon from '@/FIcon';
import { vTooltip } from '@/FTooltip/directive';


defineOptions({ name: 'FFormRow' });
defineProps({
	/** Input id for label */
	id: [ String, Number ],

	/**
	 * Controls the label/input arrangement. Built-in values: `one_column` (stacked) and
	 * `two_columns` (side by side). You can pass any custom string and define the corresponding CSS
	 * class.
	 */
	layout: {
		type: String,
		default: 'two_columns',
	},

	/**
	 * Controls the vertical alignment of the label relative to the input. Should match the `size`
	 * used on the input inside the slot. You can pass any custom string and define the
	 * corresponding CSS class.
	 * */
	size: {
		type: String,
		default: 'm',
	},

	/** Error message shown as a tooltip on an icon next to the input. */
	errorText: String,

	/** When `true`, highlights the label text in the error color. */
	errorHighlight: Boolean,

	/** Visually mutes the help text to indicate a disabled state. */
	disabled: Boolean,
});

const slots = useSlots();
const labelSlotIsEmpty = useSlotUtils(slots.label).slotIsEmpty;
const helpSlotIsEmpty = useSlotUtils(slots.help).slotIsEmpty;
</script>
