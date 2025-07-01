<template>
	<div
		class="fui-switch fui-ternary_switch"
		:class="widgetClasses"
		:title="title"
	>
		<select
			v-model="model"
			class="fui-tsw-select"
			tabindex="-1"
			:disabled="disabled"
			v-bind="inputAttrs"
		>
			<option :value="null" >---</option>
			<option :value="true" >True</option>
			<option :value="false" >False</option>
		</select>
		<button
			type="button"
			class="fui-tsw-widget"
			:class="{
				'fui-value-null': model === null || model === undefined,
				'fui-value-true': model === true,
				'fui-value-false': model === false,
			}"
			:aria-label="ariaLabel"
			:disabled="disabled"
			role="switch"
			@click="switchValue"
		/>
	</div>
</template>

<script setup >
import { computed, defineModel, useAttrs, useSlots } from 'vue';


defineOptions({
	name: 'FTernarySwitch',
	inheritAttrs: false,
});

const model = defineModel({
	type: [ Boolean, null ],
});

const props = defineProps({
	/** Disabled flag. */
	disabled: Boolean,

	/** Error flag. */
	error: Boolean,

	/** Widget title. */
	title: String,

	/** Widget aria-label. */
	ariaLabel: String,
});

const attrs = useAttrs();


const disabled = computed(() => props.disabled);

/** Method to switch current value. */
const switchValue = (e) => {
	if (disabled.value) {
		return ;
	}

	if (model.value === true) {
		model.value = false;
	} else if (model.value === false) {
		model.value = null;
	} else if (model.value === null || model.value === undefined) {
		model.value = true;
	} else {
		console.warn('FTripleSwitch | Unknown condition', model.value); // eslint-disable-line no-console
		// We perceive an unknown state as true and, accordingly, when switching the state, we convert it to true
		model.value = false;
	}
};


const widgetClasses = computed(() => {
	const result = [];

	if (attrs.class) {
		result.push(attrs.class);
	}

	if (props.error) {
		result.push('has-error');
	}

	return result;
});

const inputAttrs = computed(() => {
	const { class: __omit, ..._attrs } = attrs; // eslint-disable-line no-unused-vars

	return _attrs;
});
</script>
