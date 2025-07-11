import React from 'react';
import { setup } from '@storybook/vue3-vite';
import Toast, { TYPE } from 'vue-toastification';
import { Title, Primary, Controls, Stories, Description, Subtitle } from '@storybook/addon-docs/blocks';

import 'vue-toastification/dist/index.css';
import './styles.sass';

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


/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
	parameters: {
		backgrounds: { disable: true },
		previewSchemeToggler: {
			darkColor: 'var(--fui-color-gray-400)',
			lightColor: 'var(--fui-color-gray-600)',
			darkBackground: 'var(--fui-color-gray-900)',
			lightBackground: 'var(--fui-color-white)',
		},
		options: {
			storySort: {
				order: [
					'Introduction',
					'*',
				],
			},
		},
		docs: {
			toc: true,
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Controls />
					<Stories includePrimary={false} title={null} />
				</>
			),
		},
	},
};

export default preview;
