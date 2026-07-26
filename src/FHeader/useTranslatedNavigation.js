import { computed, toValue } from 'vue';


const translateValue = (translate, value, params) => {
	if (typeof value !== 'string') return value;

	const resolvedParams = toValue(params);
	return resolvedParams === undefined
		? translate(value)
		: translate(value, resolvedParams);
};


const translateItems = (items, translate) => items.map((item) => {
	const result = { ...item };

	if (item.translate !== false) {
		if (typeof item.label === 'string') {
			result.label = translateValue(translate, item.label, item.labelParams);
		}

		if (typeof item.description === 'string') {
			result.description = translateValue(
				translate,
				item.description,
				item.descriptionParams,
			);
		}
	}

	if (Array.isArray(item.children)) {
		result.children = translateItems(item.children, translate);
	}

	return result;
});


/**
 * Reactively translates the standard text fields in an FHeaderNav item tree.
 *
 * `label` and `description` are treated as translation keys. Optional
 * `labelParams` and `descriptionParams` are forwarded as the second argument
 * to the translation function. Set `translate: false` on an item to keep its
 * own text fields unchanged; its children are still translated recursively.
 *
 * The source may be a plain array, ref, computed ref, or getter. Passing only
 * the translation function (rather than an i18n instance) keeps this helper
 * independent of a particular internationalisation library.
 *
 * @param {Array | import('vue').Ref<Array> | Function} source navigation item tree
 * @param {Function} translate translation function such as vue-i18n's `t`
 * @returns {import('vue').ComputedRef<Array>}
 */
export const useTranslatedNavigation = (source, translate) => {
	if (typeof translate !== 'function') {
		throw new TypeError('useTranslatedNavigation expects a translation function.');
	}

	return computed(() => {
		const items = toValue(source);

		if (!Array.isArray(items)) {
			throw new TypeError('useTranslatedNavigation expects an array source.');
		}

		return translateItems(items, translate);
	});
};
