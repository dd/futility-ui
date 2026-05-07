import { computed } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/sb.stuff.js';
import FTabsContainer from './FTabsContainer';
import FTab from './FTab';


export default {
	title: 'FTabs/FTab',
	component: FTab,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		slug: {
			table: { defaultValue: { summary: 'slugify(name)' }},
		},
		disabled: {
			table: { defaultValue: { summary: 'false' }},
		},
		// slots
		default: {
			control: { type: null },
			description: 'Tab content, rendered only when the tab is active.',
			table: { category: 'slots', type: { summary: 'vnode' }},
		},
	},
	args: {
		name: 'Tab title',
		slug: '',
		disabled: false,
		tag: '',
	},
};


const DEFAULT_TEMP = `<div style="min-width: 320px" >
	<FTabsContainer>
		<FTab v-bind="args"><p>Content of "{{ args.name }}".</p></FTab>
		<FTab name="Other tab"><p>Other tab content.</p></FTab>
	</FTabsContainer>
</div>`;


export const Default = {
	render: (args) => {
		return {
			name: 'FTabDefaultStory',
			components: { FTabsContainer, FTab },
			setup: () => ({ args }),
			template: DEFAULT_TEMP,
		};
	},
};


const WITH_TAG_TEMP = `<div style="min-width: 320px">
	<FTabsContainer>
		<FTab name="With tag" tag="div">
			<p>Этот таб обёрнут в <code>&lt;div&gt;</code>.</p>
			<p>Удобно когда нужен единый корневой элемент — например для <code>&lt;Transition&gt;</code>.</p>
		</FTab>
		<FTab name="Without tag">
			<p>Этот таб рендерится как фрагмент — без обёртки в DOM.</p>
		</FTab>
	</FTabsContainer>
</div>`;


export const WithTag = {
	render: () => ({
		name: 'FTabWithTagStory',
		components: { FTabsContainer, FTab },
		template: WITH_TAG_TEMP,
	}),
};
