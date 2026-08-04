<script setup lang="ts">
const cookieDeclarationRef = useTemplateRef("cookie-declaration");

const { cookieDeclaration } = useCookiebot();

onMounted(() => {
  cookieDeclaration(cookieDeclarationRef);
});
</script>

<template>
  <div ref="cookie-declaration" />
</template>
