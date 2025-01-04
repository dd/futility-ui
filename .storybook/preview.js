import { setup } from '@storybook/vue3';
import Toast, { TYPE } from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import '../.storybook/styles.sass';

import '@/styles.sass';
import '@/theme.sass';


setup((app) => {
	app.use(Toast, {
		position: 'bottom-left',
		newestOnTop: false,
		maxToasts: 10,
		toastClassName: 'dashboard-toast',
		toastDefaults: {
			[TYPE.ERROR]: {
				timeout: 15000,
			},
		},
	});
});


/** @type { import('@storybook/vue3').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
