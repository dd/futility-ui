<template>
	<div
		ref="fInputWidget"
		:class="[
			attrs.class,
			'fui-input-autocomplete',
			`fui-iauto-size-${size}`,
			{
				'has-error': error,
				'has-value': model,
			},
		]"
	>
		<input
			v-model="filterValue"
			ref="filterInputRef"
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
			@focus="openDropDown"
			@keydown="handleKeydown"
			@blur="handleBlur"
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

		<FDropdown
			v-model:open="showOptions"
			:id="`listbox-${filterInputID}`"
			trigger="manual"
			appearance="select"
			:disabled="disabled"
			:style="dropdownStyle"
			:class="[
				'fui-iauto-dropdown',
				{ 'fui-iauto-options_loading': loadingPage == 1 },
				dropdownClass,
			]"
			role="listbox"
			tabindex="-1"
			:triggerRef="fInputWidget"
			@mousedown.prevent
			@scroll="handleScroll"
		>
			<button
				v-for="(option, index) in optionList"
				:key="option.value"

				:id="`option-${option.value}`"
				ref="optionListRefs"
				type="button"
				role="option"
				:aria-selected="index === highlightedIndex"
				tabindex="-1"
				:class="[
					'fui-dropdown-select_option',
					{ 'is-current': option.value === model },
				]"
				:disabled="option.disabled || false"
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
		</FDropdown>

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
import { computed, ref, useAttrs, useId, watch, nextTick } from 'vue';
import { useElementSize } from '@vueuse/core';
import FLoader from '@/FLoader';
import FIcon from '@/FIcon';
import FDropdown from '@/FDropdown';

import { DEFAULT_TEXTS } from './constants';


defineOptions({
	name: 'FInputAutocomplete',
	inheritAttrs: false,
});
/**
 * The currently selected value (`v-model`).
 * Changing this externally triggers `requestCurrentHandler` to resolve the matching label.
 */
const model = defineModel({
	type: [ Number, String, Boolean ],
});

/**
 * The current search query typed in the filter input (`v-model:query`).
 * Can be bound externally to read or pre-fill the search string.
 */
const filterValue = defineModel('query', {
	type: String,
});
const props = defineProps({
	/**
	 * Called whenever the query changes or the handler itself is replaced.
	 * Receives `(query, page, { signal })` and must return a Promise resolving to:
	 *
	 * ```ts
	 * {
	 *   options: { value, label, disabled? }[],
	 *   hasNext: boolean,
	 * }
	 * ```
	 *
	 * Return `null` to suppress the dropdown entirely.
	 * The `signal` is an `AbortSignal` - pass it to `fetch` to cancel the request when a newer one arrives.
	 * When the handler prop itself changes, options are re-fetched automatically.
	 */
	requestHandler: {
		type: Function,
		required: true,
	},

	/**
	 * Called when a value is set externally (on mount or via `v-model`) to resolve its display label.
	 * Receives the current value and must return a Promise resolving to the matching option `{ value, label }`.
	 * Until the promise resolves, the raw value is shown as a fallback label.
	 */
	requestCurrentHandler: Function,

	/** Controls the height of the input. */
	size: {
		type: String,
		default: 'm',
		// validator: (type) => ['small', 'regular', 'large'].includes(type),
	},

	/**
	 * When `true`, the clear button is hidden and re-clicking the selected option does not deselect it.
	 * Also skips the selected option during keyboard navigation.
	 */
	required: Boolean,

	/** Disables the input and the clear button. */
	disabled: Boolean,

	/** Applies the error visual state to the input border. */
	error: Boolean,

	/**
	 * ID attribute for the search input.
	 * Automatically generated via `useId()` if not provided.
	 * Use when you need to associate an external `<label>` with the input.
	 */
	filterInputID: {
		type: String,
		default: () => { return useId(); },
	},

	/** Text shown in the label area when no value is selected. */
	placeholderLabel: String,

	/** Placeholder text for the search input inside the label area. */
	placeholderFilter: String,

	/**
	 * Overrides for UI text labels - useful for localisation.
	 *
	 * - `noOptions` - message shown when the options list is empty
	 * - `clearButtonAriaLabel` - accessible label for the clear button
	 * - `clearButtonTitle` - tooltip text for the clear button
	 */
	texts: {
		type: Object,
		default: () => ({}),
	},

	/**
	 * Extra class(es) applied to the dropdown panel. Accepts any value valid for Vue's `:class`
	 * binding.
	 */
	dropdownClass: {
		type: [ String, Array, Object ],
		default: null,
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
watch(filterValue, (newValue) => {
	requestOptions(newValue);
	if (filterInputRef.value === document.activeElement && !showOptions.value) {
		showOptions.value = true;
	}
});
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
	} else if (!props.required) {
		model.value = null;
		currentOption.value = null;
	} else {
		return;
	}
	closeDropDown();
	filterInputRef.value?.blur();
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
const filterInputRef = ref();
const showOptions = ref(false);

const { width: rootWidth } = useElementSize(fInputWidget);
const dropdownStyle = computed(() => ({
	width: `${rootWidth.value}px`,
}));

const openDropDown = () => {
	showOptions.value = true;
};

const closeDropDown = () => {
	showOptions.value = false;
	highlightedIndex.value = -1;
};

const handleBlur = () => {
	setTimeout(() => closeDropDown(), 0);
};

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
	} else if (event.key === 'Escape') {
		event.preventDefault();
		closeDropDown();
		filterInputRef.value?.blur();
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
