// This file has been automatically migrated to valid ESM format by Storybook.
import { resolve, dirname } from 'path';
import { loadConfigFromFile } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


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

	async viteFinal(config) {
		const viteConfigPath = path.resolve(__dirname, '../vite.config.js');
		const { config: origConfig } = await loadConfigFromFile({}, viteConfigPath);

		config.build = {
			...config.build,
			'cssTarget': origConfig.build.cssTarget,
			'cssCodeSplit': origConfig.build.cssCodeSplit,
			'treeShaking': origConfig.build.treeShaking,
			'chunkSizeWarningLimit': 1000,
		};

		config.resolve.alias = {
			...config.resolve.alias,
			'./assets/sprite.svg': resolve(__dirname, '../dist/assets/sprite.svg'),
		};
		return config;
	},
};
export default config;
