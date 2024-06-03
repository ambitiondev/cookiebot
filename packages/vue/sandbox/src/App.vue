<script setup lang="ts">
import { useCookiebot } from '@ambitiondev/vue-cookiebot';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const { consentBanner } = useCookiebot();

onMounted(() => {
    consentBanner();
});
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    flex-flow: column;
    width: 100%;
}

.wrapper nav {
    display: flex;
    gap: 1rem;
}
</style>
