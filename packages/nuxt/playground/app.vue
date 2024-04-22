<script setup lang="ts">
	const cookieDeclarationRef = ref<HTMLElement | null>(null);

	const { cookieDeclaration, renew } = useCookiebot();

	onMounted(() => {
		cookieDeclaration(cookieDeclarationRef);
	});
</script>

<template>
	<div>
		<button @click="renew">renew</button>
		<div ref="cookieDeclarationRef" />
	</div>
</template>
