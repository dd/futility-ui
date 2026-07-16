<template>
	<button
		v-if="visible"
		class="fui-header-burger"
		type="button"
		:aria-expanded="String(context.menuOpen)"
		:aria-controls="context.menuId"
		:aria-label="context.menuOpen ? closeLabel : label"
		@click="context.toggleMenu"
	>
		<slot :open="context.menuOpen">
			<FIcon :name="context.menuOpen ? 'close' : 'bars'" />
		</slot>
	</button>
</template>

<script setup>
import { computed, inject } from 'vue';

import FIcon from '@/FIcon';

import { FHEADER_CONTEXT_KEY } from './constants';


defineOptions({ name: 'FHeaderBurger' });


defineProps({
	label: {
		type: String,
		default: 'Open navigation menu',
	},

	closeLabel: {
		type: String,
		default: 'Close navigation menu',
	},
});


const context = inject(FHEADER_CONTEXT_KEY, null);

const visible = computed(() =>
	Boolean(context?.isMobile && context?.hasMenuContent),
);
</script>
