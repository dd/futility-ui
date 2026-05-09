<template>
	<FFormRow
		:id="from.id.value"
		:layout="layout"
		:size="size"
		:error-text="rowErrorText"
		:error-highlight="error"
		:required="rowRequired"
	>
		<template v-if="meta.label" #label>{{ meta.label }}</template>

		<div class="demo-range-widget">
			<input
				v-model.number="from.value.value"
				:id="from.id.value"
				:name="from.name.value"
				class="demo-range-input"
				type="number"
				:disabled="from.disabled.value"
				:class="{ 'has-error': from.error.value }"
			/>
			<span class="demo-range-sep">–</span>
			<input
				v-model.number="to.value.value"
				:id="to.id.value"
				:name="to.name.value"
				class="demo-range-input"
				type="number"
				:disabled="to.disabled.value"
				:class="{ 'has-error': to.error.value }"
			/>
		</div>
		<template v-if="meta.helpText" #help>{{ meta.helpText }}</template>
	</FFormRow>
</template>

<script setup>
import { computed } from 'vue';

import FFormRow from '@/forms/FFormRow';
import { useWidget, useWidgetField, WIDGET_PROPS, WIDGET_EMITS } from '../useWidget';

defineOptions({ name: 'DemoRangeWidget' });
const model = defineModel({ type: Object });
const props = defineProps({ ...WIDGET_PROPS });
defineEmits(WIDGET_EMITS);

const { fields, error } = useWidget(model, props);
const from = useWidgetField(model, props, computed(() => fields.value[0]));
const to = useWidgetField(model, props, computed(() => fields.value[1]));
const rowErrorText = computed(() => from.errorText.value ?? to.errorText.value ?? null);
const rowRequired = computed(() => from.required.value || to.required.value);
</script>

<style>
.demo-range-widget {
	display: flex;
	align-items: center;
	gap: 8px;
	padding-top: 4px;
}

.demo-range-input {
	width: 90px;
	padding: 4px 8px;
	border: 1px solid var(--fui-color-gray-300);
	border-radius: 6px;
	color: initial;
	text-align: center;
	outline: none;
	font-family: 'Inter';
	font-size: var(--fui-text-sm);

	&.has-error {
		border-color: var(--fui-color-danger-500, red);
	}
}

.demo-range-sep {
	color: var(--fui-color-gray-300);
	font-family: 'Inter';
	font-size: var(--fui-text-sm);
	/*@apply fui:text-text-secondary;*/
}
</style>
