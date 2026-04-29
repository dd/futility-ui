/**
 * Creates `requestHandler` and `requestCurrentHandler` for `FInputAutocomplete`
 * from a REST API endpoint.
 *
 * Supports DRF-style paginated responses `{ count, next, results: [] }`
 * and plain array responses out of the box. Override `getResults` / `getHasNext`
 * to adapt to any other shape.
 *
 * @example
 * // In FGenericForm meta:
 * {
 *   type: 'autocomplete',
 *   label: 'City',
 *   fields: [{ fieldName: 'city_id', default: null }],
 *   ...createRestHandlers({
 *     listUrl: '/api/cities/',
 *     detailUrl: '/api/cities/:id/',
 *     mapList: (item) => ({ value: item.id, label: item.name }),
 *   }),
 * }
 *
 * @param {object}   options
 * @param {string}   options.listUrl             - URL for the options list endpoint.
 * @param {string}   [options.detailUrl]         - URL for a single item, with `:id` placeholder.
 *                                                 When omitted, falls back to a list search by value.
 * @param {string}   [options.searchParam='search'] - Query param name for the search string.
 * @param {string}   [options.pageParam='page']  - Query param name for the page number.
 * @param {Function} options.mapList             - Maps a list API item to `{ value, label }`.
 * @param {Function} [options.mapDetail]         - Maps a detail API item to `{ value, label }`.
 *                                                 Defaults to `mapList`.
 * @param {Function} [options.getResults]        - Extracts the items array from the API response.
 *                                                 Defaults to DRF `data.results` with plain-array fallback.
 * @param {Function} [options.getHasNext]        - Returns `true` when more pages exist.
 *                                                 Defaults to checking DRF `data.next`.
 * @param {object}   [options.fetchOptions]      - Extra options forwarded to every `fetch` call
 *                                                 (e.g. `{ headers: { Authorization: '...' }}`).
 *
 * @returns {{ requestHandler: Function, requestCurrentHandler: Function }}
 */
export function createRestHandlers({
	listUrl,
	detailUrl = null,
	searchParam = 'search',
	pageParam = 'page',
	mapList,
	mapDetail = null,
	getResults = (data) => Array.isArray(data) ? data : (data.results ?? []),
	getHasNext = (data) => Array.isArray(data) ? false : Boolean(data.next),
	fetchOptions = {},
}) {
	const resolveItem = mapDetail ?? mapList;

	const requestHandler = async (query, page, { signal }) => {
		const url = new URL(listUrl, window.location.origin);
		if (query) url.searchParams.set(searchParam, query);
		if (page > 1) url.searchParams.set(pageParam, String(page));

		const response = await fetch(url.toString(), { signal, ...fetchOptions });
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}
		const data = await response.json();
		return {
			options: getResults(data).map(mapList),
			hasNext: getHasNext(data),
		};
	};

	const requestCurrentHandler = async (value) => {
		if (detailUrl) {
			const url = detailUrl.replace(':id', encodeURIComponent(value));
			const response = await fetch(url, fetchOptions);
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}
			const data = await response.json();
			return resolveItem(data);
		}

		// Fallback: search the list and find the matching item by value.
		const url = new URL(listUrl, window.location.origin);
		url.searchParams.set(searchParam, String(value));
		const response = await fetch(url.toString(), fetchOptions);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}
		const data = await response.json();
		const item = getResults(data).find((i) => mapList(i).value === value);
		return item ? resolveItem(item) : { value, label: String(value) };
	};

	return { requestHandler, requestCurrentHandler };
}
