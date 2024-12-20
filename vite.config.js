import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { version } from './package.json';


console.log(version);



export default defineConfig({
	plugins: [vue()],
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
			output: {
				globals: {
					vue: 'Vue',
				},
			},
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
