<template>
	<FFormRow
		:id="id"
		:layout="layout"
		:size="size"
		:error-text="errorText"
		:error-highlight="error"
		:disabled="disabled"
	>
		<template v-if="meta.label" #label>{{ meta.label }}</template>
		<FInput
			v-model="value"
			:id="id"
			:name="name"
			:type="props.meta.type"
			:placeholder="meta.placeholder"
			:error="error"
			:disabled="disabled"
			:readonly="readonly"
			:required="required"
			:size="size"
		/>
		<template v-if="meta.helpText" #help>{{ meta.helpText }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';

import FInput from '@/forms/FInput';
import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FInputWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields } = useWidget(model, props);
const { id, name, value, disabled, readonly, required, error, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
