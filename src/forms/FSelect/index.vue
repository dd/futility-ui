<template>
	<div
		class="fui-select"
		:class="[
			attrs.class,
			`fui-select-size-${size}`,
			{ 'has-error': error },
		]"
	>
		<select
			v-model="model"
			v-bind="inputAttrs"
			class="fui-select-select"
		>
			<option
				v-if="emptyOptionLabel"
				:value="emptyOptionValue"
				v-html="emptyOptionLabel"
			/>
			<option
				v-for="option in optionList"
				:key="option.value"
				:value="option.value"
				:disabled="option.disabled"
				v-html="option.label"
			/>
		</select>
	</div>
</template>

<script setup >
import { computed, defineModel, useAttrs } from 'vue';

defineOptions({
	name: 'FSelect',
	inheritAttrs: false,
});

const model = defineModel({
	// type: [ String, Number, null ],
	default: null,
});

defineProps({
	/**
	 * List of options
	 *
	 * option[]:
	 * * value - string, integer or object value
	 * * label - text label
	 * * disabled - disable flag
	 *
	 * @todo: group options
	 *
	 * eg:
	 *
	 * `[ { value: <value>, label: '<label>' }, ... ]`
	 *
	 */
	optionList: {
		type: Array,
		default: () => [],
	},

	/**
	 * Empty option label.
	 *
	 * If you specify text, the empty option will be automatically added to the list of options.
	 */
	emptyOptionLabel: String,

	/** Empty option value. */
	emptyOptionValue: {
		type: null,
		default: null,
	},

	/** Error flag. */
	error: Boolean,

	/** Widget size. */
	size: {
		type: String,
		default: 'm',
		// validator: (type) => ['small', 'regular', 'large'].includes(type),
	},
});

const attrs = useAttrs();

/**
 * Any attributes for select tag - id, name, disabled etc.
 */
const inputAttrs = computed(() => {
	const { class: __omit, ..._attrs } = attrs; // eslint-disable-line no-unused-vars

	return _attrs;
});
</script>
