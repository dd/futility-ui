<template>
	<FFormRow
		:id="id"
		:error-text="errorText"
		:error-highlight="error"
		:layout="layout"
		:size="size"
		:disabled="disabled"
	>
		<template #label>{{ meta.label }}</template>
		<FInputAutocomplete
			v-model="value"
			:request-handler="meta.requestHandler"
			:request-current-handler="meta.requestCurrentHandler"
			:filter-input-i-d="id"
			:error="error"
			:size="size"
			:disabled="disabled"
			:required="required"
			:placeholder-label="meta.placeholderLabel"
			:placeholder-filter="meta.placeholderFilter"
			:texts="meta.texts"
		/>
		<template v-if="meta.helpText" #help>{{ meta.helpText }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';

import FInputAutocomplete from '@/forms/FInputAutocomplete';
import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FAutocompleteWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields, error } = useWidget(model, props);
const { id, value, disabled, required, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
