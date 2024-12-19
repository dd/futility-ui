import { useClipboard } from '@vueuse/core';
import { useToast } from 'vue-toastification';

import FIconArchiveOutline from './FIconArchiveOutline.vue';
import FIconArchiveDownOutline from './FIconArchiveDownOutline.vue';
import FIconArchiveUpOutline from './FIconArchiveUpOutline.vue';
import FIconArchiveSolid from './FIconArchiveSolid.vue';
import FIconArchiveDownSolid from './FIconArchiveDownSolid.vue';
import FIconArchiveUpSolid from './FIconArchiveUpSolid.vue';
import FIconArrowBottom from './FIconArrowBottom.vue';
import FIconArrowLeft from './FIconArrowLeft.vue';
import FIconArrowRight from './FIconArrowRight.vue';
import FIconArrowTop from './FIconArrowTop.vue';
import FIconBars from './FIconBars.vue';
import FIconCalendarOutline from './FIconCalendarOutline.vue';
import FIconCalendarSolid from './FIconCalendarSolid.vue';
import FIconCheck from './FIconCheck.vue';
import FIconCheckCircleOutline from './FIconCheckCircleOutline.vue';
import FIconCheckCircleSolid from './FIconCheckCircleSolid.vue';
import FIconChevronDown from './FIconChevronDown.vue';
import FIconChevronLeft from './FIconChevronLeft.vue';
import FIconChevronRight from './FIconChevronRight.vue';
import FIconChevronUp from './FIconChevronUp.vue';
import FIconCircleOutline from './FIconCircleOutline.vue';
import FIconCircleSolid from './FIconCircleSolid.vue';
import FIconClose from './FIconClose.vue';
import FIconCloseCircleOutline from './FIconCloseCircleOutline.vue';
import FIconCloseCircleSolid from './FIconCloseCircleSolid.vue';
import FIconCogOutline from './FIconCogOutline.vue';
import FIconCogSolid from './FIconCogSolid.vue';
import FIconCopyOutline from './FIconCopyOutline.vue';
import FIconCopySolid from './FIconCopySolid.vue';
import FIconDotsHorizontal from './FIconDotsHorizontal.vue';
import FIconDotsVertical from './FIconDotsVertical.vue';
import FIconEditOutline from './FIconEditOutline.vue';
import FIconEditSolid from './FIconEditSolid.vue';
import FIconEnvelopeOutline from './FIconEnvelopeOutline.vue';
import FIconEnvelopeSolid from './FIconEnvelopeSolid.vue';
import FIconExclamationCircleOutline from './FIconExclamationCircleOutline.vue';
import FIconExclamationCircleSolid from './FIconExclamationCircleSolid.vue';
import FIconEyeOutline from './FIconEyeOutline.vue';
import FIconEyeSolid from './FIconEyeSolid.vue';
import FIconFilterOutline from './FIconFilterOutline.vue';
import FIconFilterSolid from './FIconFilterSolid.vue';
import FIconInfoCircleOutline from './FIconInfoCircleOutline.vue';
import FIconInfoCircleSolid from './FIconInfoCircleSolid.vue';
import FIconLightbulbOutline from './FIconLightbulbOutline.vue';
import FIconLightbulbSolid from './FIconLightbulbSolid.vue';
import FIconLink from './FIconLink.vue';
import FIconMaximize from './FIconMaximize.vue';
import FIconMinimize from './FIconMinimize.vue';
import FIconMinus from './FIconMinus.vue';
import FIconPhoneOutline from './FIconPhoneOutline.vue';
import FIconPhoneSolid from './FIconPhoneSolid.vue';
import FIconPlus from './FIconPlus.vue';
import FIconPrintOutline from './FIconPrintOutline.vue';
import FIconPrintSolid from './FIconPrintSolid.vue';
import FIconRectangleListOutline from './FIconRectangleListOutline.vue';
import FIconRectangleListSolid from './FIconRectangleListSolid.vue';
import FIconRefresh from './FIconRefresh.vue';


export default {
	title: 'Icons',
	parameters: { layout: 'centered' },
};


const ICON_LIST_SOLID = [
	[ FIconEyeSolid, 'FIconEyeSolid' ],
	[ FIconCheckCircleSolid, 'FIconCheckCircleSolid' ],
	[ FIconCloseCircleSolid, 'FIconCloseCircleSolid' ],
	[ FIconInfoCircleSolid, 'FIconInfoCircleSolid' ],
	[ FIconExclamationCircleSolid, 'FIconExclamationCircleSolid' ],
	[ FIconCircleSolid, 'FIconCircleSolid' ],
	[ FIconRectangleListSolid, 'FIconRectangleListSolid' ],
	[ FIconCalendarSolid, 'FIconCalendarSolid' ],
	[ FIconPhoneSolid, 'FIconPhoneSolid' ],
	[ FIconEnvelopeSolid, 'FIconEnvelopeSolid' ],
	[ FIconEditSolid, 'FIconEditSolid' ],
	[ FIconCogSolid, 'FIconCogSolid' ],
	[ FIconFilterSolid, 'FIconFilterSolid' ],
	[ FIconCopySolid, 'FIconCopySolid' ],
	[ FIconArchiveSolid, 'FIconArchiveSolid' ],
	[ FIconArchiveDownSolid, 'FIconArchiveDownSolid' ],
	[ FIconArchiveUpSolid, 'FIconArchiveUpSolid' ],
	[ FIconPrintSolid, 'FIconPrintSolid' ],
	[ FIconLightbulbSolid, 'FIconLightbulbSolid' ],
];


const ICON_LIST_OUTLINE = [
	[ FIconEyeOutline, 'FIconEyeOutline' ],
	[ FIconCheckCircleOutline, 'FIconCheckCircleOutline' ],
	[ FIconCloseCircleOutline, 'FIconCloseCircleOutline' ],
	[ FIconInfoCircleOutline, 'FIconInfoCircleOutline' ],
	[ FIconExclamationCircleOutline, 'FIconExclamationCircleOutline' ],
	[ FIconCircleOutline, 'FIconCircleOutline' ],
	[ FIconRectangleListOutline, 'FIconRectangleListOutline' ],
	[ FIconCalendarOutline, 'FIconCalendarOutline' ],
	[ FIconPhoneOutline, 'FIconPhoneOutline' ],
	[ FIconEnvelopeOutline, 'FIconEnvelopeOutline' ],
	[ FIconEditOutline, 'FIconEditOutline' ],
	[ FIconCogOutline, 'FIconCogOutline' ],
	[ FIconFilterOutline, 'FIconFilterOutline' ],
	[ FIconCopyOutline, 'FIconCopyOutline' ],
	[ FIconArchiveOutline, 'FIconArchiveOutline' ],
	[ FIconArchiveDownOutline, 'FIconArchiveDownOutline' ],
	[ FIconArchiveUpOutline, 'FIconArchiveUpOutline' ],
	[ FIconPrintOutline, 'FIconPrintOutline' ],
	[ FIconLightbulbOutline, 'FIconLightbulbOutline' ],
];


const ICON_LIST_OTHER = [
	[ FIconArrowTop, 'FIconArrowTop' ],
	[ FIconArrowLeft, 'FIconArrowLeft' ],
	[ FIconArrowRight, 'FIconArrowRight' ],
	[ FIconArrowBottom, 'FIconArrowBottom' ],
	[ FIconChevronUp, 'FIconChevronUp' ],
	[ FIconChevronLeft, 'FIconChevronLeft' ],
	[ FIconChevronRight, 'FIconChevronRight' ],
	[ FIconChevronDown, 'FIconChevronDown' ],
	[ FIconBars, 'FIconBars' ],
	[ FIconDotsHorizontal, 'FIconDotsHorizontal' ],
	[ FIconDotsVertical, 'FIconDotsVertical' ],
	[ FIconClose, 'FIconClose' ],
	[ FIconMaximize, 'FIconMaximize' ],
	[ FIconMinimize, 'FIconMinimize' ],
	[ FIconRefresh, 'FIconRefresh' ],
	[ FIconPlus, 'FIconPlus' ],
	[ FIconMinus, 'FIconMinus' ],
	[ FIconCheck, 'FIconCheck' ],
	[ FIconLink, 'FIconLink' ],
];

export const Icons = {
	render: (args, { argTypes }) => ({
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
			return { args, copyHandler, ICON_LIST_SOLID, ICON_LIST_OUTLINE, ICON_LIST_OTHER };
		},
		template: `
<div class="icon_preview" >
	<component
		:is="icon[0]"
		v-for="icon in ICON_LIST_SOLID"
		:key="icon[1]"
		@click="copyHandler(icon[1])"
	/>
</div>
<div class="icon_preview" style="margin-top:80px" >
	<component
		:is="icon[0]"
		v-for="icon in ICON_LIST_OUTLINE"
		:key="icon[1]"
		@click="copyHandler(icon[1])"
	/>
</div>
<div class="icon_preview" style="margin-top:80px" >
	<component
		:is="icon[0]"
		v-for="icon in ICON_LIST_OTHER"
		:key="icon[1]"
		@click="copyHandler(icon[1])"
	/>
</div>
`,
	}),
};
