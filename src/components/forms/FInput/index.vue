<template>
	<component
		:is="componentInstance"
		v-model="model"
		:type="type"
		:class="[
			`fui-input-size-${size}`,
			{
				// 'with-clear-btn': clearButton,
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
import { computed, defineAsyncComponent, provide } from 'vue';
const FIcon = defineAsyncComponent(() => import('@/components/FIcon'));
const FInputText = defineAsyncComponent(() => import('./FInputText.vue'));
const FInputPassword = defineAsyncComponent(() => import('./FInputPassword.vue'));
import { TEXT_ALLOWED_TYPES } from './base';

defineOptions({ name: 'FInput' });
defineEmits([ 'update:modelValue' ]);
const model = defineModel();
const props = defineProps({
	/** The HTML input type. */
	type: {
		type: String,
		validator: (type) => TEXT_ALLOWED_TYPES.includes(type) || type === 'password',
	},

	/** Predefined size of the input or a custom size class. */
	size: {
		type: String,
		default: 'm',
		// validator: (size) => SIZE_CHOICES.includes(size),
	},

	/** Whether to display the input in an error state. */
	error: Boolean,
});

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
