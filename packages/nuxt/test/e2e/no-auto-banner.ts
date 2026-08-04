import { createPage, setup } from "@nuxt/test-utils/e2e";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

describe("no auto banner", async () => {
  await setup({
    rootDir: fileURLToPath(
      new URL("./fixtures/no-auto-banner", import.meta.url),
    ),
    browser: true,
  });

  test("doesn't show the consent banner by default", async () => {
    const page = await createPage("/");
    await page.waitForSelector("#__nuxt", { timeout: 5000 });

    await expect(
      page.waitForSelector('script[src*="consent.cookiebot.com/uc.js"]', {
        timeout: 2000,
        state: "attached",
      }),
    ).rejects.toThrow();

    const hasCookiebotScript = await page.evaluate(
      () =>
        !!document.querySelector('script[src*="consent.cookiebot.com/uc.js"]'),
    );
    expect(hasCookiebotScript).toBe(false);
  });

  test("doesn't show the consent banner, but shows it when navigating to banner page", async () => {
    const page = await createPage("/");
    await page.waitForSelector("#__nuxt", { timeout: 5000 });

    await expect(
      page.waitForSelector('script[src*="consent.cookiebot.com/uc.js"]', {
        timeout: 2000,
        state: "attached",
      }),
    ).rejects.toThrow();

    const hasCookiebotScript = await page.evaluate(
      () =>
        !!document.querySelector('script[src*="consent.cookiebot.com/uc.js"]'),
    );
    expect(hasCookiebotScript).toBe(false);

    await page.click('[data-testid="banner-default"]');
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

  test("doesn't show the consent banner, but shows it when navigating to banner page with culture", async () => {
    const page = await createPage("/");
    await page.waitForSelector("#__nuxt", { timeout: 5000 });

    await expect(
      page.waitForSelector('script[src*="consent.cookiebot.com/uc.js"]', {
        timeout: 2000,
        state: "attached",
      }),
    ).rejects.toThrow();

    const hasCookiebotScript = await page.evaluate(
      () =>
        !!document.querySelector('script[src*="consent.cookiebot.com/uc.js"]'),
    );
    expect(hasCookiebotScript).toBe(false);

    await page.click('[data-testid="banner-culture"]');
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

    const scriptCulture = await page.evaluate(() =>
      document
        .querySelector('script[src*="consent.cookiebot.com/uc.js"][data-cbid]')
        ?.getAttribute("data-culture"),
    );
    expect(scriptCulture).toBe("nl-NL");
  });
});
