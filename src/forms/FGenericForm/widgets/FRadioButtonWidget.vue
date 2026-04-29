<template>
	<FFormRow
		:error-text="errorText"
		:error-highlight="error"
		:layout="layout"
		:size="size"
		:disabled="disabled"
	>
		<template #label>{{ meta.label }}</template>
		<div class="fui-gf-radio_widget">
			<FControlLabel
				v-for="choice in meta.choices"
				:key="choice.value"
				:label="choice.label"
				:error="error"
				:size="size"
				:disabled="disabled || !!choice.disabled"
			>
				<FRadioButton
					v-model="value"
					:name="name"
					:value="choice.value"
					:disabled="disabled || !!choice.disabled"
					:required="required"
					v-bind="attrs"
				/>
			</FControlLabel>
		</div>
		<template v-if="meta.helpText" #help>{{ meta.helpText }}</template>
	</FFormRow>
</template>

<script setup >
import { computed } from 'vue';

import FRadioButton from '@/forms/FRadioButton';
import FControlLabel from '@/forms/FControlLabel';
import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FRadioButtonWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields, error } = useWidget(model, props);
const { name, value, attrs, disabled, required, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
