<script setup lang="ts">
	const cookieDeclarationRef = ref<HTMLElement | null>(null);

	const { cookieDeclaration } = useCookiebot();

	onMounted(() => {
		cookieDeclaration(cookieDeclarationRef);
	});
</script>

<template>
	<div ref="cookieDeclarationRef" />
</template>
