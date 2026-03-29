<template>
	<button
		class="fui-input-pswd_btn fui-input-extra_btn"
		type="button"
		@click="clickHandler"
		@mousedown="pressShowHandler"
		@touchstart="pressShowHandler"
		@keydown="keyShowHandler"
		@keyup="keyHideHandler"
		v-bind="buttonAttrs"
	>
		<FIcon name="eye_solid" />
	</button>
</template>

<script setup >
import { computed, onMounted, onBeforeUnmount, inject } from 'vue';
import FIcon from '@/FIcon';
import { SHOW_PASSWORD_DEFAULT_TEXTS } from './constants';

defineOptions({ name: 'FInputShowPasswordButton' });
const props = defineProps({
	/** Enables toggle behavior: click to show or hide the password instead of showing it only while pressed. */
	toggleMode: Boolean,
	/**
	 * Custom text values for the password visibility button states.
	 * Allows overriding default aria-label and title content.
	 */
	texts: {
		type: Object,
		default: () => ({}),
	},
});

const showPasswordStatus = inject('showPasswordStatus');
const showPassword = inject('showPassword');
const hidePassword = inject('hidePassword');

const clickHandler = () => {
	if (props.toggleMode) {
		if (showPasswordStatus.value) {
			hidePassword();
		} else {
			showPassword();
		}
	}
};

const pressShowHandler = (e) => {
	if (!props.toggleMode) {
		e.preventDefault();
		showPassword();
	}
};

const pressHideHandler = () => {
	if (!props.toggleMode) {
		hidePassword();
	}
};

const keyShowHandler =  (e) => {
	if (!props.toggleMode && (e.code === 'Space' || e.code === 'Enter')) {
		e.preventDefault();
		showPassword();
	}
};

const keyHideHandler =  (e) => {
	if (!props.toggleMode && (e.code === 'Space' || e.code === 'Enter')) {
		e.preventDefault();
		hidePassword();
	}
};

onMounted(() => {
	document.addEventListener('mouseup', pressHideHandler);
	document.addEventListener('touchend', pressHideHandler);
});

onBeforeUnmount(() => {
	document.removeEventListener('mouseup', pressHideHandler);
	document.removeEventListener('touchend', pressHideHandler);
});

const resolvedTexts = computed(() => ({
	...SHOW_PASSWORD_DEFAULT_TEXTS,
	...props.texts,
}));

const buttonAttrs = computed(() => {
	const isShown = showPasswordStatus.value;
	let result = {};

	if (props.toggleMode) {
		result['aria-label'] = isShown ? resolvedTexts.value.hide : resolvedTexts.value.show;
		result['aria-pressed'] = isShown;
	} else {
		result['aria-label'] = isShown ? resolvedTexts.value.showing : resolvedTexts.value.show;
	}

	result['title'] = result['aria-label'];

	return result;
});
</script>
