/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		// '@storybook/addon-links',
		'@storybook/addon-onboarding',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		// 'storybook-addon-mock',
		// './scheme-toggler',
		'storybook-preview-scheme-toggler',
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},
	viteFinal: (config) => {
		config.base = process.env.BASE_URL || '/';
		return config;
	},
};
export default config;
