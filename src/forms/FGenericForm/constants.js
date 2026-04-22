import { defineAsyncComponent } from 'vue';

const FInputWidget = defineAsyncComponent(() => import('./widgets/FInputWidget.vue'));


export const LAYOUT_CHOICES = [
	'auto',
	'one_column',
	'two_columns',
];

export const SIZE_CHOICES = [
	// '3xs',
	// '2xs',
	// 'xs',
	's',
	'm',
	// 'l',
	'xl',
];

/**
 * Meta types that FInputWidget can handle.
 * Each maps to a native HTML input type; 'string' is a common API alias for 'text'.
 */
export const INPUT_WIDGET_TYPES = Object.freeze([
	'string',           // API alias → <input type="text">
	'text',
	'search',
	'url',
	'tel',
	'email',
	'number',
	'password',
	// 'date',
	// 'time',
	// 'datetime-local',
	// 'month',
	// 'week',
]);


const INPUT_WIDGETS = INPUT_WIDGET_TYPES.reduce((acc, type) => {
	acc[type] = {
		component: FInputWidget,
		normalize: (value) => value ?? '',
	};
	return acc;
}, {});

/**
 * Built-in widget registry.
 * type → { component, normalize? }
 *
 * All text/date/number inputs share FInputWidget.
 * The widget reads meta.type to set the correct HTML input type.
 */
export const DEFAULT_WIDGETS = INPUT_WIDGETS;
