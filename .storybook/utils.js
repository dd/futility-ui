import { computed, ref } from 'vue';
import { action } from 'storybook/actions';
import { useArgs } from 'storybook/preview-api';
import throttle from 'lodash/throttle';
import FGenericForm from '@/forms/FGenericForm';


/**
 * Creates a handler to synchronize v-model changes in the component
 * with Storybook's args state.
 *
 * Consider making the throttle configurable if you need different update frequencies.
 *
 * @param {string | [string, string] | [string, string, string]} argOption - Either the name of the argument to update,
 *   or an array with the argument name, argument for listener name and the event name (e.g., `['modelValue', 'onUpdate:modelValue', 'update:modelValue']`).
 * @param {Object} args - All story args from the render function
 *   (`render: (args, { argTypes, updateArgs }) => { ... }`).
 * @param {Function} updateArgs - Storybook's function for updating args
 *   (`render: (args, { argTypes, updateArgs }) => { ... }`).
 *
 * @returns {[string, string, Function]} An array with:
 *   - the arg name for listener emits value changes
 *   - the event name that emits value changes
 *   - a throttled function that updates the Storybook arg
 */
export const makeUpdateArg = (argOption, updateArgs) => {
	const arg = Array.isArray(argOption) ? argOption[0] : argOption;
	const updateArg = Array.isArray(argOption) ? argOption[1] : `onUpdate:${arg}`;
	const updateEvent = Array.isArray(argOption) ? argOption[2] : `update:${arg}`;
	return [
		updateArg,
		updateEvent,
		(newValue) => {
			action(updateArg)(newValue);
			if (updateArgs) {
				setTimeout(() => { updateArgs({ [arg]: newValue }) }, 0);
			}
		},
	];
};


/**
 * Helper to generate a render function for a Storybook story
 * that synchronizes the specified list of arguments (see `makeUpdateArg`).
 *
 * @param {Array<string | [string, string] | [string, string, string]>} updatableArgs - List of arguments to synchronize.
 *
 * @returns {Function} A render function for the Storybook story.
 */
export const makeRenderer = (updatableArgs) => {
	return (args, { argTypes, component }) => {
		const [ , updateArgs ] = useArgs();
		return {
			components: { [component.name]: component },
			props: Object.keys(argTypes),
			setup() {
				const tmpUpdatableArgs = updatableArgs.map(item => {
					return makeUpdateArg(item, updateArgs);
				});

				const newArgs = computed(() => {
					const result = { ...args };

					tmpUpdatableArgs.forEach(([ argKey, eventKey, value ]) => {
						delete result[eventKey];
						result[argKey] = value;
					});

					return result;
				});


				return { args: newArgs };
			},
			template: `<${component.name} v-bind="args" />`,
		};
	};
};


/**
 * Render function for single-widget stories inside FGenericForm.
 *
 * Collects all args whose argType has `table.category === 'meta'` and assembles them
 * into the single meta entry object, then wraps it in an array for FGenericForm.
 * Forwards `layout`, `size → widgetSize`, `fieldErrors → errors`, and `widgets`.
 * The `modelValue` arg is kept in sync with Storybook controls via `makeUpdateArg`.
 *
 * Use for Default / Errors stories where a single widget instance is shown
 * and the user can interact with the form via Storybook controls.
 */
export const makeFGFWidgetRenderer = () => {
	return (args, { argTypes }) => {
		const [ , updateArgs ] = useArgs();
		const metaKeys = Object.keys(argTypes).filter((k) => {
			const categoryOk = argTypes[k]?.table?.category === 'props';
			const subcategoryOk = argTypes[k]?.table?.subcategory === 'meta';
			return categoryOk && subcategoryOk;
		});
		return {
			components: { FGenericForm },
			setup() {
				const modelValueArg = makeUpdateArg('modelValue', updateArgs);
				const formArgs = computed(() => {
					const meta = Object.fromEntries(metaKeys.map(k => [k, args[k]]));
					return {
						'modelValue': args.modelValue,
						[modelValueArg[0]]: modelValueArg[2],
						'meta': [meta],
						'layout': args.layout,
						'widgetSize': args.size,
						'errors': args.fieldErrors,
						'widgets': args.widgets,
					};
				});

				return { formArgs };
			},
			template: '<FGenericForm v-bind="formArgs" />',
		};
	};
};


/**
 * Render function for multi-widget stories inside FGenericForm.
 *
 * Expects `meta` to already be an array of entries and mounts a single
 * `FGenericForm` with all of them. Forwards `layout`, `size → widgetSize`,
 * `fieldErrors → errors`, and `widgets`.
 *
 * Unlike `makeFGFWidgetRenderer`, `modelValue` is held in a local `ref` and is
 * NOT synced back to Storybook controls — intentional for static demo stories
 * (States, Types) where field controls are disabled and the initial values are
 * all that matter.
 *
 * Use when showing multiple field variants side by side with fixed initial values.
 */
export const makeFGFWidgetManyRenderer = () => {
	return (args) => ({
		components: { FGenericForm },
		setup() {
			const modelValue = ref(args.modelValue);
			const formArgs = computed(() => ({
				'meta': args.meta,
				'layout': args.layout,
				'widgetSize': args.size,
				'errors': args.fieldErrors,
				'widgets': args.widgets,
			}));
			return { modelValue, formArgs };
		},
		template: '<FGenericForm v-model="modelValue" v-bind="formArgs" />',
	});
};
