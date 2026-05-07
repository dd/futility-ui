<template>
	<header class="fui-tabs-header">
		<button
			v-for="tab in state.tabs"
			:key="tab.id"

			type="button"
			:class="[
				'fui-tabs-button',
				`fui-tabs-button-${tab.slug}`,
				{ 'is-active': tab.slug === activeTab },
			]"
			:disabled="tab.disabled"
			@click="setActiveByID(tab.id)"
		>
			<slot :name="'tab-' + tab.slug" :tab="tab">{{ tab.name }}</slot>
		</button>
	</header>
	<hr class="fui-tabs-divider" />
	<div :class="['fui-tabs-body', `fui-tabs-body-${activeTab}`]"><slot /></div>
</template>


<script setup>
import { computed, nextTick, provide, reactive, watch } from 'vue';


const state = reactive({
	tabs: [],
});


/* Tab registration (provide/inject) ************/

provide('fuiTabs:addTab', (tab) => {
	state.tabs.push(tab);
});

provide('fuiTabs:updateTab', (tab) => {
	const index = state.tabs.findIndex(t => t.id === tab.id);
	if (index === -1) return;

	if (activeTab.value === state.tabs[index].slug && activeTab.value !== tab.slug) {
		activeTab.value = tab.slug;
	}

	state.tabs[index] = tab;
});

provide('fuiTabs:removeTab', (id) => {
	const wasActive = state.tabs.find(t => t.id === id)?.slug === activeTab.value;
	state.tabs = state.tabs.filter(t => t.id !== id);

	if (wasActive && state.tabs.length > 0) {
		const firstEnabled = state.tabs.find(t => !t.disabled);
		if (firstEnabled) {
			activeTab.value = firstEnabled.slug;
		}
	}
});


/* Active tab state *****************************/

const activeTab = defineModel('activeTab', { type: String });

const defaultTabSlug = computed(() => {
	const first = state.tabs.find(t => !t.disabled);
	return first?.slug ?? null;
});

watch(defaultTabSlug, (slug) => {
	if (slug && !activeTab.value) {
		nextTick(() => {
			if (!activeTab.value) {
				activeTab.value = slug;
			}
		});
	}
});

const activeTabID = computed(() => {
	if (activeTab.value) {
		return state.tabs.find(t => t.slug === activeTab.value)?.id ?? null;
	}
	return state.tabs.find(t => !t.disabled)?.id ?? null;
});

function setActiveByID(id) {
	const tab = state.tabs.find(t => t.id === id);
	if (tab) activeTab.value = tab.slug;
}

provide('fuiTabs:activeTabID', activeTabID);
</script>
