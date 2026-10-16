import FHeader from './index.vue';
import { HEADER_APPEARANCE_CHOICES } from './constants';
import {
	NAV_ITEMS,
	renderHeader,
} from './storySupport';


export default {
	title: 'FHeader/Mobile menu',
	component: FHeader,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		breakpoint: {
			control: { type: 'number' },
		},
		appearance: {
			options: HEADER_APPEARANCE_CHOICES,
			control: 'select',
		},
		menuOpen: {
			control: 'boolean',
			description: 'Open state of the mobile menu (`v-model:menuOpen`).',
			table: { category: 'props' },
		},
		items: {
			control: 'object',
			description: 'Demo item tree rendered inside the mobile menu.',
			table: { category: 'story' },
		},
		itemClick: {
			action: 'item-click',
			table: { category: 'story events' },
		},
		menuOpenEvent: {
			action: 'menu-open',
			table: { category: 'events' },
		},
		menuCloseEvent: {
			action: 'menu-close',
			table: { category: 'events' },
		},
	},
	args: {
		breakpoint: 768,
		appearance: 'auto',
		menuOpen: true,
		items: NAV_ITEMS,
	},
};


export const Default = {
	name: 'Open menu',
	parameters: {
		docs: {
			/*
			 * The open menu teleports a fixed fullscreen layer to `body` and
			 * locks page scroll, so the docs render it in an isolated iframe.
			 */
			story: { inline: false, iframeHeight: 620 },
		},
	},
	render: renderHeader(`<div class="sbfui-fheader-canvas is-mobile sbfui-fheader-mobile-preview">
	<FHeader v-bind="headerArgs">
		<template #left><Logo /></template>
		<template #center>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
		<template #right><FHeaderBurger /></template>
		<template #menu>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
		<template #menu-bottom>
			<LangSwitcher />
			<HeaderActions />
		</template>
	</FHeader>
</div>`),
};


export const BurgerLeft = {
	name: 'Burger on the left',
	parameters: {
		docs: {
			/* Same isolated iframe as `Default` - see the note there. */
			story: { inline: false, iframeHeight: 620 },
		},
	},
	render: renderHeader(`<div class="sbfui-fheader-canvas is-mobile sbfui-fheader-mobile-preview">
	<FHeader v-bind="headerArgs">
		<template #left>
			<FHeaderBurger />
			<Logo />
		</template>
		<template #center>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
		<template #right="{ isMobile }">
			<HeaderActions v-if="!isMobile" />
		</template>
		<template #menu>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
		<template #menu-bottom><HeaderActions /></template>
	</FHeader>
</div>`),
	args: {
		menuOpen: false,
	},
};
