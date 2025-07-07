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
		<span
			v-if="['date', 'datetime-local', 'month', 'week'].includes(type)"
			class="fui-input-date_icon"
		>
			<FIcon name="calendar_outline" />
		</span>
		<span v-if="type === 'time'" class="fui-input-time_icon" >
			<FIcon name="clock_outline" />
		</span>
		<slot name="end" />
	</label>
</template>

<script setup >
import { computed, useAttrs, defineAsyncComponent } from 'vue';
const FIcon = defineAsyncComponent(() => import('@/components/FIcon'));
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
});
const attrs = useAttrs();


const widgetClasses = computed(() => {
	const result = [
		`fui-input-text-${props.type}`,
	];

	if (attrs.class) {
		result.push(attrs.class);
	}

	return result;
});

const inputAttrs = computed(() => {
	const { class: __omit, ..._attrs } = attrs; // eslint-disable-line no-unused-vars
	return _attrs;
});
</script>
