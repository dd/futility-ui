<template>
	<VueFinalModal
		v-model="isOpen"
		class="fui-modal-vfm"
		content-transition="vfm-fade"
		overlay-class="fui-modal-overlay"
		content-class="fui-modal-content"
		:click-to-close="clickToClose"
		:esc-to-close="escToClose"
		:teleport-to="teleportTo"
		@opened="emit('opened')"
		@closed="emit('closed')"
	>
		<slot :close="close" />
	</VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';


defineOptions({ name: 'FModal', inheritAttrs: false });

const isOpen = defineModel({ type: Boolean, default: false });
defineProps({
	/** Close the modal when clicking the overlay. */
	clickToClose: {
		type: Boolean,
		default: true,
	},

	/** Close the modal when pressing Escape. */
	escToClose: {
		type: Boolean,
		default: true,
	},

	/** Target element for <Teleport>. */
	teleportTo: {
		type: [ String, Object ],
		default: 'body',
	},
});

const emit = defineEmits([ 'opened', 'closed' ]);

const close = () => {
	isOpen.value = false;
};
</script>
