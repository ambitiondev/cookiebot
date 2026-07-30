// @vitest-environment jsdom

import { describe, expect, test, vi } from "vitest";

import { cookieBot } from "../../src";

describe("cookieBot plugin", () => {
  test("runs Cookiebot scripts after router navigation", () => {
    const runScripts = vi.fn();
    const afterEach = vi.fn();
    const provide = vi.fn();
    const requestAnimationFrameSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });

    window.Cookiebot = {
      runScripts,
    } as typeof window.Cookiebot;

    const app = {
      provide,
      config: {
        globalProperties: {
          $router: {
            afterEach,
          },
        },
      },
    };

    cookieBot.install(app as never, { cookiebotId: "test-id" } as never);

    expect(provide).toHaveBeenCalledWith("cookieBotOptions", {
      cookiebotId: "test-id",
    });
    expect(afterEach).toHaveBeenCalledTimes(1);

    const navigationHook = afterEach.mock.calls[0]?.[0];
    expect(typeof navigationHook).toBe("function");
    +navigationHook();
    +expect(runScripts).toHaveBeenCalledTimes(1);
    +requestAnimationFrameSpy.mockRestore();
  });

  test("does nothing when Cookiebot runScripts is unavailable", () => {
    const afterEach = vi.fn();
    const requestAnimationFrameSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });

    window.Cookiebot = {} as typeof window.Cookiebot;

    const app = {
      provide: vi.fn(),
      config: {
        globalProperties: {
          $router: {
            afterEach,
          },
        },
      },
    };

    cookieBot.install(app as never, { cookiebotId: "test-id" } as never);

    const navigationHook = afterEach.mock.calls[0]?.[0];
    expect(() => navigationHook()).not.toThrow();

    requestAnimationFrameSpy.mockRestore();
  });
});
