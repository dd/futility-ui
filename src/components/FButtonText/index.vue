<template>
	<component
		:is="componentType"
		:class="[
			'fui-button-text',
			`fui-bt-color-${color}`,
			{
				'fui-bt-disabled': disabled,
			},
		]"
		v-bind="extraAttributes"
	>
		<slot />
	</component>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

import FLoader from '@/components/FLoader';
import { COMPONENT_TYPES } from './constants';


defineOptions({ name: 'FButtonText' });


const props = defineProps({
	/** Button type. */
	type: {
		type: String,
		default: 'button',
		validator: (type) => COMPONENT_TYPES.includes(type),
	},

	/** Color. */
	color: {
		type: String,
		default: 'primary',
		// validator: (color) => COLOR_CHOICES.includes(color),
	},

	/** Disable button button status. */
	disabled: {
		type: Boolean,
		default: false,
	},
});

const attrs = useAttrs()


/** Component type. */
const componentType = computed(() => {
	if (props.type === 'submit') {
		return 'button';
	}

	return props.type;
});


/** Attributes for subcomponent. */
const extraAttributes = computed(() => {
	const result = {};

	if (componentType.value === 'button') {
		result.type = props.type;
		result.disabled = props.disabled || props.busy;
	}

	if (props.disabled && componentType.value != 'button') {
		result['aria-disabled'] = 'true';
	}

	return result;
});
</script>
