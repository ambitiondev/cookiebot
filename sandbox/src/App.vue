<script setup lang="ts">
	// Vendor
	import { useCookiebot } from '@ambitiondev/vue-cookiebot';
	import { onMounted } from 'vue';

	// Composable
	const { consentBanner } = useCookiebot();

	onMounted(() => {
		consentBanner();
	});
</script>

<template>
	<router-link to="/">Home</router-link>
	<router-link to="/consentpage">Consent page</router-link>
	<router-view></router-view>
</template>
