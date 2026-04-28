const DEFAULT_NORMALIZERS = {
	string: (value) => {
		if (value === undefined || value === null || value === '') return '';
		return value;
	},
};

function getNormalize(widgets, type) {
	if (widgets?.[type]?.normalize) return widgets[type].normalize;
	if (DEFAULT_NORMALIZERS[type]) return DEFAULT_NORMALIZERS[type];
	return (value) => value ?? null;
}

/**
 * Extract default values from form meta.
 *
 * If a field has an explicit `default` key, that value is used as-is.
 * If `default` is absent, the widget's normalize function is called with
 * `undefined` to derive a type-appropriate empty value (e.g. '' for text,
 * false for checkbox). This way a text field without an explicit default
 * never starts as null unless allowNull is true.
 *
 * @param {Array} meta - Form field metadata array
 * @param {Object} [widgets] - Widget config with optional normalize functions per type
 * @returns {Object} Object with fieldName: default_value pairs
 */
export function getFormDefaults(meta, widgets) {
	const defaults = {};
	for (const entry of meta) {
		for (const field of entry.fields) {
			if ('default' in field) {
				defaults[field.fieldName] = field.default;
			} else {
				const normalize = getNormalize(widgets, entry.type);
				defaults[field.fieldName] = normalize(undefined, field);
			}
		}
	}
	return defaults;
}

/**
 * Get diff between current data and original data, respecting field-type normalization.
 * Only returns fields whose normalized values differ.
 * @param {Array} meta - Form field metadata array
 * @param {Object} currentData - Current form data
 * @param {Object} originalData - Original/reference form data
 * @param {Object} [widgets] - Widget config with optional normalize functions per type
 * @returns {Object} Object containing only changed fieldName: value pairs
 */
export function getDiff(meta, currentData, originalData, widgets) {
	const diff = {};
	for (const entry of meta) {
		const normalize = getNormalize(widgets, entry.type);
		for (const field of entry.fields) {
			const current = normalize(currentData?.[field.fieldName], field);
			const original = normalize(originalData?.[field.fieldName], field);
			if (current !== original) {
				diff[field.fieldName] = currentData?.[field.fieldName];
			}
		}
	}
	return diff;
}

/**
 * Get data suitable for query parameters - only values that differ from defaults.
 * @param {Array} meta - Form field metadata array
 * @param {Object} currentData - Current form data
 * @param {Object} [widgets] - Widget config with optional normalize functions per type
 * @returns {Object} Object containing only non-default fieldName: value pairs
 */
export function getDataForQuery(meta, currentData, widgets) {
	return getDiff(meta, currentData, getFormDefaults(meta, widgets), widgets);
}
