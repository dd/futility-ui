<template>
	<FIcon
		:name="ok ? 'check_circle_solid' : 'close_circle_solid'"
		:class="ok ? 'fui-boolean-flag-ok' : 'fui-boolean-flag-not-ok'"
	/>
</template>

<script setup>
import FIcon from '../FIcon';


defineOptions({ name: 'FBooleanFlag' });

defineProps({
	/** Flag ok. */
	ok: Boolean,
});
</script>
