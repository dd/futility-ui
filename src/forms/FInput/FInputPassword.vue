<template>
	<label
		class="fui-input fui-input-password"
		:class="widgetAttrs"
	>
		<slot
			name="start"
			v-bind="{
				'showPasswordStatus': showPasswordStatus,
				'showPassword': showPasswordFn,
				'hidePassword': hidePasswordFn,
			}"
		/>
		<input
			v-model="model"
			v-bind="inputAttrs"
			:type="inputType"
			:disabled="disabled"
			class="fui-input-input"
		>
		<slot
			name="end"
			v-bind="{
				'showPasswordStatus': showPasswordStatus,
				'showPassword': showPasswordFn,
				'hidePassword': hidePasswordFn,
			}"
		/>
	</label>
</template>

<script setup >
import { computed, ref, useAttrs, provide } from 'vue';
import FIcon from '@/FIcon';


defineOptions({
	name: 'FInputPassword',
	inheritAttrs: false,
});
defineEmits([ 'update:modelValue' ]);
const model = defineModel({ type: String });
const props = defineProps({
	/** Disable flag. */
	disabled: Boolean,
});
const attrs = useAttrs();


const widgetAttrs = computed(() => {
	const result = [];

	if (attrs.class) {
		result.push(attrs.class);
	}

	return result;
});

const inputAttrs = computed(() => {
	let { class: __omit, ..._attrs } = attrs; // eslint-disable-line no-unused-vars

	return _attrs;
});


// Show Password ////////////////////////////////
const showPasswordStatus = ref(false);

const inputType = computed(() => {
	if (showPasswordStatus.value) {
		return 'text';
	}

	return 'password';
});

const showPasswordFn = () => { showPasswordStatus.value = true; };
const hidePasswordFn = () => { showPasswordStatus.value = false; };

provide('showPasswordStatus', showPasswordStatus);
provide('showPassword', showPasswordFn);
provide('hidePassword', hidePasswordFn);
</script>
