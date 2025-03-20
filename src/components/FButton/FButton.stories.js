import { ref, onBeforeUnmount } from 'vue';

import FIcon from '@/components/FIcon';
import { ICON_LIST_SOLID, ICON_LIST_OUTLINE, ICON_LIST_OTHER } from '@/components/FIcon/constants';
import FButton from '.';
import { COMPONENT_TYPES, SIZE_CHOICES, COLOR_CHOICES, DESIGN_CHOICES } from './constants';


export default {
	title: 'FButton',
	component: FButton,
	tags: [ 'autodocs' ],
	parameters: { layout: 'centered' },
	argTypes: {
		type: {
			options: COMPONENT_TYPES,
			control: { type: 'select' },
		},

		color: {
			options: COLOR_CHOICES,
			control: { type: 'select' },
		},

		size: {
			options: SIZE_CHOICES,
			control: { type: 'select' },
		},

		design: {
			options: DESIGN_CHOICES,
			control: { type: 'select' },
		},

		// SLOTS
		default: {
			control: 'text',
			description: 'The text is placed in the default slot.',
			table: {
				category: 'slots',
				type: { summary: 'vnode' },
				defaultValue: { summary: null },
			},
		},
		iconName: {
			name: 'icon',
			control: { type: 'select' },
			options: [ ...ICON_LIST_SOLID, ...ICON_LIST_OUTLINE, ...ICON_LIST_OTHER ],
			description: 'Icon for use inside the icon button.',
			table: {
				category: 'slots',
				type: { summary: 'text' },
				defaultValue: { summary: null },
			},
		},

		// EVENTS
		onClick: {
			action: 'click',
			description: 'Click event.',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
	args: {
		type: 'button',
		color: 'primary',
		size: 'default',
		design: 'normal',
		disabled: false,
		busy: false,
		icon: false,
	},
};


export const Default = {
	render: (args, { argTypes }) => ({
		name: 'FButtonDefaultStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, COMPONENT_TYPES };
		},
		template: `<FButton  v-bind="args" :type="type" >
	<FIcon v-if="args.icon" :name="args.iconName" />
	<template v-else >{{ args.default }}</template>
</FButton>`,
	}),
	args: {
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Types = {
	render: (args, { argTypes }) => ({
		name: 'FButtonTypesStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, COMPONENT_TYPES };
		},
		template: `<table class="preview-table" >
	<tr v-for="type in COMPONENT_TYPES" :key="type" >
		<td class="label" >{{ type }}</td>
		<td>
			<FButton  v-bind="args" :type="type" >
				<FIcon v-if="args.icon" :name="args.iconName" />
				<template v-else >{{ args.default }}</template>
			</FButton>
		</td>
	</tr>
</table>`,
	}),
	argTypes: {
		type: { control: { type: null }},
	},
	args: {
		type: '<type>',
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Icon = {
	render: (args, { argTypes }) => ({
		name: 'FButtonIconStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args };
		},
		template: `<FButton v-bind="args" ><FIcon :name="args.iconName" /></FButton>`,
	}),
	argTypes: {
		icon: { control: { type: null }},
		default: { control: { type: null }},
	},
	args: {
		icon: true,
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Design = {
	render: (args, { argTypes }) => ({
		name: 'FButtonDesignStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, DESIGN_CHOICES };
		},
		template: `<table class="preview-table" >
	<tr v-for="design in DESIGN_CHOICES" :key="design" >
		<td class="label" >{{ design }}</td>
		<td>
			<FButton v-bind="args" :design="design" >
				<FIcon v-if="args.icon" :name="args.iconName" />
				<template v-else >{{ args.default }}</template>
			</FButton>
		</td>
	</tr>
</table>`,
	}),
	argTypes: {
		design: { control: { type: null }},
	},
	args: {
		design: '<design>',
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Sizes = {
	render: (args, { argTypes }) => ({
		name: 'FButtonSizesStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			const sizes = [
				[ SIZE_CHOICES[0], '34px', '20px' ],
				[ SIZE_CHOICES[1], '37px', '28px' ],
				[ SIZE_CHOICES[2], '42px', '34px' ],
				[ SIZE_CHOICES[3], '48px', '40px' ],
				[ SIZE_CHOICES[4], '52px', '44px' ],
			];
			return { args, sizes };
		},
		template: `<table class="preview-table" >
	<tr v-for="size in sizes" :key="size[0]" >
		<td class="label" >{{ size[1] }}</td>
		<td class="label" >{{ size[0] }}</td>
		<td><FButton v-bind="args" :size="size[0]" :icon="false" >{{ args.default }}</FButton></td>
		<td align="right" ><FButton v-bind="args" :size="size[0]" icon ><FIcon :name="args.iconName" /></FButton></td>
		<td class="label" >{{ size[2] }}</td>
	</tr>
</table>`,
	}),
	argTypes: {
		size: { control: { type: null }},
		icon: { control: { type: null }},
	},
	args: {
		icon: 'true|false',
		size: '<size>',
		default: 'Button text',
		iconName: 'plus',
	},
};


export const Busy = {
	render: (args, { argTypes }) => ({
		name: 'FButtonBusyStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args };
		},
		template: `
<FButton v-bind="args" :color="color" >
	<FIcon v-if="args.icon" :name="args.iconName" />
	<template v-else >{{ args.default }}</template>
</FButton>
`,
	}),
	args: {
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
	},
};


export const Colors = {
	render: (args, { argTypes }) => ({
		name: 'FButtonColorsStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, COLOR_CHOICES };
		},
		template: `<table class="preview-table" >
	<tr v-for="color in COLOR_CHOICES" :key="color" >
		<td class="label" >{{ color }}</td>
		<td>
			<FButton v-bind="args" :color="color" >
				<FIcon v-if="args.icon" :name="args.iconName" />
				<template v-else >{{ args.default }}</template>
			</FButton>
		</td>
	</tr>
</table>`,
	}),
	argTypes: {
		color: { control: { type: null }},
	},
	args: {
		color: '<color>',
		default: 'Button text',
		iconName: ICON_LIST_SOLID[0],
	},
};


// export const Busy = {
// 	render: (args, { argTypes }) => ({
// 		name: 'FButtonBusyStory',
// 		props: Object.keys(argTypes),
// 		components: {
// 			FButton,
// 		},
// 		setup() {
// 			let timeout = null;
// 			const isBusy = ref(false);

// 			const handleClick = (e) => {
// 				isBusy.value = true;

// 				timeout = window.setTimeout(() => {
// 					isBusy.value = false;
// 					timeout = null;
// 				}, 3000);
// 			};

// 			onBeforeUnmount(() => {
// 				if (timeout) {
// 					window.clearTimeout(timeout);
// 				}
// 			});

// 			return { args, isBusy, handleClick };
// 		},
// 		template: `<FButton v-bind="args" :busy="isBusy" @click="handleClick" >{{ args.default }}</FButton>
// <p>P.S. К сожалению этот модификатор разработан не для  всех состояний кнопок - например, для кнопки иконки он не тестировался, а так же для случая кнопки текста. Eсли вы это сделаете, будет здорово.</p>`,
// 	}),
// 	argTypes: {
// 		color: { control: { type: null }},
// 	},
// 	args: {
// 		default: 'Button text',
// 	},
// };


export const Scheme = {
	parameters: { layout: 'fullscreen' },
	render: (args, { argTypes }) => ({
		name: 'FButtonSchemeStory',
		props: Object.keys(argTypes),
		components: { FButton, FIcon },
		setup() {
			return { args, COLOR_CHOICES, DESIGN_CHOICES };
		},
		template: `
<div class="sbpst-scheme_preview sbpst-row" >
	<div class="sbpst-light" >
		<table class="preview-table" >
			<tr v-for="color in COLOR_CHOICES" :key="color" >
				<td v-for="design in DESIGN_CHOICES" :key="design" >
					<FButton v-bind="args" :color="color" :design="design" >
						<FIcon v-if="args.icon" :name="args.iconName" />
						<template v-else >{{ args.default }}</template>
					</FButton>
				</td>
			</tr>
		</table>
	</div>
	<div class="sbpst-dark" >
		<table class="preview-table" >
			<tr v-for="color in COLOR_CHOICES" :key="color" >
				<td v-for="design in DESIGN_CHOICES" :key="design" >
					<FButton v-bind="args" :color="color" :design="design" >
						<FIcon v-if="args.icon" :name="args.iconName" />
						<template v-else >{{ args.default }}</template>
					</FButton>
				</td>
			</tr>
		</table>
	</div>
</div>
`,
	}),
	argTypes: {
		color: { control: { type: null }},
		design: { control: { type: null }},
	},
	args: {
		default: 'Button text',
		color: '<color>',
		design: '<design>',
		iconName: ICON_LIST_SOLID[0],
	},
};
