// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { resolve, dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],

	addons: [
		// '@storybook/addon-links',
		// '@storybook/addon-essentials',
		'@chromatic-com/storybook',
		// '@storybook/addon-interactions',
		// 'storybook-addon-mock',
		'storybook-preview-scheme-toggler',
		'@storybook/addon-docs',
		// '@storybook/addon-actions',
		'storybook/actions',
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
