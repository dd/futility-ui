<template>
	<FFormRow
		:id="!meta.labelLayout ? id : undefined"
		:error-text="errorText"
		:error-highlight="error"
		:layout="layout"
		:size="size"
		:disabled="disabled"
	>
		<template v-if="!meta.labelLayout" #label>{{ meta.label }}</template>
		<FControlLabel
			v-if="meta.labelLayout"
			:label="meta.label"
			:layout="meta.labelLayout"
			:error="error"
			:size="size"
			:disabled="disabled"
		>
			<FSwitch
				v-model="value"
				:id="id"
				:name="name"
				:nullable="allowNull"
				:disabled="disabled"
				v-bind="attrs"
			/>
		</FControlLabel>
		<FSwitch
			v-else
			v-model="value"
			:id="id"
			:name="name"
			:nullable="allowNull"
			:disabled="disabled"
			v-bind="attrs"
		/>
		<template v-if="meta.helpText" #help>{{ meta.helpText }}</template>
	</FFormRow>
</template>

<script setup >
import { computed } from 'vue';

import FSwitch from '@/forms/FSwitch';
import FControlLabel from '@/forms/FControlLabel';
import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'FSwitchWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields, error } = useWidget(model, props);
const { id, name, value, attrs, disabled, allowNull, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>
