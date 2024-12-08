import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: 'src/index.js',
			name: 'Futility UI',
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
});
