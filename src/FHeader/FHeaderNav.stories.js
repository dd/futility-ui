import { computed, ref } from 'vue';

import FIcon from '@/FIcon';
import FHeader from './index.vue';
import FHeaderNav from './FHeaderNav.vue';
import FHeaderBurger from './FHeaderBurger.vue';
import { useTranslatedNavigation } from './useTranslatedNavigation';
import {
	HEADER_APPEARANCE_CHOICES,
	HEADER_DROPDOWN_PLACEMENT_CHOICES,
	HEADER_DROPDOWN_TRIGGER_CHOICES,
} from './constants';
import { HeaderActions, Logo, MANY_ITEMS, NAV_ITEMS } from './storySupport';


const ITEM_KINDS = [
	{ label: 'Link', url: '#link' },
	{ label: 'Active', url: '#active', active: true },
	{ label: 'Action' },
	{ label: 'Disabled', url: '#disabled', disabled: true },
	{
		label: 'Menu',
		children: [
			{ label: 'Plain link', url: '#plain' },
			{ label: 'With icon', icon: 'cog_solid', url: '#icon' },
			{
				label: 'With description',
				icon: 'lightbulb_solid',
				description: 'A second muted line under the label',
				url: '#description',
			},
			{ divider: true },
			{
				label: 'Nested submenu',
				icon: 'users_solid',
				children: [
					{ label: 'First child', url: '#first' },
					{ label: 'Second child', url: '#second' },
				],
			},
			{ label: 'Disabled', icon: 'ban', url: '#disabled-child', disabled: true },
			{ divider: true },
			{
				label: 'Stays open',
				icon: 'refresh',
				description: 'closeOnSelect: false',
				closeOnSelect: false,
			},
			{
				label: 'New tab',
				icon: 'link',
				url: 'https://github.com',
				external: true,
				attrs: { target: '_blank', rel: 'noreferrer' },
			},
		],
	},
	{ label: 'GitHub', url: 'https://github.com', external: true },
];


const PromoItem = {
	components: { FIcon },
	props: {
		item: { type: Object, default: null },
		mode: { type: String, default: 'bar' },
		depth: { type: Number, default: 0 },
	},
	template: `<a href="#promo" class="sbfui-fheader-promo">
	<FIcon name="lightbulb_solid" />
	<span>What's new</span>
	<span class="sbfui-fheader-promo-badge">3</span>
</a>`,
};


const MEGA_SECTIONS = [
	{ title: 'Product', links: [ 'Overview', 'Pricing', 'Changelog' ] },
	{ title: 'Resources', links: [ 'Docs', 'Guides', 'API status' ] },
	{ title: 'Company', links: [ 'About', 'Blog', 'Careers' ] },
];


const MegaPanel = {
	props: {
		item: { type: Object, default: null },
		items: { type: Array, default: () => [] },
		close: { type: Function, default: null },
		mode: { type: String, default: 'dropdown' },
		depth: { type: Number, default: 0 },
	},
	data: () => ({ sections: MEGA_SECTIONS }),
	template: `<div class="sbfui-fheader-mega">
	<div v-for="section in sections" :key="section.title" class="sbfui-fheader-mega-column">
		<span class="sbfui-fheader-mega-title">{{ section.title }}</span>
		<a
			v-for="link in section.links"
			:key="link"
			href="#mega"
			class="sbfui-fheader-mega-link"
			@click="close?.()"
		>{{ link }}</a>
	</div>
</div>`,
};


const CUSTOM_ITEMS = [
	{ label: 'Marketplace', url: '#marketplace' },
	{ label: 'Mega menu', childComponent: MegaPanel },
	{ label: 'Features', url: '#features' },
	{ itemComponent: PromoItem },
];


const TRANSLATION_SOURCE_ITEMS = [
	{
		label: 'navigation.company',
		children: [
			{
				label: 'navigation.about',
				description: 'navigation.aboutDescription',
				url: '#about',
			},
			{
				label: 'navigation.team',
				description: 'navigation.teamDescription',
				descriptionParams: { count: 12 },
				url: '#team',
			},
		],
	},
	{ label: 'navigation.marketplace', url: '#marketplace' },
	{ label: 'navigation.features', url: '#features' },
	{ label: 'GitHub', url: 'https://github.com', external: true, translate: false },
];


const TRANSLATION_MESSAGES = {
	en: {
		'navigation.company': 'Company',
		'navigation.about': 'About us',
		'navigation.aboutDescription': 'Who we are',
		'navigation.team': 'Team',
		'navigation.teamDescription': 'Meet our {count} teammates',
		'navigation.marketplace': 'Marketplace',
		'navigation.features': 'Features',
		'navigation.showHiddenItems': 'Show hidden navigation items',
		'navigation.switchLanguage': 'Switch to Russian',
	},
	ru: {
		'navigation.company': 'Компания',
		'navigation.about': 'О нас',
		'navigation.aboutDescription': 'Кто мы такие',
		'navigation.team': 'Команда',
		'navigation.teamDescription': 'Познакомьтесь с нашей командой из {count} человек',
		'navigation.marketplace': 'Маркетплейс',
		'navigation.features': 'Возможности',
		'navigation.showHiddenItems': 'Показать скрытые пункты навигации',
		'navigation.switchLanguage': 'Switch to English',
	},
};


const DEFAULT_NAV_TEMPLATE = `<div class="sbfui-fheader-canvas">
	<FHeader>
		<template #left>
			<FHeaderNav
				v-bind="navArgs"
				@item-click="onItemClick"
				@dropdown-open="onDropdownOpen"
				@dropdown-close="onDropdownClose"
			/>
		</template>
		<template #right="{ isMobile }">
			<FHeaderBurger />
		</template>
		<template #menu>
			<FHeaderNav v-bind="navArgs" @item-click="onItemClick" />
		</template>
	</FHeader>
</div>`;


const renderNav = (template = DEFAULT_NAV_TEMPLATE) => (args) => ({
	components: {
		FHeader,
		FHeaderNav,
		FHeaderBurger,
		Logo,
		HeaderActions,
	},
	setup() {
		const navArgs = computed(() => {
			const {
				itemClick,
				dropdownOpen,
				dropdownClose,
				...result
			} = args;

			return result;
		});

		return {
			navArgs,
			onItemClick: args.itemClick,
			onDropdownOpen: args.dropdownOpen,
			onDropdownClose: args.dropdownClose,
		};
	},
	template,
});


const STANDALONE_NAV_TEMPLATE = `<div class="sbfui-fheader-canvas is-medium">
	<FHeaderNav
		v-bind="navArgs"
		@item-click="onItemClick"
		@dropdown-open="onDropdownOpen"
		@dropdown-close="onDropdownClose"
	/>
</div>`;


export default {
	title: 'FHeader/FHeaderNav',
	component: FHeaderNav,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		items: {
			control: 'object',
		},
		linkComponent: {
			control: false,
		},
		dropdownTrigger: {
			options: HEADER_DROPDOWN_TRIGGER_CHOICES,
			control: 'select',
		},
		dropdownPlacement: {
			options: HEADER_DROPDOWN_PLACEMENT_CHOICES,
			control: 'select',
		},
		dropdownOffset: {
			control: { type: 'number' },
		},
		appearance: {
			options: HEADER_APPEARANCE_CHOICES,
			control: 'select',
		},
		teleportTo: {
			control: false,
		},
		moreLabel: {
			control: 'text',
		},
		itemClick: {
			action: 'item-click',
			table: { category: 'events' },
		},
		dropdownOpen: {
			action: 'dropdown-open',
			table: { category: 'events' },
		},
		dropdownClose: {
			action: 'dropdown-close',
			table: { category: 'events' },
		},
	},
	args: {
		items: NAV_ITEMS,
		dropdownTrigger: 'click',
		dropdownPlacement: 'bottom-start',
		dropdownOffset: 8,
		appearance: 'auto',
		moreLabel: 'Show hidden navigation items',
	},
};


export const Default = {
	render: renderNav(),
};


export const ItemKinds = {
	name: 'Item kinds',
	render: renderNav(),
	args: {
		items: ITEM_KINDS,
	},
};


export const CustomItems = {
	name: 'Custom items',
	render: renderNav(),
	args: {
		items: CUSTOM_ITEMS,
	},
};


export const Overflow = {
	render: renderNav(`<div class="sbfui-fheader-canvas is-tight">
	<FHeader :breakpoint="360">
		<template #left><Logo /></template>
		<template #center>
			<FHeaderNav
				v-bind="navArgs"
				@item-click="onItemClick"
				@dropdown-open="onDropdownOpen"
				@dropdown-close="onDropdownClose"
			/>
		</template>
		<template #right><HeaderActions /></template>
		<template #menu>
			<FHeaderNav v-bind="navArgs" @item-click="onItemClick" />
		</template>
	</FHeader>
</div>`),
	args: {
		items: MANY_ITEMS,
	},
};


export const TranslatedNavigation = {
	name: 'Translated navigation',
	render: (args) => ({
		components: {
			FHeader,
			FHeaderNav,
			FHeaderBurger,
			Logo,
		},
		setup() {
			const locale = ref('en');
			const t = (key, params = {}) => {
				const template = TRANSLATION_MESSAGES[locale.value]?.[key] ?? key;

				return Object.entries(params).reduce(
					(message, [ name, value ]) =>
						message.replaceAll(`{${name}}`, String(value)),
					template,
				);
			};

			const items = useTranslatedNavigation(TRANSLATION_SOURCE_ITEMS, t);
			const moreLabel = computed(() => t('navigation.showHiddenItems'));
			const switchLanguageLabel = computed(() => t('navigation.switchLanguage'));
			const nextLocale = computed(() => locale.value === 'en' ? 'RU' : 'EN');

			const toggleLocale = () => {
				locale.value = locale.value === 'en' ? 'ru' : 'en';
			};

			return {
				items,
				moreLabel,
				switchLanguageLabel,
				nextLocale,
				toggleLocale,
				onItemClick: args.itemClick,
			};
		},
		template: `<div class="sbfui-fheader-canvas is-medium">
	<FHeader>
		<template #left><Logo /></template>
		<template #center>
			<FHeaderNav
				:items="items"
				:more-label="moreLabel"
				@item-click="onItemClick"
			/>
		</template>
		<template #right>
			<button
				class="sbfui-fheader-lang sbfui-fheader-lang-switcher"
				type="button"
				:aria-label="switchLanguageLabel"
				:title="switchLanguageLabel"
				@click="toggleLocale"
			>
				{{ nextLocale }}
			</button>
			<FHeaderBurger />
		</template>
		<template #menu>
			<FHeaderNav :items="items" :more-label="moreLabel" />
		</template>
	</FHeader>
</div>`,
	}),
	parameters: {
		controls: {
			exclude: [
				'items',
				'linkComponent',
				'dropdownTrigger',
				'dropdownPlacement',
				'dropdownOffset',
				'appearance',
				'teleportTo',
				'moreLabel',
			],
		},
	},
};


export const Standalone = {
	render: renderNav(STANDALONE_NAV_TEMPLATE),
};
