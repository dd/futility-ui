export const getItemChildren = (item) => (Array.isArray(item?.children) ? item.children : []);


export const hasItemChildren = (item) => getItemChildren(item).length > 0;


export const hasChildContent = (item) => hasItemChildren(item) || Boolean(item?.childComponent);


export const isItemLink = (item) => Boolean(item?.url);


/**
 * URLs that must never go through a router link component:
 * absolute (`https:`, `mailto:`, `tel:`, …), protocol-relative and hash-only.
 */
export const isPlainUrl = (url = '') => /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url);


/**
 * Resolves the element/component a link item should render as.
 *
 * @returns {{ is: String | Object, urlAttrs: Object }}
 */
export const resolveItemElement = (item, linkComponent = null) => {
	if (!item.url) {
		return { is: 'button', urlAttrs: { type: 'button' } };
	}

	if (linkComponent && !item.external && !isPlainUrl(item.url)) {
		return { is: linkComponent, urlAttrs: { to: item.url } };
	}

	return { is: 'a', urlAttrs: { href: item.url } };
};


/**
 * Merges item `attrs` with the attributes managed by the component.
 * Managed attributes (`href`/`to`, `type`, aria, `disabled`, `tabindex`) win.
 */
export const buildItemAttrs = (item, managedAttrs = {}) => {
	const attrs = {
		...(item.attrs ?? {}),
		...managedAttrs,
	};

	if (item.disabled) {
		attrs['aria-disabled'] = 'true';
		if (attrs.type === 'button') {
			attrs.disabled = true;
		} else {
			attrs.tabindex = -1;
		}
	}

	return attrs;
};


export const getComponentArgs = (item, sourceKey, fallback = {}) => ({
	...fallback,
	...(item?.[sourceKey] ?? {}),
	item,
});
