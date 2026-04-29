import React from 'react';
import { Title, Primary, Controls, Stories, Markdown, Subtitle, Description } from '@storybook/addon-docs/blocks';
import { computed, onUnmounted } from 'vue';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import FInputAutocomplete from '.';
import { createRestHandlers } from './requestHandlers';


const DEFAULT_DESCRIPTION = `Generates the two handler functions required by \`FInputAutocomplete\`
(\`requestHandler\` and \`requestCurrentHandler\`) from a REST endpoint URL and a field-mapping
function - so you don't have to write fetch boilerplate by hand.

\`\`\`js
import { createRestHandlers } from '@/forms/FInputAutocomplete/requestHandlers';

const { requestHandler, requestCurrentHandler } = createRestHandlers({
	listUrl: '/api/cities/',
	detailUrl: '/api/cities/:id/',    // optional - omit to fall back to a list search
	mapList: (item) => ({ value: item.id, label: item.name }),
});
\`\`\``;


const CITIES = [
	{ id: 1, name: 'Amsterdam' },
	{ id: 2, name: 'Berlin' },
	{ id: 3, name: 'Copenhagen' },
	{ id: 4, name: 'Dublin' },
	{ id: 5, name: 'Edinburgh' },
	{ id: 6, name: 'Frankfurt' },
	{ id: 7, name: 'Geneva' },
	{ id: 8, name: 'Helsinki' },
	{ id: 9, name: 'Istanbul' },
	{ id: 10, name: 'Lisbon' },
	{ id: 11, name: 'London' },
	{ id: 12, name: 'Madrid' },
];

const PAGE_SIZE = 5;


/**
 * Installs a fake `window.fetch` for the duration of a story component's life.
 * Restores the original on unmount.
 *
 * Handles:
 *   GET /api/cities/?search=X&page=N  →  DRF paginated response
 *   GET /api/cities/:id/              →  single item
 */
function useMockFetch(delay = 200) {
	const original = window.fetch;

	window.fetch = (url, options = {}) => {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				if (options.signal?.aborted) {
					reject(new DOMException('Aborted', 'AbortError'));
					return;
				}

				const parsed = new URL(url, window.location.origin);

				// Detail endpoint: /api/cities/3/
				const detailMatch = parsed.pathname.match(/^\/api\/cities\/(\d+)\//);
				if (detailMatch) {
					const city = CITIES.find((c) => c.id === Number(detailMatch[1]));
					resolve(new Response(JSON.stringify(city ?? null), { status: city ? 200 : 404 }));
					return;
				}

				// List endpoint
				const search = (parsed.searchParams.get('search') ?? '').toLowerCase();
				const page = Number(parsed.searchParams.get('page') ?? 1);

				let filtered = CITIES;
				if (search) filtered = filtered.filter((c) => c.name.toLowerCase().includes(search));

				const start = (page - 1) * PAGE_SIZE;
				const slice = filtered.slice(start, start + PAGE_SIZE);
				const next = start + PAGE_SIZE < filtered.length
					? `/api/cities/?page=${page + 1}`
					: null;

				resolve(new Response(JSON.stringify({ count: filtered.length, next, results: slice })));
			}, delay);

			options.signal?.addEventListener('abort', () => clearTimeout(timer));
		});
	};

	onUnmounted(() => { window.fetch = original; });
}


/**
 * Render helper
 * Primitive options (listUrl, detailUrl, searchParam, pageParam, fetchOptions)
 * are read from args so they react to Controls changes.
 * Function options (mapList, mapDetail, getResults, getHasNext) are fixed
 * per story and passed via the config closure.
 */
function makeRender({ mapList, mapDetail, getResults, getHasNext } = {}) {
	return (args) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { FInputAutocomplete },
			setup() {
				useMockFetch(200);

				const handlers = computed(() => {
					const { requestHandler, requestCurrentHandler } = createRestHandlers({
						listUrl: args.listUrl,
						detailUrl: args.detailUrl || null,
						searchParam: args.searchParam,
						pageParam: args.pageParam,
						mapList,
						...(mapDetail != null && { mapDetail }),
						...(getResults != null && { getResults }),
						...(getHasNext != null && { getHasNext }),
						fetchOptions: args.fetchOptions ?? {},
					});
					return {
						requestHandler: fn(requestHandler).mockName('requestHandler'),
						requestCurrentHandler: fn(requestCurrentHandler).mockName('requestCurrentHandler'),
					};
				});

				return {
					handlers,
				};
			},
			template: `<FInputAutocomplete
	v-bind="handlers"
	placeholder-label="Select a city"
	placeholder-filter="Type to filter…"
/>`,
		};
	};
}


export default {
	title: 'Forms/FInputAutocomplete/createRestHandlers',
	parameters: {
		layout: 'centered',
		docs: {
			description: { component: DEFAULT_DESCRIPTION },
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Controls />
					<Stories includePrimary={true} title={null} />
				</>
			),
		},
	},
	tags: [ 'autodocs' ],
	argTypes: {
		listUrl: {
			description: 'URL for the options list endpoint.',
			control: 'text',
			type: { required: true },
			table: {
				category: 'options',
				type: { summary: 'string' },
			},
		},
		detailUrl: {
			description: 'URL for a single item. `:id` is replaced with the selected value. When omitted, falls back to a list search by value.',
			control: 'text',
			table: {
				category: 'options',
				type: { summary: 'string' },
				defaultValue: { summary: 'null' },
			},
		},
		searchParam: {
			description: 'Query param name for the search string.',
			control: 'text',
			table: {
				category: 'options',
				type: { summary: 'string' },
				defaultValue: { summary: "'search'" },
			},
		},
		pageParam: {
			description: 'Query param name for the page number. Sent from page 2 onward.',
			control: 'text',
			table: {
				category: 'options',
				type: { summary: 'string' },
				defaultValue: { summary: "'page'" },
			},
		},
		mapList: {
			description: 'Maps a list API item to `{ value, label }`. Required.',
			control: false,
			type: { required: true },
			table: {
				category: 'options',
				type: {
					summary: '(item) => { value, label }'
				},
			},
		},
		mapDetail: {
			description: 'Maps a detail API item to `{ value, label }`. Defaults to `mapList`.',
			control: false,
			table: {
				category: 'options',
				type: { summary: '(item) => { value, label }' },
				defaultValue: { summary: 'mapList' },
			},
		},
		getResults: {
			description: 'Extracts the items array from the API response.',
			control: false,
			table: {
				category: 'options',
				type: { summary: '(data) => item[]' },
				defaultValue: { summary: 'data.results ?? data' },
			},
		},
		getHasNext: {
			description: 'Returns `true` when more pages exist.',
			control: false,
			table: {
				category: 'options',
				type: { summary: '(data) => boolean' },
				defaultValue: { summary: 'Boolean(data.next)' },
			},
		},
		fetchOptions: {
			description: 'Extra options forwarded to every `fetch` call (e.g. `{ headers: { Authorization: "..." }}`).',
			control: 'object',
			table: {
				category: 'options',
				type: { summary: 'object' },
				defaultValue: { summary: '{}' },
			},
		},
	},
	args: {
		listUrl: '/api/cities/',
		detailUrl: '/api/cities/:id/',
		searchParam: 'search',
		pageParam: 'page',
		fetchOptions: {},
	},
};


export const DRF = {
	name: 'DRF (paginated + detailUrl)',
	parameters: {
		docs: {
			description: {
				story: `Default configuration targeting the [DRF PageNumberPagination](https://www.django-rest-framework.org/api-guide/pagination/#pagenumberpagination) response shape:

\`\`\`json
{ "count": 100, "next": "/api/cities/?page=2", "results": [{ "id": 1, "name": "Amsterdam" }] }
\`\`\`

\`detailUrl\` is provided so that resolving an existing value hits a dedicated endpoint instead of searching the list.

Open the dropdown, type to filter, scroll to load the next page.`,
			},
		},
	},
	args: {
		mapList: (item) => ({ value: item.id, label: item.name }),
	},
	render: makeRender({
		mapList: (item) => ({ value: item.id, label: item.name }),
	}),
};


// ---------------------------------------------------------------------------
// Plain array (no pagination, no detailUrl)
// ---------------------------------------------------------------------------

export const PlainArray = {
	name: 'Plain array response',
	parameters: {
		docs: {
			description: {
				story: `When the API returns a plain JSON array instead of a paginated envelope:

\`\`\`json
[{ "id": 1, "name": "Amsterdam" }, { "id": 2, "name": "Berlin" }]
\`\`\`

Override \`getResults\` and \`getHasNext\` accordingly. Without \`detailUrl\`, resolving an existing value falls back to searching the list and finding the matching item by value.`,
			},
		},
	},
	args: {
		detailUrl: '',
		mapList: (item) => ({ value: item.id, label: item.name }),
		getResults: (data) => (Array.isArray(data) ? data : (data.results ?? [])),
		getHasNext: () => false,
	},
	render: makeRender({
		mapList: (item) => ({ value: item.id, label: item.name }),
		getResults: (data) => (Array.isArray(data) ? data : (data.results ?? [])),
		getHasNext: () => false,
	}),
};


// ---------------------------------------------------------------------------
// Custom shape - override getResults / getHasNext
// ---------------------------------------------------------------------------

export const CustomShape = {
	name: 'Custom response shape',
	parameters: {
		docs: {
			description: {
				story: `Override \`getResults\` and \`getHasNext\` to adapt to any non-standard
response envelope. Also use \`fetchOptions\` to forward custom headers:

\`\`\`js
createRestHandlers({
	listUrl: '/api/cities/',
	mapList: (item) => ({ value: item.id, label: item.name }),
	getResults: (data) => data.items,
	getHasNext: (data) => data.page < data.totalPages,
	fetchOptions: { headers: { Authorization: 'Bearer token' } },
})
\`\`\``,
			},
		},
	},
	args: {
		mapList: (item) => ({ value: item.id, label: item.name }),
		getResults: (data) => data.results ?? [],
		getHasNext: (data) => Boolean(data.next),
	},
	render: makeRender({
		mapList: (item) => ({ value: item.id, label: item.name }),
		getResults: (data) => data.results ?? [],
		getHasNext: (data) => Boolean(data.next),
	}),
};
