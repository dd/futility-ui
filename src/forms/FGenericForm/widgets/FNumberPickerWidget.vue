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
		<FNumberPicker
			v-model="value"
			:id="id"
			:name="name"
			:min="meta.min"
			:max="meta.max"
			:error="error"
			:disabled="disabled"
			:disable-input="meta.disableInput"
			:allow-extreme-clicks="meta.allowExtremeClicks"
			:focusable-buttons="meta.focusableButtons"
			:size="size"
			:texts="meta.texts"
			v-bind="attrs"
		/>
		<template v-if="meta.helpText" #help>{{ meta.helpText }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';

import FNumberPicker from '@/forms/FNumberPicker';
import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FNumberPickerWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields } = useWidget(model, props);
const { id, name, value, attrs, disabled, error, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
