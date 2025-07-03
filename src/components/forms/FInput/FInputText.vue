<template>
	<label
		class="fui-input fui-input-text"
		:class="widgetClasses"
	>
		<slot name="start" />
		<input
			v-model="model"
			v-bind="inputAttrs"
			:type="type"
			class="fui-input-input"
		>
		<slot name="end" />
	</label>
</template>

<script setup >
import { computed, useAttrs, useSlots } from 'vue';
// import { isEmptySlot } from 'futility-ui/utils/slot';
import { isEmptySlot } from '@/utils/slot';
import { TEXT_ALLOWED_TYPES } from './base';


defineOptions({
	name: 'FInputText',
	inheritAttrs: false,
});

defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: [ String, Number ]});

const props = defineProps({
	/** Input type. */
	type: {
		type: String,
		default: 'text',
		validator: (type) => TEXT_ALLOWED_TYPES.includes(type),
	},

	/** Input size. */
	size: {
		type: String,
		default: 'm',
		// validator: (size) => SIZE_CHOICES.includes(size),
	},

	/** Error flag. */
	error: Boolean,
});
const slots = useSlots();
const attrs = useAttrs();


const widgetClasses = computed(() => {
	const result = [
		`fui-input-text-${props.type}`,
		`fui-input-size-${props.size}`,
	];

	if (attrs.class) {
		result.push(attrs.class);
	}

	if (hasStart.value) {
		result.push('has-start');
	}

	if (hasEnd.value) {
		result.push('has-end');
	}

	if (props.error) {
		result.push('has-error');
	}

	return result;
});

const inputAttrs = computed(() => {
	const { class: __omit, ..._attrs } = attrs; // eslint-disable-line no-unused-vars
	return _attrs;
});

const hasStart = computed(() => !isEmptySlot(slots.start));
const hasEnd = computed(() => !isEmptySlot(slots.end));
</script>
