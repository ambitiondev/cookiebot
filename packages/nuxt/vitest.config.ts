import { fileURLToPath, URL } from "node:url";

import { defineVitestProject } from "@nuxt/test-utils/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            "@ambitiondev/cookiebot-common": fileURLToPath(
              new URL("../common/src/index.ts", import.meta.url),
            ),
          },
        },
        test: {
          name: "unit",
          include: ["test/unit/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      {
        resolve: {
          alias: {
            "@ambitiondev/cookiebot-common": fileURLToPath(
              new URL("../common/src/index.ts", import.meta.url),
            ),
          },
        },
        test: {
          name: "e2e",
          include: ["test/e2e/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        resolve: {
          alias: {
            "@ambitiondev/cookiebot-common": fileURLToPath(
              new URL("../common/src/index.ts", import.meta.url),
            ),
          },
        },
        test: {
          name: "nuxt",
          include: ["test/nuxt/*.{test,spec}.ts"],
          environment: "nuxt",
        },
      }),
    ],
  },
});
