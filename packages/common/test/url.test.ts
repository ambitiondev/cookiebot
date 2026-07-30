// Vendor
import { describe, test, expect } from "vitest";

// Utils
import { COOKIE_DECLARATION_URL } from "../src";

describe("URL", () => {
  test("should return the correct cookie declaration URL for a given Cookiebot ID", () => {
    const cookiebotId = "12345678-1234-1234-1234-123456789012";
    const expectedUrl = `https://consent.cookiebot.com/${cookiebotId}/cd.js`;
    expect(COOKIE_DECLARATION_URL(cookiebotId)).toBe(expectedUrl);
  });
});
