import { useArgs } from 'storybook/preview-api';
import throttle from 'lodash/throttle';


/**
 * Creates a handler to synchronize v-model changes in the component
 * with Storybook's args state.
 *
 * Consider making the throttle configurable if you need different update frequencies.
 *
 * @param {string | [string, string]} argOption - Either the name of the argument to update,
 *   or an array with the argument name and the event name (e.g., `['value', 'input']`).
 * @param {Object} args - All story args from the render function
 *   (`render: (args, { argTypes, updateArgs }) => { ... }`).
 * @param {Function} updateArgs - Storybook's function for updating args
 *   (`render: (args, { argTypes, updateArgs }) => { ... }`).
 *
 * @returns {[string, Function]} An array with:
 *   - the event name that emits value changes
 *   - a throttled function that updates the Storybook arg
 */
export const makeUpdateArg = (argOption, args, updateArgs) => {
	const arg = Array.isArray(argOption) ? argOption[0] : argOption;
	const updateArg = `update:${arg}`;
	const onUpdateArg = Array.isArray(argOption) ? argOption[1] : `onUpdate:${arg}`;

	return [
		onUpdateArg,
		throttle((newValue) => {
			if (onUpdateArg in args) {
				args[onUpdateArg](newValue);
			}

			if (updateArg in args) {
				args[updateArg](newValue);
			}

			updateArgs({ [arg]: newValue });
		}, 300, { trailing: true }),
	];
};


/**
 * Helper to generate a render function for a Storybook story
 * that synchronizes the specified list of arguments (see `makeUpdateArg`).
 *
 * @param {Array<string | [string, string]>} updatableArgs - List of arguments to synchronize.
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
				const promisedArgs = updatableArgs.reduce((acc, argOption) => {
					const updateArg = makeUpdateArg(argOption, args, updateArgs);
					acc[updateArg[0]] = updateArg[1];
					return acc;
				}, {});

				return { args, promisedArgs };
			},
			template: `<${component.name} v-bind="{ ...args, ...promisedArgs }" />`,
		};
	};
};
