import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: ".",
  plugins: [vue()],
  test: {
    environment: "jsdom",
  },
});
