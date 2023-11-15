<script setup lang="ts">
	// Vendor
	import { useCookiebot } from '@ambitiondev/vue-cookiebot';
	import { onMounted } from 'vue';
	import { useI18n } from 'vue-i18n';

	// Composable
	const { locale } = useI18n();
	const { consentBanner } = useCookiebot(import.meta.env.VITE_COOKIEBOT_ID, {
		culture: locale.value,
	});

	onMounted(async () => {
		await consentBanner();
	});
</script>

<template>
	<router-link to="/">Home</router-link>
	<router-link to="/consentpage">Consent page</router-link>
	<router-view></router-view>
</template>
