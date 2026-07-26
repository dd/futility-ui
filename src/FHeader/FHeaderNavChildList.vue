<template>
	<ul
		:class="[
			'fui-header-child-list',
			`is-${variant}`,
			{ 'is-root': depth === 0 },
		]"
		role="menu"
	>
		<li
			v-for="(item, index) in items"
			:key="index"
			:role="item.divider ? 'none' : null"
			class="fui-header-child-node"
		>
			<hr v-if="item.divider" class="fui-header-child-divider" role="separator" />

			<template v-else>
				<component
					:is="item.itemComponent"
					v-if="item.itemComponent"
					v-bind="getCustomItemArgs(item)"
					:disabled="item.disabled || undefined"
					:aria-disabled="item.disabled ? 'true' : undefined"
					:tabindex="item.disabled ? -1 : undefined"
					:class="[
						'fui-header-child-item',
						'fui-header-child-custom',
						{
							'has-child': hasChildContent(item),
							'is-expanded': isExpanded(index),
							'is-active': item.active,
							'is-disabled': item.disabled,
						},
					]"
					role="menuitem"
					@click="onItemComponentClick(item, index, $event)"
				/>

				<component
					:is="getItemElement(item).is"
					v-else
					v-bind="getBuiltInAttrs(item, index)"
					:class="[
						'fui-header-child-item',
						{
							'has-child': hasChildContent(item),
							'is-expanded': isExpanded(index),
							'is-active': item.active,
							'is-link': isItemLink(item),
							'is-disabled': item.disabled,
						},
					]"
					role="menuitem"
					@click="onBuiltInClick(item, index, $event)"
				>
					<span v-if="item.icon" class="fui-header-child-icon" aria-hidden="true">
						<FIcon :name="item.icon" />
					</span>

					<span class="fui-header-child-copy">
						<span class="fui-header-child-label">{{ item.label }}</span>
						<span v-if="item.description" class="fui-header-child-description">
							{{ item.description }}
						</span>
					</span>

					<FIcon
						v-if="hasChildContent(item)"
						:name="variant === 'accordion' && isExpanded(index) ? 'chevron_down' : 'chevron_right'"
						class="fui-header-child-arrow"
						aria-hidden="true"
					/>
				</component>

				<div
					v-if="hasChildContent(item)"
					:class="[
						'fui-header-child-submenu',
						{ 'is-open': variant === 'accordion' && isExpanded(index) },
					]"
				>
					<component
						:is="item.childComponent"
						v-if="item.childComponent"
						v-bind="getChildComponentArgs(item)"
						@item-click="forwardItemClick"
					/>

					<FHeaderNavChildList
						v-else
						:items="getItemChildren(item)"
						:variant="variant"
						:depth="depth + 1"
						:path-prefix="`${getItemKey(index)}.`"
						:expanded-keys="expandedKeys"
						:close-list="closeList"
						:link-component="linkComponent"
						@item-click="forwardItemClick"
						@toggle="forwardToggle"
					/>
				</div>
			</template>
		</li>
	</ul>
</template>

<script setup>
import FIcon from '@/FIcon';

import {
	buildItemAttrs,
	getComponentArgs,
	getItemChildren,
	hasChildContent,
	isItemLink,
	resolveItemElement,
} from './utils';


defineOptions({ name: 'FHeaderNavChildList' });


const props = defineProps({
	items: {
		type: Array,
		default: () => [],
	},

	/**
	 * Rendering variant:
	 * - `dropdown` - nested children fly out on hover/focus (desktop dropdown panel)
	 * - `accordion` - nested children expand inline (mobile menu, overflow panel)
	 */
	variant: {
		type: String,
		default: 'dropdown',
		validator: (value) => [ 'dropdown', 'accordion' ].includes(value),
	},

	depth: {
		type: Number,
		default: 0,
	},

	/**
	 * Render-path prefix of this list (e.g. `"0.2."`). Item keys are built
	 * from it, so the expanded state needs no identifiers in the item data.
	 */
	pathPrefix: {
		type: String,
		default: '',
	},

	/** Expanded accordion branches, keyed by render path. */
	expandedKeys: {
		type: Object,
		default: () => ({}),
	},

	/** Closes the hosting surface (dropdown or mobile menu) after a leaf click. */
	closeList: {
		type: Function,
		default: null,
	},

	/** Component used to render internal links (RouterLink/NuxtLink). */
	linkComponent: {
		type: [ Object, Function, String ],
		default: null,
	},
});

const emit = defineEmits([ 'item-click', 'toggle' ]);


const getItemKey = (index) => `${props.pathPrefix}${index}`;


const isExpanded = (index) => Boolean(props.expandedKeys?.[getItemKey(index)]);


/* An item with a submenu is always a toggle button - `url` on it is ignored. */
const getItemElement = (item) => {
	if (hasChildContent(item)) {
		return { is: 'button', urlAttrs: { type: 'button' } };
	}

	return resolveItemElement(item, props.linkComponent);
};


const getBuiltInAttrs = (item, index) => {
	const managed = { ...getItemElement(item).urlAttrs };

	if (hasChildContent(item)) {
		managed['aria-haspopup'] = 'menu';
		if (props.variant === 'accordion') {
			managed['aria-expanded'] = String(isExpanded(index));
		}
	}

	return buildItemAttrs(item, managed);
};


const getCustomItemArgs = (item) => getComponentArgs(
	item,
	'itemArgs',
	{
		mode: props.variant,
		depth: props.depth,
	},
);


const getChildComponentArgs = (item) => {
	const children = getItemChildren(item);
	const args = {
		...(item.childArgs ?? {}),
		item,
		close: props.closeList,
		mode: props.variant,
		depth: props.depth + 1,
	};

	if (children.length || !('items' in args)) {
		args.items = children;
	}

	return args;
};


const createPayload = (item, event, action) => ({
	item,
	event,
	mode: props.variant,
	depth: props.depth,
	action,
	hasChildren: hasChildContent(item),
});


const emitItemClick = (item, event, action = 'select') => {
	emit('item-click', createPayload(item, event, action));
};


const maybeClose = (item) => {
	if (!hasChildContent(item) && item.closeOnSelect !== false) {
		props.closeList?.();
	}
};


const onBuiltInClick = (item, index, event) => {
	if (item.disabled) {
		event.preventDefault();
		return;
	}

	if (props.variant === 'accordion' && hasChildContent(item)) {
		event.preventDefault();
		emitItemClick(item, event, 'toggle');
		emit('toggle', getItemKey(index));
		return;
	}

	emitItemClick(item, event);
	maybeClose(item);
};


const onItemComponentClick = (item, index, event) => {
	if (item.disabled) {
		event.preventDefault();
		return;
	}

	if (props.variant === 'accordion' && hasChildContent(item)) {
		emitItemClick(item, event, 'toggle');
		emit('toggle', getItemKey(index));
		return;
	}

	emitItemClick(item, event);
	maybeClose(item);
};


const forwardItemClick = (payload) => {
	emit('item-click', payload);
};


const forwardToggle = (key) => {
	emit('toggle', key);
};
</script>
