<script setup lang="ts">
const { consentBanner } = useCookiebot();

consentBanner();
</script>

<template>
  <div>
    <h1>Nuxt Cookiebot Module</h1>
    <p>Banner will be triggered on this page</p>
  </div>
</template>
