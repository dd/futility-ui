import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { version } from './package.json';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'


export default defineConfig({
	plugins: [
		vue(),
		VitePluginSvgSpritemap(
			'./src/components/FIcon/icons/*.svg',
			{
				output: {
					name: 'sprite.svg',
					filename: 'sprite[extname]',
					use: false,
					view: false,
				},
				prefix: 'ficon-',
			},
		),
	],
	define: {
		__VERSION__: JSON.stringify(version),
	},
	build: {
		lib: {
			name: 'Futility UI',
			entry: resolve(__dirname, 'src/index.js'),
			fileName: (format) => `futility-ui.${format}.js`,
			formats: [ 'es', 'cjs' ],
		},
		rollupOptions: {
			external: [ 'vue' ],
			input: {
				main: './src/index.js',
				styles: './src/styles.sass',
				theme: './src/theme.sass',
			},
			output: {
				globals: {
					vue: 'Vue',
				},
				assetFileNames: (assetInfo) => {
					if (assetInfo.name.endsWith('.css')) {
						return 'styles/[name][extname]';
					}

					return 'assets/[name][extname]';
				},
			},
		},
		cssCodeSplit: true,
	},
	server: {
		fs: {
			allow: ['.storybook'],
		},
	},
	resolve: {
		extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mdx', '.less', '.scss', '.sass' ],
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'futility-ui': '@',
		},
	},
});
