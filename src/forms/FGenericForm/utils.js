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
 * @param {Array} meta - Form field metadata array
 * @returns {Object} Object with fieldName: default_value pairs
 */
export function getFormDefaults(meta) {
	const defaults = {};
	for (const entry of meta) {
		for (const field of entry.fields) {
			defaults[field.fieldName] = 'default' in field ? field.default : null;
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
	return getDiff(meta, currentData, getFormDefaults(meta), widgets);
}
