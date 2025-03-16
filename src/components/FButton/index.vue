<template>
	<component
		:is="componentType"
		:class="[
			'fui-button',
			`fui-b-design-${design}`,
			`fui-b-size-${size}`,
			`fui-b-color-${color}`,
			// { 'fui-b-busy': busy },
			// { 'fui-b-icon': icon },
		]"
		v-bind="extraAttributes"
	>
		<!-- <transition name="loader-fade" >
			<FLoader v-if="busy" class="fui-b-busy-indicator" />
		</transition> -->
		<span class="fui-b-content"><slot /></span>
	</component>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

// import FLoader from 'futility-ui/FLoader';
// import FLoader from '@/components/FLoader';
import { COMPONENT_TYPES } from './constants';


defineOptions({ name: 'FButton' });


const props = defineProps({
	/** Button type. */
	type: {
		type: String,
		default: 'button',
		validator: (type) => COMPONENT_TYPES.includes(type),
	},

	/** Button design. */
	design: {
		type: String,
		default: 'normal',
		// validator: (design) => DESIGN_CHOICES.includes(design),
	},

	/** Color. */
	color: {
		type: String,
		default: 'primary',
		// validator: (color) => COLOR_CHOICES.includes(color),
	},

	/** Button size. */
	size: {
		type: String,
		default: 'default',
		// validator: (size) => SIZE_CHOICES.includes(size),
	},

	/** Disable button button status. */
	disabled: {
		type: Boolean,
		default: false,
	},

	// /** Make button busy - add loader and disable click. */
	// busy: Boolean,

	// /** Icon-Button modifier. */
	// icon: Boolean,
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
		result.disabled = props.disabled || props.busy || false;
	}

	return result;
});
</script>
