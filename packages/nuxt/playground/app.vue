<script setup lang="ts">
	const test = ref<HTMLElement | null>(null);

	const { consentBanner, cookieDeclaration } = useCookieBot();

	onMounted(() => {
		cookieDeclaration(test);
	});
</script>

<template>
	<div ref="test" />
</template>
