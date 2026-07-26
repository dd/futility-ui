<template>
	<ul class="fui-header-nav-list">
		<!-- Dividers are a vertical-list concept - the horizontal bar skips them. -->
		<li
			v-for="(item, index) in barItems"
			:key="index"
			class="fui-header-nav-node"
		>
			<FDropdown
				v-if="hasChildContent(item)"
				:open="openIndex === index"
				:trigger="dropdownTrigger"
				:placement="dropdownPlacement"
				:offset="dropdownOffset"
				:teleport-to="teleportTo"
				:disabled="item.disabled"
				:class="[
					'fui-header-dropdown-panel',
					`fui-header-dropdown-appearance-${appearance}`,
				]"
				@update:open="onDropdownUpdate(item, index, $event)"
			>
				<template #trigger>
					<component
						:is="item.itemComponent"
						v-if="item.itemComponent"
						v-bind="getCustomItemArgs(item)"
						:disabled="item.disabled || undefined"
						:aria-disabled="item.disabled ? 'true' : undefined"
						:tabindex="item.disabled ? -1 : undefined"
						:class="[
							'fui-header-item',
							'fui-header-custom-item',
							{
								'has-dropdown': true,
								'is-open': openIndex === index,
								'is-active': isItemActive(item),
								'is-disabled': item.disabled,
							},
						]"
						@click="onItemClick(item, $event, 'trigger')"
					/>

					<button
						v-else
						v-bind="getTriggerAttrs(item, index)"
						:class="[
							'fui-header-item',
							{
								'has-dropdown': true,
								'is-open': openIndex === index,
								'is-active': isItemActive(item),
								'is-disabled': item.disabled,
							},
						]"
						type="button"
						@click="onItemClick(item, $event, 'trigger')"
					>
						{{ item.label }}
						<FIcon
							:name="openIndex === index ? 'chevron_up' : 'chevron_down'"
							class="fui-header-item-arrow"
							aria-hidden="true"
						/>
					</button>
				</template>

				<template #default="{ close }">
					<component
						:is="item.childComponent"
						v-if="item.childComponent"
						v-bind="getChildComponentArgs(item, close)"
						@item-click="forwardItemClick"
					/>

					<FHeaderNavChildList
						v-else
						:items="getItemChildren(item)"
						variant="dropdown"
						:close-list="close"
						:link-component="linkComponent"
						@item-click="forwardItemClick"
					/>
				</template>
			</FDropdown>

			<component
				:is="item.itemComponent"
				v-else-if="item.itemComponent"
				v-bind="getCustomItemArgs(item)"
				:disabled="item.disabled || undefined"
				:aria-disabled="item.disabled ? 'true' : undefined"
				:tabindex="item.disabled ? -1 : undefined"
				:class="[
					'fui-header-item',
					'fui-header-custom-item',
					{
						'is-active': isItemActive(item),
						'is-disabled': item.disabled,
					},
				]"
				@click="onItemClick(item, $event)"
			/>

			<component
				:is="resolveItemElement(item, linkComponent).is"
				v-else
				v-bind="getBuiltInAttrs(item)"
				:class="[
					'fui-header-item',
					{
						'is-active': isItemActive(item),
						'is-link': isItemLink(item),
						'is-disabled': item.disabled,
					},
				]"
				@click="onItemClick(item, $event)"
			>
				{{ item.label }}
			</component>
		</li>

		<li v-if="$slots.after" class="fui-header-nav-node">
			<slot name="after" />
		</li>
	</ul>
</template>

<script setup>
import { computed } from 'vue';

import FDropdown from '@/FDropdown';
import FIcon from '@/FIcon';

import FHeaderNavChildList from './FHeaderNavChildList.vue';
import {
	buildItemAttrs,
	getComponentArgs,
	getItemChildren,
	hasChildContent,
	isItemLink,
	resolveItemElement,
} from './utils';


defineOptions({ name: 'FHeaderNavItems' });


const props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},

	/** Index of the item whose dropdown is open. */
	openIndex: {
		type: Number,
		default: null,
	},

	dropdownTrigger: {
		type: String,
		default: 'click',
	},

	dropdownPlacement: {
		type: String,
		default: 'bottom-start',
	},

	dropdownOffset: {
		type: Number,
		default: 8,
	},

	appearance: {
		type: String,
		default: 'auto',
	},

	teleportTo: {
		type: [ String, Object ],
		default: 'body',
	},

	linkComponent: {
		type: [ Object, Function, String ],
		default: null,
	},
});

const emit = defineEmits([
	'update:openIndex',
	'item-click',
	'dropdown-open',
	'dropdown-close',
]);


const barItems = computed(() => props.items.filter((item) => !item.divider));


const getBuiltInAttrs = (item) => buildItemAttrs(
	item,
	{ ...resolveItemElement(item, props.linkComponent).urlAttrs },
);


const getTriggerAttrs = (item, index) => buildItemAttrs(item, {
	'aria-haspopup': 'menu',
	'aria-expanded': String(props.openIndex === index),
	disabled: item.disabled || undefined,
});


const getCustomItemArgs = (item) => getComponentArgs(
	item,
	'itemArgs',
	{ mode: 'bar' },
);


const getChildComponentArgs = (item, close) => {
	const children = getItemChildren(item);
	const args = {
		...(item.childArgs ?? {}),
		item,
		close,
		mode: 'bar',
	};

	if (children.length || !('items' in args)) {
		args.items = children;
	}

	return args;
};


const isItemActive = (item) => item.active;


const onItemClick = (item, event, action = 'select') => {
	if (item.disabled) {
		event.preventDefault();
		return;
	}

	emit('item-click', {
		item,
		event,
		mode: 'bar',
		action,
		hasChildren: hasChildContent(item),
	});
};


const onDropdownUpdate = (item, index, isOpen) => {
	emit('update:openIndex', isOpen ? index : null);
	emit(isOpen ? 'dropdown-open' : 'dropdown-close', { item });
};


const forwardItemClick = (payload) => {
	emit('item-click', payload);
};
</script>
