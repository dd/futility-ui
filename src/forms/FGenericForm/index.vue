<template>
	<div class="fui-generic-form" ref="formRoot">
		<component
			v-for="entry in meta"
			:key="entryKey(entry)"

			:is="resolveWidget(entry.type)"

			:model-value="extractData(entry)"
			:meta="entry"
			:layout="effectiveLayout"
			:size="widgetSize"
			:field-errors="extractErrors(entry)"
			@update:model-value="updateData"
		/>
	</div>
</template>

<script setup>
import { computed, ref, shallowRef, watch } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { DEFAULT_WIDGETS } from './constants';

defineOptions({ name: 'FGenericForm' });

const model = defineModel({ type: Object, default: () => ({}) });
const localModel = shallowRef({});

const props = defineProps({
	/** Array of field metadata objects describing the form structure. */
	meta: {
		type: Array,
		required: true,
	},

	/**
	 * Field-level error messages.
	 * Shape: `{ field_name: 'Error message string' }`
	 * Each widget receives only the errors for its own fields.
	 */
	errors: {
		type: Object,
		default: () => ({}),
	},

	/**
	 * FFormRow layout forwarded to every widget.
	 * Built-in values: `two_columns` | `one_column` | `auto`.
	 * `auto` picks `two_columns` / `one_column` based on the form container width.
	 */
	layout: {
		type: String,
		default: 'two_columns',
	},

	/**
	 * Container width threshold (px) used when layout=`auto`.
	 * At or above this value the form uses `two_columns`; below - `one_column`.
	 */
	autoLayoutBreakpoint: {
		type: Number,
		default: 400,
	},

	/** Widget size. */
	widgetSize: {
		type: String,
		default: 'm',
	},

	/**
	 * Widget mapping: type -> `{ component, normalize? }`
	 * Merged on top of built-in defaults.
	 */
	widgets: {
		type: Object,
		default: () => ({}),
	},
});


/* Widget resolution ***************************/

const mergedWidgets = computed(() => ({
	...DEFAULT_WIDGETS,
	...props.widgets,
}));

function resolveWidget(type) {
	const config = mergedWidgets.value[type];
	return config?.component ?? config;
}


/* Data helpers ********************************/

function entryKey(entry) {
	return entry.fields.map(f => f.field_name).join('_');
}

function extractData(entry) {
	const data = {};
	for (const field of entry.fields) {
		data[field.field_name] = localModel.value?.[field.field_name];
	}
	return data;
}

function updateData(widgetData) {
	const nextModel = { ...localModel.value, ...widgetData };
	localModel.value = nextModel;
	model.value = nextModel;
}

function extractErrors(entry) {
	const errs = props.errors ?? {};
	const result = {};
	for (const field of entry.fields) {
		if (field.field_name in errs) {
			result[field.field_name] = errs[field.field_name];
		}
	}
	return result;
}


/* Auto layout *********************************/

const formRoot = ref(null);
const { width: containerWidth } = useElementBounding(formRoot);

watch(
	model,
	(value) => { localModel.value = { ...(value ?? {}) }; },
	{ immediate: true, deep: true },
);

const effectiveLayout = computed(() => {
	if (props.layout !== 'auto') return props.layout;
	return containerWidth.value >= props.autoLayoutBreakpoint ? 'two_columns' : 'one_column';
});
</script>
