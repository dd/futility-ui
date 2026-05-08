<template>
	<div
		class="fui-number-picker"
		:class="[
			`fui-np-size-${size}`,
			{
				'has-error': error,
				'is-disabled': disabled,
			},
		]"
	>
		<button
			type="button"
			class="fui-np-btn fui-np-decrease"
			:title="texts.decrease"
			:tabindex="focusableButtons ? undefined : -1"
			:disabled="disabled || (disabledDecrease && !allowExtremeClicks)"
			@click="decrease"
		>
			<FIcon name="minus" class="fui-np-icon" />
		</button>

		<input
			v-model="model"
			type="number"
			class="fui-np-input"
			:class="{
				'fui-np-input-pseudo_active': disableInput,
			}"
			:disabled="disabled || disableInput"
			v-bind="inputAttrs"
		>

		<button
			type="button"
			class="fui-np-btn fui-np-increase"
			:title="texts.increase"
			:tabindex="focusableButtons ? undefined : -1"
			:disabled="disabled || (disabledIncrease && !allowExtremeClicks)"
			@click="increase"
		>
			<FIcon name="plus" class="fui-np-icon" />
		</button>
	</div>
</template>

<script setup >
import { computed, useAttrs } from 'vue';
import FIcon from '@/FIcon';


const DEFAULT_TEXTS = {
	decrease: 'Decrease',
	increase: 'Increase',
};

defineOptions({
	name: 'FNumberPicker',
	inheritAttrs: false,
});
const model = defineModel({
	type: Number,
	default: 0,
});
const props = defineProps({
	/** Min value. */
	min: {
		type: Number,
		default: undefined,
	},

	/** Max value. */
	max: {
		type: Number,
		default: undefined,
	},

	/** Disable direct input editing. The value can only be changed via buttons. */
	disableInput: Boolean,

	/** Disabled flag. */
	disabled: Boolean,

	/** Error flag. */
	error: Boolean,

	/** Allow clicks at extreme values. */
	allowExtremeClicks: Boolean,

	/** Allow the +/− buttons to receive keyboard focus via Tab. */
	focusableButtons: Boolean,

	/**
	 * Predefined size of the component.
	 * @values 3xs, 2xs, xs, s, m, xl
	 */
	size: {
		type: String,
		default: 'm',
	},

	/**
	 * Override default accessibility texts used for button `title` attributes.
	 * Accepts an object with optional keys: `decrease`, `increase`.
	 * Defaults: `{ decrease: 'Decrease', increase: 'Increase' }`.
	 * Use this to provide localized or context-specific labels.
	 */
	texts: {
		type: Object,
		default: () => ({}),
	},
});
const emit = defineEmits([
	'clickDecrease',
	'clickIncrease',
]);

const texts = computed(() => ({
	...DEFAULT_TEXTS,
	...props.texts,
}));


// Value ////////////////////////////////////////
const decrease = () => {
	emit('clickDecrease', model.value - 1);

	if (!disabledDecrease.value) {
		model.value -= 1;
	}
};
const increase = () => {
	emit('clickIncrease', model.value + 1);

	if (!disabledIncrease.value) {
		model.value += 1;
	}
};
const disabledDecrease = computed(() => {
	return props.min !== undefined && model.value <= props.min;
});
const disabledIncrease = computed(() => {
	return props.max !== undefined && model.value >= props.max;
});


// Attrs ////////////////////////////////////////
const attrs = useAttrs();
const inputAttrs = computed(() => {
	const { class: __omit, ..._attrs } = attrs; // eslint-disable-line no-unused-vars
	return _attrs;
});
</script>
