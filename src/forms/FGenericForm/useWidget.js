import { computed } from 'vue';

export { getFormDefaults, getDiff, getDataForQuery } from './utils';
export { DEFAULT_WIDGETS } from './constants';

/**
 * Standard props that every form widget must declare.
 * Spread into defineProps: defineProps({ ...WIDGET_PROPS })
 */
export const WIDGET_PROPS = {
	/** Widget meta entry (or array of entries for multi-row demos). */
	meta: {
		type: Object,
		required: true,
	},

	/** Row layout - forwarded to FFormRow. */
	layout: {
		type: String,
		default: 'two_columns',
	},

	/** Widget size - forwarded to FFormRow. */
	size: {
		type: String,
		default: 'm',
	},

	/**
	 * Error messages for this widget's fields.
	 * Shape: { field_name: 'Error message string' }
	 * Passed by FGenericForm from its `errors` prop.
	 */
	fieldErrors: {
		type: Object,
		default: () => ({}),
	},
};

/**
 * Standard emits for every form widget (for explicit declaration alongside defineModel).
 */
export const WIDGET_EMITS = ['update:modelValue'];


/**
 * Widget-level composable. Call once per widget.
 *
 * Returns:
 *  - `fields`       - computed array of all field metas (meta.fields)
 *  - `getFieldMeta` - (fieldName: string) => ComputedRef<fieldMeta>; shorthand for multi-field widgets
 *  - `error`        - true when any field has an error; pass to FFormRow :error-highlight
 *
 * @param {import('vue').Ref<Object>} model
 * @param {Object} props  Must include meta and fieldErrors from WIDGET_PROPS.
 */
export function useWidget(model, props) {
	const fields = computed(() => props.meta.fields);

	function getFieldMeta(fieldName) {
		return computed(() => fields.value.find(f => f.field_name === fieldName));
	}

	const error = computed(() => {
		const errs = props.fieldErrors ?? {};
		return Object.values(errs).some(msg => msg != null && msg !== '');
	});

	return { fields, getFieldMeta, error };
}


/**
 * Field-level composable. Call once per rendered input.
 *
 * @param {import('vue').Ref<Object>} model
 * @param {Object} props              Must include fieldErrors from WIDGET_PROPS.
 * @param {import('vue').ComputedRef} meta  A computed ref pointing to the field meta object.
 *                                          Use `computed(() => fields.value[0])` for single-field widgets,
 *                                          or `getFieldMeta(name)` from useWidget for multi-field ones.
 *
 * Returns:
 *  - `id`        - field_name; pass to FFormRow :id and the input's :id
 *  - `name`      - field_name; pass to the input's :name
 *  - `value`     - writable computed; bind with v-model on the input element
 *  - `disabled`  - from field meta
 *  - `readonly`  - from field meta
 *  - `required`  - from field meta
 *  - `error`     - true when this specific field has an error; pass to the input's :error
 *  - `errorText` - this field's error message
 */
export function useWidgetField(model, props, meta) {
	const fieldName = computed(() => meta.value?.field_name);

	// Convenient aliases - both equal field_name.
	const id = fieldName;
	const name = fieldName;

	const value = computed({
		get() { return model.value?.[fieldName.value]; },
		set(val) { model.value = { ...model.value, [fieldName.value]: val }; },
	});

	const disabled = computed(() => meta.value?.disabled ?? false);
	const readonly = computed(() => meta.value?.readonly ?? false);
	const required = computed(() => meta.value?.required ?? false);

	const errorMsg = computed(() => {
		const msg = (props.fieldErrors ?? {})[fieldName.value];
		return (msg != null && msg !== '') ? msg : null;
	});
	const error = computed(() => errorMsg.value !== null);
	const errorText = computed(() => errorMsg.value);

	return { id, name, value, disabled, readonly, required, error, errorText };
}
