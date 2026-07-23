// Vendor
import { describe, test, expect, vi } from "vitest";

// Util
import { buildScriptOptionsForLocale } from "../../src/utils/script";

vi.mock("#cookiebot-options", () => ({
  cookiebotId: "test-cookiebot-id",
}));

describe("buildScriptOptionsForLocale", () => {
  test("should return the correct script options for a given locale", () => {
    const locale = "en-US";
    const result = buildScriptOptionsForLocale(locale);

    expect(result["data-culture"]).toBe(locale);
  });
});
