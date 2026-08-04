<script setup lang="ts">
const localePath = useLocalePath();

const { cookieDeclaration } = useCookiebot();
const declarationRef = useTemplateRef("declaration");

onMounted(() => {
  cookieDeclaration(declarationRef.value);
});
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

    <NuxtLink
      :to="
        localePath({
          name: 'consent',
        })
      "
    >
      Consent page
    </NuxtLink>

    <div ref="declaration" />
  </div>
</template>
