<script setup lang="ts">
const cookiebot = useCookiebot();

cookiebot.consentBanner();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
