<template>
	<button
		class="fui-input-pswd_btn fui-input-extra_btn"
		type="button"
		v-on="events"
	>
		<FIcon name="eye_solid" />
	</button>
</template>

<script setup >
import { computed, onMounted, onBeforeUnmount, inject } from 'vue';
import FIcon from '@/components/FIcon';


defineOptions({ name: 'FInputShowPasswordButton' });
const props = defineProps({
	/** Enables toggle behavior: click to show or hide the password instead of showing it only while pressed. */
	toggleMode: Boolean,
});

const showPasswordStatus = inject('showPasswordStatus');
const showPassword = inject('showPassword');
const hidePassword = inject('hidePassword');

const clickHandler = () => {
	if (showPasswordStatus) {
		hidePassword;
	} else {
		showPassword;
	}
};

const events = computed(() => {
	if (props.toggleMode) {
		return {
			'click': clickHandler,
		};
	}

	return {
		'mousedown': (e) => {
			e.preventDefault();
			showPassword();
		},
		'touchstart': (e) => {
			e.preventDefault();
			showPassword();
		},
		'keydown': (e) => {
			if (e.code === 'Space' || e.code === 'Enter') {
				e.preventDefault();
				showPassword();
			}
		},
		'keyup': (e) => {
			e.preventDefault();
			hidePassword();
		},
	};
});

onMounted(() => {
	if (!props.toggleMode) {
		document.addEventListener('mouseup', hidePassword);
		document.addEventListener('touchend', hidePassword);
	}
});

onBeforeUnmount(() => {
	if (!props.toggleMode) {
		document.removeEventListener('mouseup', hidePassword);
		document.removeEventListener('touchend', hidePassword);
	}
});
</script>
