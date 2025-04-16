<template>
	<component
		:is="componentType"
		:class="[
			'fui-button',
			`fui-b-design-${design}`,
			`fui-b-size-${size}`,
			`fui-b-color-${color}`,
			{
				'fui-b-busy': busy,
				'fui-b-disabled': disabled || busy,
				[`fui-b-icon-${icon}`]: icon,
			},
		]"
		v-bind="extraAttributes"
	>
		<transition name="loader-fade" >
			<FLoader v-if="busy && !noBusyLoader" hideTrack class="fui-b-busy-indicator" />
		</transition>
		<span class="fui-b-content"><slot /></span>
	</component>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

import FLoader from '@/components/FLoader';
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
		default: 'm',
		// validator: (size) => SIZE_CHOICES.includes(size),
	},

	/** Disable button button status. */
	disabled: {
		type: Boolean,
		default: false,
	},

	/** Make button busy - add loader and disable click. */
	busy: {
		type: Boolean,
		default: false,
	},

	/** Hides the preloader when the button is busy. */
	noBusyLoader: {
		type: Boolean,
		default: false,
	},

	/** Icon-Button modifier. */
	icon: {
		type: String,
		// default: 'circle',
		// validator: (style) => ICON_STYLE_CHOICES.includes(style),
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

	if (props.busy) {
		result['aria-busy'] = 'true';
	}

	if ((props.disabled || props.busy) && componentType.value != 'button') {
		result['aria-disabled'] = 'true';
	}

	return result;
});
</script>
