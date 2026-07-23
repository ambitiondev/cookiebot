import { $fetch, setup } from "@nuxt/test-utils/e2e";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

describe("ssr", async () => {
  await setup({
    rootDir: fileURLToPath(
      new URL("./fixtures/no-auto-banner", import.meta.url),
    ),
  });

  test("renders the index page", async () => {
    const html = await $fetch("/");

    expect(html).toContain("<div>basic</div>");
  });
});
