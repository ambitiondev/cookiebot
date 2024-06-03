<script setup lang="ts">
import { onMounted, ref, useCookiebot } from '#imports';

// Composable
const { cookieDeclaration } = useCookiebot();

// Refs
const cookieDeclarationRef = ref<HTMLElement | null>(null);

// Hooks
onMounted(() => {
    cookieDeclaration(cookieDeclarationRef);
});
</script>

<template>
    <div>
        <h1>Test</h1>
        <div ref="cookieDeclarationRef" class="cookieDeclaration"></div>
    </div>
</template>
