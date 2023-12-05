<script setup lang="ts">
	// Vendor
	import { useCookiebot } from '@ambitiondev/vue-cookiebot';
	import { onMounted, ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	// Refs
	const consentPageRef = ref<HTMLDivElement | null>(null);

	// Composable
	const { locale } = useI18n();
	const { consentPage } = useCookiebot({
		culture: locale.value,
	});

	onMounted(async () => {
		if (consentPageRef.value) {
			await consentPage(consentPageRef.value);
		}
	});
</script>

<template>
	<div ref="consentPageRef"></div>
</template>
