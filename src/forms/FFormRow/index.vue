<template>
	<div
		:class="[
			'fui-form_row',
			`fui-fr-layout-${layout}`,
			`fui-fr-size-${size}`,
			{
				'has-error': errorHighlight,
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

	/** Layout */
	layout: {
		type: String,
		default: 'two_columns',
	},

	/** Widget size. */
	size: {
		type: String,
		default: 'm',
	},

	/** Error text shown in a tooltip next to the input. */
	errorText: String,

	/** Highlight label with red color. */
	errorHighlight: Boolean,
});
const slots = useSlots();

const labelSlotIsEmpty = useSlotUtils(slots.label).slotIsEmpty;
const helpSlotIsEmpty = useSlotUtils(slots.help).slotIsEmpty;
</script>
