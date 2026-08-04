import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  envDir: "./sandbox",
  plugins: [vue()],
  resolve: {
    alias: {
      "@ambitiondev/cookiebot-common": fileURLToPath(
        new URL("../common/src/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
  },
});
