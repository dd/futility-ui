<template>
	<FInputText
		v-if="TEXT_ALLOWED_TYPES.includes(type)"
		v-model="model"
		:type="type"
	>
		<template v-slot:start >
			<slot name="start" />
		</template>
		<template v-slot:end >
			<slot name="end" />
		</template>
	</FInputText>
	<!-- <FInputDate v-else-if="type == 'date'" v-model="model" /> -->
	<!-- <FInputPassword v-else-if="type == 'password'" v-model="model" /> -->
</template>

<script setup >
import { defineAsyncComponent } from 'vue';
const FInputText = defineAsyncComponent(() => import('./FInputText.vue'));
// const FInputDate = defineAsyncComponent(() => import('./FInputDate.vue'));
// const FInputPassword = defineAsyncComponent(() => import('./FInputPassword.vue'));
import { TEXT_ALLOWED_TYPES } from './base';

defineOptions({ name: 'FInput' });

defineEmits([ 'update:modelValue' ]);
const model = defineModel();

defineProps({
	/** Input type. */
	type: {
		type: String,
		validator: (type) => TEXT_ALLOWED_TYPES.includes(type) || type === 'date' || type === 'password',
	},
});
</script>
