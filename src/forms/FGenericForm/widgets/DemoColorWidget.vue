<template>
	<FFormRow
		:id="id"
		:layout="layout"
		:size="size"
		:error-text="errorText"
		:error-highlight="error"
	>
		<template v-if="meta.label" #label>{{ meta.label }}</template>
		<input
			v-model="value"
			:id="id"
			:name="name"
			type="color"
			:disabled="disabled"
			:readonly="readonly"
			:required="required"
			class="demo-color-widget"
		/>
		<template v-if="meta.help_text" #help>{{ meta.help_text }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';

import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'DemoColorWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields } = useWidget(model, props);
const { id, name, value, disabled, readonly, required, error, errorText } = useWidgetField(
	model, props, computed(() => fields.value[0])
);
</script>

<style>
.demo-color-widget {
	width: 50px;
	height: 40px;
	cursor: pointer;
	background: none;
}
</style>
