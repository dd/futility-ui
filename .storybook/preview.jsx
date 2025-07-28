import React from 'react';
import { setup } from '@storybook/vue3-vite';
import Toast, { TYPE } from 'vue-toastification';
import { Title, Primary, Controls, Stories, Description, Subtitle } from '@storybook/addon-docs/blocks';

import 'vue-toastification/dist/index.css';
import './styles-fui.css';


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
			darkColor: 'var(--pst-dark-color)',
			lightColor: 'var(--pst-light-color)',
			darkBackground: 'var(--pst-dark-bg)',
			lightBackground: 'var(--pst-light-bg)',
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
