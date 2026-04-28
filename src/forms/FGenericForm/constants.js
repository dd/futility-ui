import { defineAsyncComponent } from 'vue';

const FInputWidget = defineAsyncComponent(() => import('./widgets/FInputWidget.vue'));
const FCheckboxWidget = defineAsyncComponent(() => import('./widgets/FCheckboxWidget.vue'));
const FRadioButtonWidget = defineAsyncComponent(() => import('./widgets/FRadioButtonWidget.vue'));


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
 * Each maps to a native HTML input type.
 */
export const INPUT_WIDGET_TYPES = Object.freeze([
	'text',
	'search',
	'url',
	'tel',
	'email',
	'number',
	'password',
	'date',
	'time',
	'datetime-local',
	'month',
	'week',
]);


const INPUT_WIDGETS = INPUT_WIDGET_TYPES.reduce((acc, type) => {
	acc[type] = {
		component: FInputWidget,
		normalize: (value, field) => field?.allowNull ? (value ?? null) : (value ?? ''),
	};
	return acc;
}, {});

const CHECKBOX_WIDGETS = {
	checkbox: {
		component: FCheckboxWidget,
		normalize: (value, field) => field?.allowNull ? (value ?? null) : (value ?? false),
	},
};

const RADIO_WIDGETS = {
	radio: {
		component: FRadioButtonWidget,
		normalize: (value, field) => value ?? null,
	},
};

/**
 * Built-in widget registry.
 * type → { component, normalize? }
 *
 * All text/date/number inputs share FInputWidget.
 * The widget reads meta.type to set the correct HTML input type.
 */
export const DEFAULT_WIDGETS = {
	...INPUT_WIDGETS,
	...CHECKBOX_WIDGETS,
	...RADIO_WIDGETS,
};
