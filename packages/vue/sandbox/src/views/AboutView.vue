<script setup lang="ts">
// Vendor
import { useCookiebot } from "../../../src/cookiebot";
import { onMounted, useTemplateRef } from "vue";

// Refs
const cookieDeclarationRef = useTemplateRef("cookie-declaration");

// Composable
const { cookieDeclaration } = useCookiebot({
  consentmode: "disabled",
  culture: "dk",
  level: "implied",
});

onMounted(() => {
  cookieDeclaration(cookieDeclarationRef);
});
</script>

<template>
  <div ref="cookie-declaration"></div>
</template>
