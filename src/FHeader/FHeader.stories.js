import { computed } from 'vue';

import FHeader from './index.vue';
import FHeaderNav from './FHeaderNav.vue';
import FHeaderBurger from './FHeaderBurger.vue';
import { HEADER_APPEARANCE_CHOICES } from './constants';
import { HeaderActions, Logo, NAV_ITEMS, renderHeader } from './storySupport';


export default {
	title: 'FHeader',
	component: FHeader,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		breakpoint: {
			control: { type: 'number' },
		},
		balanced: {
			control: 'boolean',
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
			description: 'Demo item tree passed to the FHeaderNav instances.',
			table: { category: 'story' },
		},
		'slot:left': {
			control: { type: null },
			description: 'Bar left section.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		'slot:center': {
			control: { type: null },
			description: 'Bar center section.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		'slot:right': {
			control: { type: null },
			description: 'Bar right section.',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		'slot:top': {
			control: { type: null },
			description: 'Extra row above the bar (plain flex line).',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		'slot:bottom': {
			control: { type: null },
			description: 'Extra row below the bar (plain flex line).',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		'slot:menu': {
			control: { type: null },
			description: 'Mobile menu content (scrollable).',
			table: { category: 'slots', type: { summary: 'vnode' } },
		},
		'slot:menu-bottom': {
			control: { type: null },
			description: 'Mobile menu content pinned to the bottom.',
			table: { category: 'slots', type: { summary: 'vnode' } },
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
		menuOpen: false,
		items: NAV_ITEMS,
	},
};


export const Default = {
	render: renderHeader(),
};


export const LogoCenter = {
	name: 'Centered logo',
	render: renderHeader(`<div class="sbfui-fheader-canvas">
	<FHeader v-bind="headerArgs" balanced>
		<template #left>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
		<template #center><Logo /></template>
		<template #right="{ isMobile }">
			<HeaderActions v-if="!isMobile" />
			<FHeaderBurger />
		</template>
		<template #menu>
			<FHeaderNav :items="items" @item-click="onItemClick" />
		</template>
	</FHeader>
</div>`),
};


export const MultiRow = {
	name: 'Multiple rows',
	render: renderHeader(`<div class="sbfui-fheader-canvas">
	<FHeader v-bind="headerArgs">
		<template #top="{ isMobile }">
			<template v-if="!isMobile">
				<span class="sbfui-fheader-meta">ETH Gas: <b>60 Gwei</b></span>
				<span class="sbfui-fheader-meta">24h Vol: <b>$60,813,448,635</b></span>
				<span class="sbfui-fheader-meta">Market Cap: <b>$1,774,858,038,606</b></span>
				<span class="sbfui-fheader-meta">Cryptos: <b>15,275</b></span>
				<span class="sbfui-fheader-meta is-end">English (US)</span>
				<span class="sbfui-fheader-meta">USD</span>
			</template>
		</template>

		<template #left><Logo /></template>
		<template #right="{ isMobile }">
			<HeaderActions v-if="!isMobile" />
			<FHeaderBurger />
		</template>

		<template #bottom="{ isMobile }">
			<FHeaderNav v-if="!isMobile" :items="items" @item-click="onItemClick" />
		</template>

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


export const EmptyBar = {
	name: 'Multiple rows without main bar',
	render: renderHeader(`<div class="sbfui-fheader-canvas">
	<FHeader v-bind="headerArgs">
		<template #top="{ isMobile }">
			<template v-if="!isMobile">
				<span class="sbfui-fheader-meta">ETH Gas: <b>60 Gwei</b></span>
				<span class="sbfui-fheader-meta">24h Vol: <b>$60,813,448,635</b></span>
				<span class="sbfui-fheader-meta">Market Cap: <b>$1,774,858,038,606</b></span>
				<span class="sbfui-fheader-meta">Cryptos: <b>15,275</b></span>
				<span class="sbfui-fheader-meta is-end">English (US)</span>
				<span class="sbfui-fheader-meta">USD</span>
			</template>
		</template>

		<template #bottom="{ isMobile }">
			<FHeaderNav v-if="!isMobile" :items="items" @item-click="onItemClick" />
		</template>

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


const appearanceHeader = (appearance) => `<FHeader v-bind="args" appearance="${appearance}">
	<template #left><Logo /></template>
	<template #center><FHeaderNav :items="items" /></template>
	<template #right="{ isMobile }">
		<HeaderActions v-if="!isMobile" />
		<FHeaderBurger />
	</template>
	<template #menu><FHeaderNav :items="items" /></template>
</FHeader>`;


export const Appearance = {
	render: (args) => ({
		components: {
			FHeader,
			FHeaderNav,
			FHeaderBurger,
			Logo,
			HeaderActions,
		},
		setup() {
			const headerArgs = computed(() => {
				const {
					appearance,
					menuOpen,
					menuOpenEvent,
					menuCloseEvent,
					itemClick,
					items,
					...result
				} = args;

				delete result['update:menuOpen'];
				return result;
			});

			return {
				args: headerArgs,
				items: computed(() => args.items),
			};
		},
		template: `<div class="sbfui-fheader-canvas sbfui-fheader-stack">
	${appearanceHeader('auto')}
	${appearanceHeader('light')}
	${appearanceHeader('dark')}
</div>`,
	}),
	argTypes: {
		appearance: { control: { type: null } },
		menuOpen: { control: { type: null } },
	},
	args: {
		appearance: '<appearance>',
		menuOpen: '<menuOpen>',
	},
};
