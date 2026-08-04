// @vitest-environment jsdom

// Vendor
import { describe, test, expect } from "vitest";

// Utils
import { createScriptWithOptions, removeScript } from "../src/script";

describe("createScriptWithOptions", () => {
  test("should create a script tag with the correct attributes and content", async () => {
    const options = [
      {
        name: "id",
        value: "id_here",
      },
      {
        name: "data-cbid",
        value: "cb_id",
      },
    ];

    const scriptTag = await createScriptWithOptions(
      options,
      "https://example.com/script.js",
      true,
      "text/javascript",
    );

    expect(scriptTag).toBeInstanceOf(HTMLScriptElement);
    expect(scriptTag.src).toBe("https://example.com/script.js");
    expect(scriptTag.async).toBe(true);
    expect(scriptTag.type).toBe("text/javascript");
  });

  test("should remove script element from the context and reset HTML", async () => {
    const context = document.createElement("div");
    const script = document.createElement("script");
    script.id = "my-script";
    context.appendChild(script);

    await removeScript(context, script, true);

    expect(context.contains(script)).toBe(false);
    expect(context.innerHTML).toBe("");
  });

  test("should remove a script element when script is a string", async () => {
    const context = document.createElement("div");
    const scriptId = "my-script";
    const script = document.createElement("script");
    script.id = scriptId;
    context.appendChild(script);

    await removeScript(context, scriptId);

    expect(context.contains(script)).toBe(false);
  });

  test("should not throw when script string does not match an element", async () => {
    const context = document.createElement("div");

    await expect(
      removeScript(context, "missing-script"),
    ).resolves.toBeUndefined();

    expect(context.innerHTML).toBe("");
  });
});
