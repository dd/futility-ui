import { resolve } from 'path';


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
		'storybook-preview-scheme-toggler',
	],

	framework: {
		name: '@storybook/vue3-vite',
		options: {},
	},

	viteFinal(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			'./assets/sprite.svg': resolve(__dirname, '../dist/assets/sprite.svg'),
		};
		config.build.chunkSizeWarningLimit = 1000;
		return config;
	},
};
export default config;
