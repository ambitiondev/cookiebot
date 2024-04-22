<script setup lang="ts">
	// Vendor
	import { useCookiebot } from '@ambitiondev/vue-cookiebot';
	import { onMounted, ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	// Refs
	const consentPageRef = ref<HTMLDivElement | null>(null);

	// Composable
	const { locale } = useI18n();
	const { cookieDeclaration, renew } = useCookiebot({
		culture: locale.value,
	});

	onMounted(async () => {
		await cookieDeclaration(consentPageRef);
	});
</script>

<template>
	<div>
		<button @click="renew">renew</button>
		<div ref="consentPageRef"></div>
	</div>
</template>
