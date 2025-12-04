<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div>
    <h1>@ambitiondev/nuxt-cookiebot</h1>

    <NuxtLink
      :to="
        localePath({
          name: 'iframe',
        })
      "
    >
      Iframe page
    </NuxtLink>
  </div>
</template>
