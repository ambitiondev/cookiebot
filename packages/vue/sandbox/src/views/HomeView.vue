<script setup lang="ts">
// Vendor
import { useCookiebot } from '@ambitiondev/vue-cookiebot';
import { onMounted, ref } from 'vue';

// Refs
const cookieDeclarationRef = ref<HTMLDivElement | null>(null);

// Composable
const { cookieDeclaration } = useCookiebot();

onMounted(() => {
    cookieDeclaration(cookieDeclarationRef);
});
</script>

<template>
    <div class="home">
        <h1>This is the homepage</h1>
        <div ref="cookieDeclarationRef"></div>
    </div>
</template>
