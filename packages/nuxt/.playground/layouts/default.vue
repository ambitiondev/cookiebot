<script setup lang="ts">
const path = useSwitchLocalePath();
</script>

<template>
  <Body>
    <div>
      <NuxtLink :to="path('en')"> English </NuxtLink>
      <NuxtLink :to="path('nl')"> Nederlands </NuxtLink>
    </div>
    <main id="main-content">
      <slot />
    </main>
  </Body>
</template>
