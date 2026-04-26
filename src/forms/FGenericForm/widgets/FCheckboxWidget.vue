<template>
	<FFormRow
		:error-text="errorText"
		:error-highlight="error"
		:layout="layout"
		:size="size"
		:disabled="disabled"
	>
		<FControlLabel
			:label="meta.label"
			:error="error"
			:size="size"
			:disabled="disabled"
		>
			<FCheckbox
				v-model="value"
				:id="id"
				:name="name"
				:disabled="disabled"
				:required="required"
			/>
		</FControlLabel>
		<template v-if="meta.help_text" #help>{{ meta.help_text }}</template>
	</FFormRow>
</template>

<script setup >
import { computed } from 'vue';

import FCheckbox from '@/forms/FCheckbox';
import FControlLabel from '@/forms/FControlLabel';
import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FCheckboxWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields, error } = useWidget(model, props);
const { id, name, value, disabled, required, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
