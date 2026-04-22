import { computed } from 'vue';

export { getFormDefaults, getDiff, getDataForQuery } from './utils';
export { DEFAULT_WIDGETS } from './constants';

/**
 * Standard props that every form widget must declare.
 * Spread into defineProps: defineProps({ ...WIDGET_PROPS })
 */
export const WIDGET_PROPS = {
	meta: {
		type: Object,
		required: true,
	},

	/** Passed from FGenericForm; forwarded to FFormRow inside the widget. */
	layout: {
		type: String,
		default: 'two_columns',
	},

	/** Passed from FGenericForm; forwarded to FFormRow inside the widget. */
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
 * Composable providing base functionality for form widgets.
 *
 * @param {import('vue').Ref<Object>} model - The model ref from defineModel() (widget's v-model data object)
 * @param {Object} props - Component props (must include `meta` from WIDGET_PROPS)
 *
 * For single-field widgets, use `value` as a convenient scalar computed.
 * For multi-field widgets, use `fieldModel(fieldName)` to create a computed per field.
 */
export function useWidget(model, props) {
	const fields = computed(() => props.meta.fields);
	const fieldMeta = computed(() => fields.value[0]);

	// Scalar computed for single-field widgets (first field's value).
	const value = computed({
		get() {
			return model.value?.[fieldMeta.value?.field_name];
		},
		set(val) {
			model.value = { ...model.value, [fieldMeta.value?.field_name]: val };
		},
	});

	/**
	 * Create a writable computed for a specific field by name.
	 * Useful for multi-field widgets (e.g. price_from / price_to).
	 */
	function fieldModel(fieldName) {
		return computed({
			get() {
				return model.value?.[fieldName];
			},
			set(val) {
				model.value = { ...model.value, [fieldName]: val };
			},
		});
	}

	function getFieldMeta(fieldName) {
		return fields.value.find(f => f.field_name === fieldName);
	}

	const disabled = computed(() => fieldMeta.value?.disabled ?? false);
	const readonly_ = computed(() => fieldMeta.value?.readonly ?? false);
	const required = computed(() => fieldMeta.value?.required ?? false);

	// true when any of this widget's fields has an error message.
	const error = computed(() => {
		const errs = props.fieldErrors ?? {};
		return Object.values(errs).some(msg => msg != null && msg !== '');
	});

	// First non-empty error message — passed to FFormRow's errorText / errorHighlight.
	const errorText = computed(() => {
		const errs = props.fieldErrors ?? {};
		return Object.values(errs).find(msg => msg != null && msg !== '') ?? null;
	});

	return {
		model,
		fields,
		fieldMeta,
		value,
		fieldModel,
		getFieldMeta,
		disabled,
		readonly: readonly_,
		required,
		error,
		errorText,
	};
}
