import { fileURLToPath, URL } from "node:url";

import { defineVitestProject } from "@nuxt/test-utils/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@ambitiondev/cookiebot-common": fileURLToPath(
        new URL("../common/src/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["test/unit/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      {
        test: {
          name: "e2e",
          include: ["test/e2e/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["test/nuxt/*.{test,spec}.ts"],
          environment: "nuxt",
        },
      }),
    ],
  },
});
