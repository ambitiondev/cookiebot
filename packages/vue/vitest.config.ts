import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: "./sandbox",
  plugins: [vue()],
  test: {
    environment: "jsdom",
  },
});
