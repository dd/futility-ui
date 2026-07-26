import { computed } from 'vue';
import { useArgs } from 'storybook/preview-api';

import FIcon from '@/FIcon';
import { makeUpdateArg } from '@/sb.stuff.js';
import FHeader from './index.vue';
import FHeaderNav from './FHeaderNav.vue';
import FHeaderBurger from './FHeaderBurger.vue';


export const Logo = {
	components: { FIcon },
	template: `<a href="#" class="sbfui-fheader-logo">
	<span class="sbfui-fheader-logo-icon"><FIcon name="infinity" /></span>
	<span>Flowbite</span>
</a>`,
};


export const HeaderActions = {
	template: `<div class="sbfui-fheader-actions">
	<a href="#" class="sbfui-fheader-actions-link">Log in</a>
	<a href="#" class="sbfui-fheader-actions-button">Get started</a>
</div>`,
};


export const LangSwitcher = {
	template: `<button type="button" class="sbfui-fheader-lang">EN</button>`,
};


export const NAV_ITEMS = [
	{
		label: 'Company',
		children: [
			{
				label: 'About us',
				icon: 'users_solid',
				description: 'Who we are',
				url: '#about',
			},
			{
				label: 'Careers',
				icon: 'archive_solid',
				url: '#careers',
			},
			{
				label: 'Creative Tools',
				icon: 'cog_solid',
				children: [
					{ label: 'Marketing CRM', url: '#crm' },
					{ label: 'Signup Forms', url: '#forms' },
					{ label: 'A/B Testing', url: '#testing' },
				],
			},
			{ divider: true },
			{
				label: 'Contact',
				icon: 'profile_card_solid',
				url: '#contact',
			},
		],
	},
	{ label: 'Marketplace', url: '#marketplace' },
	{ label: 'Features', url: '#features' },
	{ label: 'Team', url: '#team' },
	{ label: 'Contact', url: '#contact' },
];


export const MANY_ITEMS = [
	...NAV_ITEMS,
	{ label: 'Pricing', url: '#pricing' },
	{ label: 'Docs', url: '#docs' },
	{ label: 'Support', url: '#support' },
	{ label: 'Blog', url: '#blog' },
];


const createHeaderArgs = (args, updateArgs) => {
	const menuOpenArg = makeUpdateArg('menuOpen', updateArgs);

	return computed(() => {
		const {
			menuOpenEvent,
			menuCloseEvent,
			itemClick,
			items,
			...result
		} = args;

		result[menuOpenArg[0]] = menuOpenArg[2];
		result.onMenuOpen = menuOpenEvent;
		result.onMenuClose = menuCloseEvent;

		return result;
	});
};


export const DEFAULT_HEADER_TEMPLATE = `<div class="sbfui-fheader-canvas">
	<FHeader v-bind="headerArgs">
		<template #left><Logo /></template>
		<template #center>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
		<template #right="{ isMobile }">
			<HeaderActions v-if="!isMobile" />
			<FHeaderBurger />
		</template>
		<template #menu>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
		<template #menu-bottom>
			<LangSwitcher />
			<HeaderActions />
		</template>
	</FHeader>
</div>`;


export const renderHeader = (template = DEFAULT_HEADER_TEMPLATE) => (args) => {
	const [ , updateArgs ] = useArgs();

	return {
		components: {
			FHeader,
			FHeaderNav,
			FHeaderBurger,
			Logo,
			HeaderActions,
			LangSwitcher,
		},
		setup() {
			return {
				headerArgs: createHeaderArgs(args, updateArgs),
				items: computed(() => args.items),
				onItemClick: args.itemClick,
			};
		},
		template,
	};
};
