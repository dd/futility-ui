<template>
	<div
		ref="fInputWidget"
		:class="[
			attrs.class,
			'fui-input-autocomplete',
			`fui-iauto-size-${size}`,
		]"
	>
		<div
			class="fui-iauto-label_wrapper"
			:class="{
				'has-error': error,
				'has-value': model,
			}"
		>
			<input
				v-model="filterValue"
				:id="filterInputID"
				type="text"
				class="fui-iauto-query_input"
				:disabled="disabled"
				role="searchbox"
				:aria-expanded="showOptions.toString()"
				aria-haspopup="listbox"
				:aria-controls="`listbox-${filterInputID}`"
				:aria-activedescendant="highlightedOptionValue"
				:placeholder="placeholderFilter"
				@focus="toggleDropDown(true)"
				@keydown="handleKeydown"
			>
			<div class="fui-iauto-label" >
				<label
					class="fui-iauto-label_text"
					:for="filterInputID"
				>
					{{ (currentOption && currentOption.label) || model || placeholderLabel }}
				</label>
				<button
					v-if="model && !required"
					type="button"
					class="fui-iauto-label_remove"
					:aria-label="resolvedTexts.clearButtonAriaLabel"
					:title="resolvedTexts.clearButtonTitle"
					:disabled="disabled"
					@click.stop="clearSelect"
				>
					<FIcon name="close" />
				</button>
			</div>
		</div>

		<div
			v-if="showOptions"
			class="fui-iauto-dropdown"
			:class="{
				'fui-iauto-options_loading': loadingPage == 1,
			}"
			role="listbox"
			:id="`listbox-${filterInputID}`"
			@scroll="handleScroll"
		>
			<button
				v-for="(option, index) in optionList"
				:key="option.value"

				type="button"
				:disabled="option.disabled || false"
				class="fui-iauto-option"
				:class="{
					'fui-iauto-option-current': option.value === model,
				}"
				role="option"
				:aria-selected="index === highlightedIndex"
				:id="`option-${option.value}`"
				ref="optionListRefs"
				tabindex="-1"
				@click="selectOption(option)"
			>
				<slot
					name="option-label"
					:option="option"
					:value="model"
				>
					{{ option.label }}
				</slot>
			</button>
			<div v-if="loadingPage || nextPage" class="fui-iauto-option-loader" ref="loader" ><FLoader /></div>
			<div
				v-else-if="!(optionList && optionList.length)"
				class="fui-iauto-option-empty"
				role="status"
			>{{ resolvedTexts.noOptions }}</div>
		</div>

		<input
			v-model="model"
			v-bind="inputAttrs"
			:required="required"
			:disabled="disabled"
			type="hidden"
			class="fui-iauto-input"
		>
	</div>
</template>


<script setup >
import { computed, onMounted, ref, useAttrs, useId, watch, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { FLoader, FIcon } from 'futility-ui';

import { useFocusWithin } from './utils';
import { DEFAULT_TEXTS } from './constants';


defineOptions({
	name: 'FInputAutocomplete',
	inheritAttrs: false,
});
const model = defineModel({
	type: [ Number, String, Boolean ],
});
const filterValue = defineModel('query', {
	type: String,
});
const props = defineProps({
	/**
	 * Search handler.
	 *
	 * A function that receives the input query string and page number for pagination,
	 * and returns a promise resolving to a list of options and a flag indicating if more pages are available:
	 *
	 * ```
	 * {
	 *     options: [
	 *         {
	 *             value: <value>,
	 *             label: '<label>',
	 *             disabled: <bool>
	 *         },
	 *         ...
	 *     ],
	 *     hasNext: false
	 * }
	 * ```
	 *
	 * If `null` is returned, the dropdown will not be displayed.
	 *
	 * If an empty array is returned, a "no options found" message will be shown.
	 *
	 * When the handler changes, options will be re-fetched.
	 */
	requestHandler: {
		type: Function,
		required: true,
	},

	/**
	 * Handler for retrieving the initially set (or externally updated) option.
	 *
	 * Receives the current value and should return a promise resolving to the corresponding option.
	 */
	requestCurrentHandler: Function,

	/** Widget size. */
	size: {
		type: String,
		default: 'm',
		// validator: (type) => ['small', 'regular', 'large'].includes(type),
	},

	/** Required flag. */
	required: Boolean,

	/** Disabled flag. */
	disabled: Boolean,

	/** Error flag. */
	error: Boolean,

	/** Filter input ID. */
	filterInputID: {
		type: String,
		default: () => { return useId(); },
	},

	/** Label shown when no value is selected. */
	placeholderLabel: String,

	/** Placeholder text for the options filter input. */
	placeholderFilter: String,

	/**
	 * Widget text labels
	 * - `noOptions` - message shown when the options list is empty
	 * - `clearButtonAriaLabel` - accessible label for the clear button
	 * - `clearButtonTitle` - tooltip text for the clear button
	 */
	texts: {
		type: Object,
		default: () => ({}),
	},
});
const attrs = useAttrs();


const resolvedTexts = computed(() => ({
	...DEFAULT_TEXTS,
	...props.texts,
}));


/**
 * Any attributes for input - id, name, etc.
 */
const inputAttrs = computed(() => {
	const { class: __omit, ..._attrs } = attrs; // eslint-disable-line no-unused-vars

	return _attrs;
});


const clearSelect = () => {
	model.value = null;
	currentOption.value = null;
};


// Request options //////////////////////////////
const loadingPage = ref();
let nextPage;
let abortController = null;
const requestOptions = (query, page=1) => {
	if (page != 1 && !nextPage) {
		return;
	}

	loadingPage.value = page;

	if (abortController) abortController.abort();
	abortController = new AbortController();
	const _abortController = abortController;

	props.requestHandler(query, page, { signal: abortController.signal })
		.then((result) => {
			if (result?.options) {
				if (page == 1) {
					optionList.value = result.options;
					highlightedIndex.value = -1;
				} else {
					optionList.value = [ ...optionList.value, ...result.options ];
				}
				nextPage = result.hasNext ? page + 1 : null;
			} else {
				nextPage = null
			}
			abortController = null;
			loadingPage.value = null;
		})
		.catch(() => {
			if (!_abortController.signal.aborted) {
				abortController = null;
				loadingPage.value = null;
			}
		})
	;
};
watch(filterValue, (newValue) => { requestOptions(newValue); });
watch(() => props.requestHandler, () => { requestOptions(filterValue.value); });
requestOptions(filterValue.value);


// Options //////////////////////////////////////
const optionList = ref([]);
const optionListRefs = ref([]);


// Current option ///////////////////////////////
const currentOption = ref();
const fillCurrentOption = () => {
	if (model.value === currentOption.value?.value) {
		return ;
	}

	if (!model.value) {
		currentOption.value = null;
		return ;
	}

	currentOption.value = {
		value: model.value,
		label: model.value,
	};

	if (props.requestCurrentHandler) {
		props.requestCurrentHandler(model.value)
			.then((response) => {
				currentOption.value = response;
			})
		;
	} else {
		throw new Error(
			'Widget requires the `requestCurrentHandler` to be specified for full functionality.',
		);
	}
};
watch(model, fillCurrentOption);
if (model.value && model.value !== currentOption.value?.value) { fillCurrentOption(); }

const emit = defineEmits([ 'update:option' ]);
watch(currentOption, (newValue) => {
	emit('update:option', newValue);
});

/**
 * Handles selecting a new option.
 */
const selectOption = (newValue) => {
	if (model.value != newValue.value) {
		currentOption.value = newValue;
		model.value = newValue.value;
		toggleDropDown(false);
	} else if (!props.required) {
		model.value = null;
		currentOption.value = null;
		toggleDropDown(false);
	}
};

// Scroll
const loader = ref();
const handleScroll = (event) => {
	let scrolled = event.target.scrollTop + event.target.clientHeight;
	if (loader.value) {
		scrolled = scrolled + loader.value.clientHeight;
	}
	if (scrolled >= event.target.scrollHeight && nextPage && !loadingPage.value) {
		requestOptions(filterValue.value, nextPage);
	}
}

// Dropdown
const fInputWidget = ref();
const showOptions = ref(false);
const toggleDropDown = (newState) => {
	showOptions.value = newState;
	if (!newState) {
		highlightedIndex.value = -1;
	}
};
const { focused } = useFocusWithin(fInputWidget, {}, optionListRefs.value);
watch(focused, (value) => {
	if (!value) toggleDropDown(false);
});
onMounted(() => {
	onClickOutside(
		fInputWidget,
		() => { toggleDropDown(false); },
	);
});

// Navigation through the options list
const highlightedIndex = ref(-1);

/**
 * Returns the correct next option index,
 * taking into account disabled options and the currently selected one
 * (in case the field is required).
 *
 * @todo If there are no enabled options at the end of the list, navigation won't reach the end
 *       and the next page won't be loaded. On overflow and wrap to the beginning,
 *       trigger loading of the next page
 */
const _getHighlightedIndex = (index, shift) => {
	if (!optionList.value || optionList.value.length == 0) {
		return -1;
	}

	// check if there is at least one enabled option
	// excluding current value when field is required
	const hasEnabledOption = optionList.value.some(option =>
		!option.disabled && !(props.required && option.value === model.value)
	);
	if (!hasEnabledOption) {
		return -1;
	}

	const newIndex = (index + shift + optionList.value.length) % optionList.value.length;
	const option = optionList.value[newIndex];
	if (
		option.disabled // disabled option
		|| (props.required && option.value === model.value) // selected option when required
	) {
		// skip and move to the next option
		return _getHighlightedIndex(index + shift, shift);
	}
	return newIndex;
};

/**
 * Keyboard handler:
 * Arrow Up/Down moves the highlight,
 * Enter selects the option
 */
const handleKeydown = (event) => {
	if (event.key === 'ArrowDown') {
		event.preventDefault();
		highlightedIndex.value = _getHighlightedIndex(highlightedIndex.value, 1);
		if (highlightedIndex.value == -1) {
			return ;
		}
		scrollToOption('center');

	} else if (event.key === 'ArrowUp') {
		event.preventDefault();
		highlightedIndex.value = _getHighlightedIndex(highlightedIndex.value, -1);
		if (highlightedIndex.value == -1) {
			return ;
		}
		scrollToOption('center');

	} else if (event.key === 'Enter') {
		/** @todo Remove focus from the filter input to show the selected option,
		 *        or keep the dropdown open (likely more relevant). */
		event.preventDefault();
		if (highlightedIndex.value >= 0) {
			const option = optionList.value[highlightedIndex.value];
			selectOption(option);
		}
	}
};

/**
 * Value of the highlighted option.
 */
const highlightedOptionValue = computed(() => {
	if (highlightedIndex.value >= 0) {
		return `option-${optionList.value[highlightedIndex.value].value}`;
	}

	return null;
});

/**
 * Scroll to the highlighted option.
 */
const scrollToOption = (block) => {
	nextTick(() => {
		optionListRefs.value[highlightedIndex.value].scrollIntoView({
			block,
			behavior: 'instant',
		});
	});
};
</script>
