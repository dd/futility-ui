<template>
	<FFormRow
		:layout="layout"
		:size="size"
		:error-text="errorText"
		:error-highlight="!!errorText"
	>
		<template v-if="meta.label" #label>{{ meta.label }}</template>
		<FInput
			v-model="value"
			:type="inputType"
			:error="error"
			:disabled="disabled"
			:readonly="readonly"
			:required="required"
			:size="size"
		/>
		<template v-if="meta.help_text" #help>{{ meta.help_text }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';
import FInput from '@/forms/FInput';
import FFormRow from '@/forms/FFormRow';
import { useWidget, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FInputWidget' });
defineEmits(WIDGET_EMITS);
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });

const { value, disabled, readonly, required, error, errorText } = useWidget(model, props);

// 'string' is a common API type alias — map it to the native 'text' input type.
// All other meta types are passed through directly to FInput.
const HTML_TYPE_MAP = { string: 'text' };
const inputType = computed(() => HTML_TYPE_MAP[props.meta.type] ?? props.meta.type);
</script>
