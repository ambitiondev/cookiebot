<script setup lang="ts">
	// Vendor
	import { useCookiebot } from '@ambitiondev/vue-cookiebot';
	import { onMounted, ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	// Refs
	const consentPageRef = ref<HTMLDivElement | null>(null);

	// Composable
	const { locale } = useI18n();
	const { cookieDeclaration } = useCookiebot({
		culture: locale.value,
	});

	onMounted(async () => {
		await cookieDeclaration(consentPageRef.value);
	});
</script>

<template>
	<div ref="consentPagesRef"></div>
</template>
