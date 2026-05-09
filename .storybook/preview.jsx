import React from 'react';
import { setup } from '@storybook/vue3-vite';
import Toast, { TYPE } from 'vue-toastification';
import { createVfm, ModalsContainer } from 'vue-final-modal';
import { Title, Primary, Controls, Stories, Description, Subtitle } from '@storybook/addon-docs/blocks';

import './styles.css';


setup((app) => {
	app.use(createVfm());
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
	decorators: [
		(story) => ({
			components: { story, ModalsContainer },
			template: '<story /><ModalsContainer />',
		}),
	],
	parameters: {
		backgrounds: { disabled: true },
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
					'Contributing',
					'*',
					'FModal',
					[
						'Docs',
						'Default',
						'useFModal',
						'Layouts',
						[
							'FMLayoutDefault',
							'FMLayoutForm',
							'FMLayoutDialog',
						],
					],
					'FTabs',
					[
						'FTabContainer',
						'FTab',
					],
					'Forms',
					[
						'*',
						'FControlLabel',
						'FFormRow',
						'FGenericForm',
					],
				],
			},
		},
		docs: {
			toc: { headingSelector: 'h2, h3' },
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
