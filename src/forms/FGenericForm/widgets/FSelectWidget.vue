<template>
	<FFormRow
		:id="id"
		:error-text="errorText"
		:error-highlight="error"
		:layout="layout"
		:size="size"
		:disabled="disabled"
		:required="required"
	>
		<template #label>{{ meta.label }}</template>
		<FSelect
			v-model="value"
			:id="id"
			:name="name"
			:option-list="meta.choices"
			:empty-option-label="meta.emptyOptionLabel"
			:empty-option-value="meta.emptyOptionValue ?? null"
			:error="error"
			:size="size"
			:disabled="disabled"
			:required="required"
			v-bind="attrs"
		/>
		<template v-if="meta.helpText" #help>{{ meta.helpText }}</template>
	</FFormRow>
</template>

<script setup >
import { computed } from 'vue';

import FSelect from '@/forms/FSelect';
import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FSelectWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields, error } = useWidget(model, props);
const { id, name, value, attrs, disabled, required, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
