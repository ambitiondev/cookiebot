// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: false,
  },
  dirs: {
    src: ["./.playground"],
  },
}).append({
  files: ["**/app/pages/**/*.vue"],
  rules: {
    "vue/multi-word-component-names": "off",
  },
});
