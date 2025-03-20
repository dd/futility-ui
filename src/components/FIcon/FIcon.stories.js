import { useClipboard } from '@vueuse/core';
import { useToast } from 'vue-toastification';

import FIcon from '.';
import { ICON_LIST_SOLID, ICON_LIST_OUTLINE, ICON_LIST_OTHER } from './constants';


export default {
	title: 'FIcon',
	component: FIcon,
	parameters: { layout: 'centered' },
	tags: [ 'autodocs' ],
	argTypes: {
		name: {
			options: [
				...ICON_LIST_SOLID,
				...ICON_LIST_OUTLINE,
				...ICON_LIST_OTHER,
			],
			control: { type: 'select' },
		},
	},
	args: {
		name: 'archive_solid',
	},
};


export const Default = {};


export const Diversity = {
	render: (args, { argTypes, updateArgs }) => ({
		name: 'FIconDiversityStory',
		props: Object.keys(argTypes),
		components: { FIcon },
		setup() {
			const toaster = useToast();
			const copyHandler = (data) => {
				const { copy, isSupported } = useClipboard({ source: data });
				if (isSupported) {
					copy();
					toaster.success('Copied', { timeout: 3000 });
				} else {
					toaster.error('Copying is not supported');
				}
			};
			return { ...args, copyHandler, ICON_LIST_SOLID, ICON_LIST_OUTLINE, ICON_LIST_OTHER };
		},
		template: `
<div class="icon_preview" >
	<FIcon
		v-for="icon in ICON_LIST_SOLID"
		:key="icon"
		:name="icon"
		@click="copyHandler(icon)"
	/>
</div>
<div class="icon_preview" style="margin-top:40px" >
	<FIcon
		v-for="icon in ICON_LIST_OUTLINE"
		:key="icon"
		:name="icon"
		@click="copyHandler(icon)"
	/>
</div>
<div class="icon_preview" style="margin-top:40px" >
	<FIcon
		v-for="icon in ICON_LIST_OTHER"
		:key="icon"
		:name="icon"
		:title="icon"
		@click="copyHandler(icon)"
	/>
</div>
`,
	}),
	argTypes: {
		name: { control: { type: null }},
	},
	args: {
		name: '<name>',
	},
};

export const Scheme = {
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes, updateArgs }) => ({
		name: 'FIconSchemeStory',
		props: Object.keys(argTypes),
		components: { FIcon },
		setup() {
			const toaster = useToast();
			const copyHandler = (data) => {
				const { copy, isSupported } = useClipboard({ source: data });
				if (isSupported) {
					copy();
					toaster.success('Copied', { timeout: 3000 });
				} else {
					toaster.error('Copying is not supported');
				}
			};
			return { ...args, copyHandler, ICON_LIST_SOLID, ICON_LIST_OUTLINE, ICON_LIST_OTHER };
		},
		template: `<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light icon_preview-wrapper" >
		<div class="icon_preview" >
			<FIcon
				v-for="icon in ICON_LIST_SOLID"
				:key="icon"
				:name="icon"
				@click="copyHandler(icon)"
			/>
		</div>
		<div class="icon_preview" style="margin-top:40px" >
			<FIcon
				v-for="icon in ICON_LIST_OUTLINE"
				:key="icon"
				:name="icon"
				@click="copyHandler(icon)"
			/>
		</div>
		<div class="icon_preview" style="margin-top:40px" >
			<FIcon
				v-for="icon in ICON_LIST_OTHER"
				:key="icon"
				:name="icon"
				:title="icon"
				@click="copyHandler(icon)"
			/>
		</div>
	</div>
	<div class="sbpst-dark icon_preview-wrapper" >
		<div class="icon_preview" >
			<FIcon
				v-for="icon in ICON_LIST_SOLID"
				:key="icon"
				:name="icon"
				@click="copyHandler(icon)"
			/>
		</div>
		<div class="icon_preview" style="margin-top:40px" >
			<FIcon
				v-for="icon in ICON_LIST_OUTLINE"
				:key="icon"
				:name="icon"
				@click="copyHandler(icon)"
			/>
		</div>
		<div class="icon_preview" style="margin-top:40px" >
			<FIcon
				v-for="icon in ICON_LIST_OTHER"
				:key="icon"
				:name="icon"
				:title="icon"
				@click="copyHandler(icon)"
			/>
		</div>
	</div>
</div>`,
	}),
	argTypes: {
		name: { control: { type: null }},
	},
	args: {
		name: '<name>',
	},
};
