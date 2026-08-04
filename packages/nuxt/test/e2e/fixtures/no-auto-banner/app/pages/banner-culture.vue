<script setup lang="ts">
const { consentBanner } = useCookiebot({
  culture: "nl-NL",
});

consentBanner();
</script>

<template>
  <div>
    <h1>Nuxt Cookiebot Module</h1>
    <p>Banner with defined culture will be triggered on this page</p>
  </div>
</template>
