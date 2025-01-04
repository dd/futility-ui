import { useClipboard } from '@vueuse/core';
import { useToast } from 'vue-toastification';

import FIcon from '.';


const ICON_LIST_SOLID = [
	'archive_solid',
	'archive_up_solid',
	'archive_down_solid',
	'calendar_solid',
	'check_circle_solid',
	'circle_solid',
	'close_circle_solid',
	'cog_solid',
	'copy_solid',
	'edit_solid',
	'envelope_solid',
	'exclamation_circle_solid',
	'eye_solid',
	'filter_solid',
	'info_circle_solid',
	'lightbulb_solid',
	'phone_solid',
	'print_solid',
	'rectangle_list_solid',
];


const ICON_LIST_OUTLINE = [
	'archive_outline',
	'archive_up_outline',
	'archive_down_outline',
	'calendar_outline',
	'check_circle_outline',
	'circle_outline',
	'close_circle_outline',
	'cog_outline',
	'copy_outline',
	'edit_outline',
	'envelope_outline',
	'exclamation_circle_outline',
	'eye_outline',
	'filter_outline',
	'info_circle_outline',
	'lightbulb_outline',
	'phone_outline',
	'print_outline',
	'rectangle_list_outline',
];


const ICON_LIST_OTHER = [
	'arrow_bottom',
	'arrow_left',
	'arrow_right',
	'arrow_top',
	'bars',
	'calendar',
	'check',
	'chevron_down',
	'chevron_left',
	'chevron_right',
	'chevron_up',
	'close',
	'dots_horizontal',
	'dots_vertical',
	'infinity',
	'link',
	'maximize',
	'minimize',
	'minus',
	'plus',
	'rectangle_list_outline',
	'refresh',
];


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
		name: 'FIconDefaultStory',
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
		:key="icon[1]"
		:name="icon"
		@click="copyHandler(icon[1])"
	/>
</div>
<div class="icon_preview" style="margin-top:80px" >
	<FIcon
		v-for="icon in ICON_LIST_OUTLINE"
		:key="icon[1]"
		:name="icon"
		@click="copyHandler(icon[1])"
	/>
</div>
<div class="icon_preview" style="margin-top:80px" >
	<FIcon
		v-for="icon in ICON_LIST_OTHER"
		:key="icon[1]"
		:name="icon"
		:title="icon"
		@click="copyHandler(icon[1])"
	/>
</div>
`,
	}),
	argTypes: {
		name: { control: { type: null }},
	},
};
