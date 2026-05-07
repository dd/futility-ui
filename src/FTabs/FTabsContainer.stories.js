import { computed, ref } from 'vue';
import { useArgs } from 'storybook/preview-api';

import { makeUpdateArg } from '@/sb.stuff.js';
import FButton from '@/FButton';
import FTabsContainer from './FTabsContainer';
import FTab from './FTab';


export default {
	title: 'FTabs/FTabsContainer',
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		activeTab: {
			control: 'text',
			description: 'Active tab slug (v-model).',
			table: {
				category: 'props',
				type: { summary: 'string' },
			},
		},
		'update:activeTab': {
			action: 'update:activeTab',
			control: false,
			description: 'Emitted when the active tab changes.',
			table: {
				category: 'events',
				type: { summary: null },
				defaultValue: { summary: null },
			},
		},
	},
};


const DEFAULT_TEMP = `<div style="min-width: 400px" >
	<FTabsContainer v-bind="args" >
		<FTab name="Overview">
			<p>This is the overview content.</p>
		</FTab>
		<FTab name="Details">
			<p>Here are the details.</p>
		</FTab>
		<FTab name="Settings">
			<p>Settings panel content.</p>
		</FTab>
	</FTabsContainer>
</div>`;


export const Default = {
	render: (args, { argTypes }) => {
		const updateArgs = useArgs()[1];
		const updateActiveTab = makeUpdateArg('activeTab', updateArgs)[2];
		return {
			name: 'FTabsContainerDefaultStory',
			props: Object.keys(argTypes),
			components: { FTabsContainer, FTab },
			setup() {
				const newArgs = computed(() => ({
					activeTab: args.activeTab,
					'onUpdate:activeTab': updateActiveTab,
				}));
				return { args: newArgs };
			},
			template: DEFAULT_TEMP,
		};
	},
};


const CUSTOM_SLUG_TEMP = `<div style="min-width: 400px" >
	<FTabsContainer v-bind="args" >
		<FTab name="First Tab" slug="first">
			<p>Custom slug: "first"</p>
		</FTab>
		<FTab name="Second Tab" slug="second">
			<p>Custom slug: "second"</p>
		</FTab>
		<FTab name="Disabled Tab" slug="disabled" disabled>
			<p>This tab is disabled and cannot be selected.</p>
		</FTab>
		<FTab name="Fourth Tab" slug="fourth">
			<p>Custom slug: "fourth"</p>
		</FTab>
	</FTabsContainer>
</div>`;


export const CustomSlugs = {
	args: {
		activeTab: 'second',
	},
	render: (args, { argTypes }) => {
		const updateArgs = useArgs()[1];
		const updateActiveTab = makeUpdateArg('activeTab', updateArgs)[2];
		return {
			name: 'FTabsContainerCustomSlugsStory',
			props: Object.keys(argTypes),
			components: { FTabsContainer, FTab },
			setup() {
				const newArgs = computed(() => ({
					activeTab: args.activeTab,
					'onUpdate:activeTab': updateActiveTab,
				}));
				return { args: newArgs };
			},
			template: CUSTOM_SLUG_TEMP,
		};
	},
};


const DYNAMIC_TEMP = `<div style="min-width: 400px">
	<p style="margin-bottom: 12px">
		<FButton @click="count++">Add tab</FButton>
		<FButton @click="count = Math.max(0, count - 1)" style="margin-left: 8px">Remove tab</FButton>
	</p>
	<FTabsContainer v-bind="args">
		<FTab
			v-for="i in count"
			:key="i"
			:name="\`Tab \${i}/\${count}\`"
			:slug="'tab-' + i"
		>
			<p>Dynamic content for tab {{ i }}. Total tabs: {{ count }}.</p>
		</FTab>
	</FTabsContainer>
</div>`;


export const Dynamic = {
	render: (args, { argTypes }) => {
		const updateArgs = useArgs()[1];
		const updateActiveTab = makeUpdateArg('activeTab', updateArgs)[2];
		return {
			name: 'FTabsContainerDynamicStory',
			props: Object.keys(argTypes),
			components: { FTabsContainer, FTab, FButton },
			setup() {
				const count = ref(3);
				const newArgs = computed(() => ({
					activeTab: args.activeTab,
					'onUpdate:activeTab': updateActiveTab,
				}));
				return { args: newArgs, count };
			},
			template: DYNAMIC_TEMP,
		};
	},
};


const CUSTOM_TAB_TEMP = `<div style="min-width: 400px" >
	<FTabsContainer v-bind="args" >
		<template #tab-inbox="{ tab }">
			{{ tab.name }} <span style="background: #ef4444; color: white; border-radius: 9999px; padding: 1px 6px; font-size: 11px; margin-left: 4px">3</span>
		</template>

		<FTab name="Inbox" slug="inbox">
			<p>You have 3 new messages.</p>
		</FTab>
		<FTab name="Sent" slug="sent">
			<p>Sent messages list.</p>
		</FTab>
		<FTab name="Drafts" slug="drafts">
			<p>Your drafts.</p>
		</FTab>
	</FTabsContainer>
</div>`;


export const CustomTabSlot = {
	render: (args, { argTypes }) => {
		const updateArgs = useArgs()[1];
		const updateActiveTab = makeUpdateArg('activeTab', updateArgs)[2];
		return {
			name: 'FTabsContainerCustomSlotStory',
			props: Object.keys(argTypes),
			components: { FTabsContainer, FTab },
			setup() {
				const newArgs = computed(() => ({
					activeTab: args.activeTab,
					'onUpdate:activeTab': updateActiveTab,
				}));
				return { args: newArgs };
			},
			template: CUSTOM_TAB_TEMP,
		};
	},
};
