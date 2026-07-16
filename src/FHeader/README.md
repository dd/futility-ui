# FHeader

Site header shell with explicit placement. The header knows nothing about logos or menus - it
renders three bar sections, optional `#top` / `#bottom` rows and a fullscreen mobile menu,
while the developer decides what goes where by placing content into slots. Smart children
(`FHeaderNav`, `FHeaderBurger`) adapt to their location through the header context.

### Usage

Import the components:

```js
import { FHeader, FHeaderNav, FHeaderBurger } from 'futility-ui';
// or
import FHeader from 'futility-ui/FHeader';
import FHeaderNav from 'futility-ui/FHeader/FHeaderNav';
import FHeaderBurger from 'futility-ui/FHeader/FHeaderBurger';
```

Use them in your template:

```html
<FHeader :breakpoint="768">
	<template #left>
		<a href="/">Brand</a>
	</template>

	<template #center>
		<FHeaderNav :items="navItems" @item-click="onNav" />
	</template>

	<template #right="{ isMobile }">
		<LangSwitcher v-if="!isMobile" />
		<UserMenu />
		<FHeaderBurger />
	</template>

	<template #menu>
		<FHeaderNav :items="navItems" @item-click="onNav" />
	</template>

	<template #menu-bottom>
		<LangSwitcher />
	</template>
</FHeader>
```

### How it works

- The bar slots `#left` / `#center` / `#right` render **always** - on desktop and on mobile.
  Placement is controlled by markup position, there are no placement props.
- Below `breakpoint` (own container width, measured with `ResizeObserver`) the header switches
  to mobile mode: `FHeaderNav` hides itself from the bar, `FHeaderBurger` becomes visible.
- The burger opens the fullscreen mobile menu **below the bar** (the bar with your logo stays
  visible, nothing is duplicated). Page scroll is locked while the menu is open.
- The menu body renders the `#menu` slot (scrollable) and `#menu-bottom` (pinned to the bottom).
  You declare the mobile menu content explicitly - the same `FHeaderNav` renders as a vertical
  accordion there.
- All slots are scoped with `{ region, isMobile, menuOpen, openMenu, closeMenu, toggleMenu }`,
  so custom content can adapt: `<template #right="{ isMobile }">`.
- Empty `#left`, `#center`, and `#right` sections are hidden automatically. When all three
  render no DOM content, the main bar (including its padding, border, and background) collapses.

### Extra rows: `#top` and `#bottom`

Multi-row headers (a utility strip above the bar, a sub-navigation strip below it) are built
with the `#top` and `#bottom` slots. Each row is a plain flex line - there are no sections,
you lay the content out yourself (`margin-left: auto` works as a spacer). The rows share the
header context with the main bar: one `breakpoint`, one `appearance`, one mobile menu (it
opens below the whole header). `FHeaderNav` placed into a row behaves exactly like in the
bar - horizontal list, dropdowns, overflow button, hides itself on mobile.

A row renders only when its slot produces content, so `v-if` on the slot content controls
the whole strip. There is no automatic mobile behavior: if a row must disappear on mobile,
say so explicitly - `FHeaderNav` hides itself, but the row element does not know that, so
put the `v-if` on the nav too:

```html
<FHeader>
	<template #top="{ isMobile }">
		<template v-if="!isMobile">
			<span>ETH Gas: 60 Gwei</span>
			<span>24h Vol: $60,813,448,635</span>
			<LangSwitcher style="margin-left: auto" />
		</template>
	</template>

	<template #left><a href="/">Brand</a></template>
	<template #right>
		<UserMenu />
		<FHeaderBurger />
	</template>

	<template #bottom="{ isMobile }">
		<FHeaderNav v-if="!isMobile" :items="navItems" />
	</template>

	<template #menu>
		<FHeaderNav :items="navItems" />
	</template>
</FHeader>
```

The bar and optional rows remain full-width surfaces, while their content is rendered inside a
centered container. Set `--fui-header-content-max-width` on the header to constrain all three
content areas without shortening their backgrounds or bottom borders:

```html
<FHeader style="--fui-header-content-max-width: 1600px">
	<!-- slots -->
</FHeader>
```

The default value is `none`.

### Sizing

Sizes are driven by CSS variables with defaults on `:root`, so a denser or a larger header
does not require overriding internal selectors. Override them globally on `:root`, or per
header on the element (inline style or a class):

```html
<FHeader style="--fui-header-item-height: 48px; --fui-header-item-font-size: 18px">
	<!-- slots -->
</FHeader>
```

- `--fui-header-item-height` - bar item height. The burger and the `...` overflow button are
  squares of the same size, so the whole bar scales as one piece. Default `40px`.
- `--fui-header-item-font-size` - bar item font size. Default `16px`.
- `--fui-header-nav-gap` - gap between bar items. The overflow measuring reads the same
  variable, so the width math never diverges from the visible list. Default `--fui-spacing * 4`.
- `--fui-header-icon-size` - icons: dropdown chevrons, the burger, the `...` button and icons
  in vertical lists. Default `18px`.
- `--fui-header-child-item-height` - items in vertical lists: dropdown panels and the
  overflow panel. Default `40px`.
- `--fui-header-menu-item-height` - items in the mobile menu (larger touch targets).
  Default `56px`.
- `--fui-header-px` - horizontal padding of the bar and rows. Default `--fui-spacing * 6`.

One caveat: dropdown panels and the mobile menu teleport to `body`, so a per-header override
set on the header element does not reach them - they fall back to the `:root` values. When
panel sizes must change, override on `:root` (all headers) or scope the override to
`.fui-header-dropdown-panel` / `.fui-header-menu-layer`.

### FHeader

Props:

- `breakpoint` - container width in px below which the mobile mode is used. Default `768`.
- `balanced` - gives the side sections equal width, so `#center` content sits at the exact
  center of the bar (by default sections are sized by content, and `#center` is only centered
  within the leftover space). Trade-off: a nav in a side section gets less room and moves
  items behind the overflow button earlier.
- `appearance` - color scheme of the header: `auto` (follows the page color scheme, default)
  or `light` / `dark` (pins the scheme regardless of the page theme). Propagates to the
  teleported layers: dropdown panels and the mobile menu.
- `teleportTo` - target for the mobile menu teleport. Default `body`.

Slots: `left`, `center`, `right`, `top`, `bottom`, `menu`, `menu-bottom` (all scoped, see above).

Model: `v-model:menuOpen`. Events: `menu-open`, `menu-close`.

### FHeaderBurger

The mobile menu toggle. Place it into any bar slot - left or right, wherever the design wants
it. Renders nothing on desktop or when the `#menu` slot is empty. The default icon pair
(`bars`/`close`) can be replaced through the default slot.

Props: `label`, `closeLabel` (aria labels).

### FHeaderNav

Navigation menu built from a plain item tree. Adapts to its region:

- desktop bar - horizontal list, children open in dropdowns, items that do not fit hide
  behind the `...` overflow button;
- mobile bar - renders nothing (declare the menu content in `#menu` instead);
- mobile menu - vertical accordion list, children expand inline;
- outside `FHeader` - standalone horizontal menu.

Props:

- `items` - menu item tree, see below.
- `linkComponent` - component used for internal links. When omitted, a globally registered
  `NuxtLink` or `RouterLink` is picked up automatically; pass `'a'` to force plain anchors.
- `dropdownTrigger` (`click`/`hover`), `dropdownPlacement`, `dropdownOffset` - desktop
  dropdown behavior.
- `appearance` - dropdown panel preset, defaults to the `FHeader` appearance.
- `teleportTo`, `moreLabel`.

Events: `item-click` (`{ item, event, mode, action, hasChildren }`), `dropdown-open`,
`dropdown-close`.

### Item schema

The `items` tree mixes four kinds of entries. Which fields apply depends on the kind and
on where the item renders. The horizontal bar shows `label` only (plus the dropdown
chevron); the full menu-item content - `icon`, `description`, dividers - belongs to the
**vertical lists**: dropdown panels, the overflow panel and the mobile menu. A top-level
item may carry the vertical-list fields too - they show up when it renders in the mobile
menu, the bar just ignores them.

#### Link / action item

```js
{ label: 'Docs', url: '/docs' }
```

- `label` - item text.
- `url` - renders the item as a link. Internal paths go through `linkComponent`, external
  (`https:`, `//`, `mailto:`, `tel:`, `#hash` or `external: true`) always render as plain
  `<a>`. Without `url` the item is a `<button>` - handle it via `item-click`.
- `active` - highlights the item.
- `disabled` - blocks clicks and marks the clickable element itself: native `disabled` for
  buttons, `aria-disabled` and `tabindex="-1"` for links. State classes (`is-active`,
  `is-open`, `is-expanded`, `is-disabled`) are also applied to the clickable element, not
  its wrapping list item.
- `attrs` - any extra attributes for the rendered element (`title`, `target`, `rel`,
  `data-*`, …). Vue treats `on*` keys as native listeners, so `attrs: { onClick }` works
  too. Attributes managed by the component (`href`/`to`, `type`, `aria-*`, `disabled`)
  take precedence.

In vertical lists the item may also carry:

- `icon` - `FIcon` name rendered before the label;
- `description` - a second muted line under the label;
- `closeOnSelect: false` - keeps the hosting dropdown/menu open after the click.

#### Item with a submenu

```js
{ label: 'Company', children: [ /* items of any kind */ ] }
```

Same content fields as above, plus one of:

- `children` - nested items: a dropdown on the desktop bar, a flyout inside dropdown
  panels, an inline accordion in the mobile menu. Nesting is not limited.
- `childComponent` / `childArgs` - replaces the built-in children list with a custom
  component (mega-menu panels). It receives `childArgs` merged with
  `{ item, items, close, mode, depth }`.

An item with a submenu always renders as a toggle `<button>` - `url` on it is ignored,
put the link into the children instead.

#### Divider

```js
{ divider: true }
```

A separator line instead of an item. Nothing else is needed - all other fields are
ignored. Renders in vertical lists only; the horizontal bar skips divider items.

#### Custom item

```js
{ itemComponent: PromoLink, itemArgs: { tone: 'accent' } }
```

- `itemComponent` - replaces the built-in item renderer entirely, so `label`, `icon` and
  `description` are unused. The component receives `itemArgs` merged with
  `{ item, mode, depth }` (`mode`: `bar`, `dropdown`, `accordion` or `measure` - the
  hidden overflow-measuring pass) and should render a single clickable root element.
- `active` (the `is-active` class), `disabled` (clicks are blocked), `children` /
  `childComponent` and `closeOnSelect` still work. `attrs` is not applied - pass
  everything through `itemArgs` instead.

Items need no identifiers: keys and the accordion expanded state are derived from the
render position in the tree.

### Translations

`useTranslatedNavigation` is the default adapter for translating a navigation tree. It accepts
the source tree and a translation function such as vue-i18n's `t`, and returns a `computed` tree.
`FHeaderNav` therefore stays independent of the application's internationalisation library.

In the source tree, `label` and `description` contain translation keys. Optional `labelParams`
and `descriptionParams` are passed as the second argument to `t`. Translation is recursive; set
`translate: false` on an item whose `label` or `description` is already display-ready.

```js
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTranslatedNavigation } from 'futility-ui';
// or: futility-ui/FHeader/useTranslatedNavigation

const sourceItems = [
	{ label: 'navigation.docs', url: '/docs' },
	{
		label: 'navigation.company',
		children: [
			{
				label: 'navigation.about',
				description: 'navigation.aboutDescription',
				url: '/about',
			},
		],
	},
];

const { t } = useI18n();
const items = useTranslatedNavigation(sourceItems, t);

const moreLabel = computed(() => t('navigation.showHiddenItems'));
const burgerLabel = computed(() => t('navigation.openMenu'));
const burgerCloseLabel = computed(() => t('navigation.closeMenu'));
```

```html
<FHeaderNav :items="items" :more-label="moreLabel" />
<FHeaderBurger :label="burgerLabel" :close-label="burgerCloseLabel" />
```

Because translation happens inside a Vue `computed`, changing the active locale updates the item
labels automatically. `FHeaderNav` then measures the translated labels again for overflow.
