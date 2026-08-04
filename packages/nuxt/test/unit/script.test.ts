// Vendor
import { describe, test, expect, vi } from "vitest";

// Util
import { buildConsentBannerScriptOptions } from "../../src/runtime/script-helper";

vi.mock("#cookiebot-options", () => ({
  cookiebotId: "test-cookiebot-id",
}));

describe("buildConsentBannerScriptOptions", () => {
  test("should return the correct script options for provided Cookiebot options", () => {
    const result = buildConsentBannerScriptOptions({
      type: "optin",
      level: "strict",
      culture: "en-US",
      blockingMode: "auto",
      consentmode: true,
    });

    expect(result["data-type"]).toBe("optin");
    expect(result["data-level"]).toBe("strict");
    expect(result["data-culture"]).toBe("en-US");
    expect(result["data-blockingmode"]).toBe("auto");
    expect(result["data-consentmode"]).toBe("true");
  });

  test("should map consentmode false to disabled", () => {
    const result = buildConsentBannerScriptOptions({
      consentmode: false,
    });

    expect(result["data-consentmode"]).toBe("disabled");
  });

  test("should map consentmode disabled to disabled", () => {
    const result = buildConsentBannerScriptOptions({
      consentmode: "disabled",
    });

    expect(result["data-consentmode"]).toBe("disabled");
  });
});
