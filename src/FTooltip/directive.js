import { h, render } from 'vue';
import FTooltip from './index.vue';


/**
 * Normalises the directive binding value to an options object.
 *
 * Accepted forms:
 * - `v-tooltip="'text'"`
 * - `v-tooltip="{ text: 'Hello', placement: 'bottom', theme: 'tooltip' }"`
 */
function parseOptions(value) {
	if (!value) return {};
	if (typeof value === 'string') return { text: value };
	return value;
}


/**
 * `v-tooltip` directive — mounts FTooltip programmatically on the target element.
 *
 * Simple:
 * ```html
 * <button v-tooltip="'Hello world'">Hover me</button>
 * ```
 *
 * With options:
 * ```html
 * <button v-tooltip="{ text: 'Error!', placement: 'bottom', theme: 'tooltip' }">Field</button>
 * ```
 */
export const vTooltip = {
	mounted(el, binding) {
		render(h(FTooltip, { dirrectiveElement: el, ...parseOptions(binding.value) }), el);
	},
	updated(el, binding) {
		if (binding.value === binding.oldValue) return;
		render(h(FTooltip, { dirrectiveElement: el, ...parseOptions(binding.value) }), el);
	},
	unmounted(el) {
		render(null, el);
	},
};
