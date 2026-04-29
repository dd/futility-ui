# FInputAutocomplete

An input with a searchable dropdown that loads options on demand. The component is intentionally
decoupled from any data source - you supply two async functions, and the component handles the rest:
loading states, pagination, request cancellation, and keyboard navigation.

### Key features

- **On-demand fetching** - options are requested as the user types; each keystroke cancels the
	previous in-flight request via `AbortController`
- **Infinite scroll pagination** - when the user scrolls to the bottom of the dropdown, the next
	page is fetched automatically
- **Keyboard navigation** - `↑` / `↓` to move through the list, `Enter` to select; disabled
	options and (when `required`) the already-selected option are skipped
- **Current value resolution** - when a value is set externally (e.g. on initial load),
	`requestCurrentHandler` is called to fetch the matching label
- **Deselect on re-click** - clicking the already-selected option clears the value (unless
	`required` is set)

### Usage

```js
import { FInputAutocomplete } from 'futility-ui';
// or
import FInputAutocomplete from 'futility-ui/forms/FInputAutocomplete';
```

```html
<FInputAutocomplete
	v-model="value"
	name="city"
	placeholder-label="City"
	placeholder-filter="Search..."
	:request-handler="fetchCities"
	:request-current-handler="fetchCityById"
/>
```

```js
// requestHandler receives (query, page, { signal }) and must return a Promise:
async function fetchCities(query, page, { signal }) {
	const res = await fetch(`/api/cities?q=\${query}&page=\${page}`, { signal });
	const data = await res.json();
	return {
		options: data.items,  // [{ value, label, disabled? }]
		hasNext: data.hasNext,
	};
}

// requestCurrentHandler receives the stored value and must return a Promise<option>:
async function fetchCityById(value) {
	const res = await fetch(`/api/cities/\${value}`);
	return res.json(); // { value, label }
}
```
