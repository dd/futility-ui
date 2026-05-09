<template>
	<component
		:is="componentInstance"
		v-model="model"
		:type="type"
		:class="[
			`fui-input-size-${size}`,
			{
				'has-slot_start': !startSlotIsEmpty,
				'has-slot_end': !endSlotIsEmpty,
				'has-error': error,
			},
		]"
	>
		<template v-slot:start="slotProps" >
			<slot name="start" v-bind="slotProps" />
		</template>
		<template v-slot:end="slotProps" >
			<slot name="end" v-bind="slotProps" />
		</template>
	</component>
</template>

<script setup >
import { computed, defineAsyncComponent, provide, useSlots } from 'vue';

import useSlotUtils from '@/composables/slot';
const FIcon = defineAsyncComponent(() => import('@/FIcon'));
import FInputText from './FInputText';
import FInputPassword from './FInputPassword';
import { TEXT_ALLOWED_TYPES } from './constants';

defineOptions({ name: 'FInput' });
defineEmits([ 'update:modelValue' ]);
const model = defineModel();
const props = defineProps({
	/** The HTML input type. */
	type: {
		type: String,
		validator: (type) => TEXT_ALLOWED_TYPES.includes(type) || type === 'password',
	},

	/** Predefined size of the input or a custom size. */
	size: {
		type: String,
		default: 'm',
		// validator: (size) => SIZE_CHOICES.includes(size),
	},

	/** Whether to display the input in an error state. */
	error: Boolean,
});

const slots = useSlots();
const startSlotIsEmpty = useSlotUtils(slots.start).slotIsEmpty;
const endSlotIsEmpty = useSlotUtils(slots.end).slotIsEmpty;

const clearValue = () => {
	model.value = '';
};
provide('clearValue', clearValue);

const componentInstance = computed(() => {
	if (props.type === 'password') {
		return FInputPassword;
	}

	return FInputText;
});
</script>
