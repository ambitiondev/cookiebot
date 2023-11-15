<script setup lang="ts">
	// Vendor
	import { useCookiebot } from '@ambitiondev/vue-cookiebot';
	import { onMounted } from 'vue';
	import { useI18n } from 'vue-i18n';

	// Composable
	const { t, locale } = useI18n();
	const { consentBanner } = useCookiebot(import.meta.env.VITE_COOKIEBOT_ID, {
		culture: locale.value,
	});

	onMounted(async () => {
		await consentBanner();
	});
</script>

<template>
	<div>
		{{
			t('welcome', {
				locale,
			})
		}}
	</div>
</template>
