import { createPage, setup } from "@nuxt/test-utils/e2e";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

describe("runtime config", async () => {
  await setup({
    rootDir: fileURLToPath(
      new URL("./fixtures/runtime-config", import.meta.url),
    ),
    browser: true,
  });

  test("shows the consent banner by default", async () => {
    const page = await createPage("/");
    await page.waitForSelector("#__nuxt", { timeout: 5000 });

    await page.waitForSelector(
      'script[src*="consent.cookiebot.com/uc.js"][data-cbid]',
      { timeout: 10000, state: "attached" },
    );

    const hasCookiebotScriptWithCbid = await page.evaluate(
      () =>
        !!document.querySelector(
          'script[src*="consent.cookiebot.com/uc.js"][data-cbid]',
        ),
    );
    expect(hasCookiebotScriptWithCbid).toBe(true);
  });
});
