// @vitest-environment jsdom

// Vendor
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { defineComponent, ref } from "vue";

// Local
import { cookieBot, useCookiebot } from "../../src";

const CookiebotComponent = defineComponent({
  template: '<div ref="cdElement"></div>',
  name: "CookiebotComponent",
  expose: [
    "consentBanner",
    "cookieDeclaration",
    "cdElement",
    "destroyConsentBanner",
    "destroyCookieDeclaration",
    "destroyCookieDeclarationRaw",
    "resetConsentBanner",
    "renew",
  ],
  setup() {
    const cdElement = ref<HTMLDivElement | null>(null);

    const {
      destroyConsentBanner,
      destroyCookieDeclaration,
      consentBanner,
      cookieDeclaration,
      resetConsentBanner,
      destroyCookieDeclaration: destroyCookieDeclarationRaw,
      renew,
    } = useCookiebot();

    function handleCookieDeclaration() {
      if (cdElement.value) {
        return cookieDeclaration(cdElement.value);
      }
    }

    function handleDestroyCookieDeclaration() {
      if (cdElement.value) {
        return destroyCookieDeclaration(cdElement.value);
      }
    }

    return {
      consentBanner,
      cookieDeclaration: handleCookieDeclaration,
      cdElement,
      destroyConsentBanner,
      destroyCookieDeclaration: handleDestroyCookieDeclaration,
      destroyCookieDeclarationRaw,
      resetConsentBanner,
      renew,
    };
  },
});

describe("Cookiebot - composable", () => {
  beforeEach(() => {
    const cbEl = document.getElementById("AppCookiebotConsentBanner");
    const cdEl = document.getElementById("AppCookiebotCookieDeclaration");
    const createdDeclarationScripts = document.querySelectorAll(
      "[data-cp-id='AppCookiebotCookieDeclaration']",
    );

    if (cbEl) {
      cbEl.remove();
    }

    if (cdEl) {
      cdEl.remove();
    }

    createdDeclarationScripts.forEach((element) => {
      element.remove();
    });

    window.Cookiebot = undefined;
  });

  test("Injects consent banner accordingly", async () => {
    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    await wrapper.vm.consentBanner();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const cbScriptTag = document.getElementById(
      "AppCookiebotConsentBanner",
    ) as HTMLScriptElement | null;

    const cbId = cbScriptTag?.getAttribute("data-cbid");

    expect(cbId).toContain(import.meta.env.VITE_COOKIEBOT_ID);
  });

  test("Injects cookiedeclaration accordingly", async () => {
    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    await wrapper.vm.cookieDeclaration();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const cdScriptTag = wrapper.find("[data-cp-id]");

    expect(cdScriptTag.attributes("src")).toContain(
      import.meta.env.VITE_COOKIEBOT_ID,
    );
    expect(cdScriptTag.attributes("data-cp-id")).toContain(
      "AppCookiebotCookieDeclaration",
    );
  });

  test("Destroys consent banner", async () => {
    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    await wrapper.vm.consentBanner();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(
      document.getElementById("AppCookiebotConsentBanner")?.id,
    ).toBeDefined();

    await wrapper.vm.destroyConsentBanner();

    expect(
      document.getElementById("AppCookiebotConsentBanner")?.id,
    ).toBeUndefined();
  });

  test("Destroys cookiedeclaration and empties context", async () => {
    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    await wrapper.vm.cookieDeclaration();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.find("[data-cp-id]").exists()).toBeTruthy();

    await wrapper.vm.destroyCookieDeclaration();

    expect(wrapper.find("[data-cp-id]").exists()).toBeFalsy();

    expect(wrapper.html()).toEqual("<div></div>");
  });

  test("Destroys cookiedeclaration when script exists by id", async () => {
    const wrapper = await mount(CookiebotComponent, {
      attachTo: document.body,
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    const script = document.createElement("script");
    script.id = "AppCookiebotCookieDeclaration";
    wrapper.element.appendChild(script);

    await wrapper.vm.destroyCookieDeclaration();

    expect(wrapper.find("#AppCookiebotCookieDeclaration").exists()).toBeFalsy();
    expect(wrapper.html()).toEqual("<div></div>");
  });

  test("Resets the consent banner", async () => {
    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    await wrapper.vm.consentBanner();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.vm.resetConsentBanner();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const cbScriptTag = document.getElementById(
      "AppCookiebotConsentBanner",
    ) as HTMLScriptElement | null;

    expect(cbScriptTag).not.toBeNull();
    expect(cbScriptTag?.getAttribute("data-cbid")).toBe(
      import.meta.env.VITE_COOKIEBOT_ID,
    );
  });

  test("Warns when cookiedeclaration is called without a cookiebot id", async () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [[cookieBot]],
      },
    });

    await wrapper.vm.cookieDeclaration();

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("No Cookiebot ID found"),
    );
  });

  test("Warns when cookiedeclaration is already present", async () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const wrapper = await mount(CookiebotComponent, {
      attachTo: document.body,
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    const script = document.createElement("script");
    script.setAttribute("data-cp-id", "AppCookiebotCookieDeclaration");
    wrapper.element.appendChild(script);

    await wrapper.vm.cookieDeclaration();

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("Consent page already initialized"),
    );
  });

  test("Adds culture to cookiedeclaration script when provided", async () => {
    const CookiebotCultureComponent = defineComponent({
      template: '<div ref="cdElement"></div>',
      setup() {
        const cdElement = ref<HTMLDivElement | null>(null);
        const { cookieDeclaration } = useCookiebot({
          culture: "en",
          cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
        });

        return {
          cdElement,
          cookieDeclaration: () =>
            cdElement.value && cookieDeclaration(cdElement.value),
        };
      },
    });

    const wrapper = await mount(CookiebotCultureComponent, {
      attachTo: document.body,
    });

    await wrapper.vm.cookieDeclaration();

    const cdScriptTag = wrapper.find("[data-cp-id]");
    expect(cdScriptTag.attributes("data-culture")).toBe("en");
  });

  test("Warns when destroy cookiedeclaration is called without an element", async () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [[cookieBot]],
      },
    });

    await wrapper.vm.destroyCookieDeclarationRaw(null);

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        "No HTML element or element ref is given. Aborting",
      ),
    );
  });

  test("Destroys cookiedeclaration when script exists by data-cp-id", async () => {
    const wrapper = await mount(CookiebotComponent, {
      attachTo: document.body,
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    const script = document.createElement("script");
    script.setAttribute("data-cp-id", "AppCookiebotCookieDeclaration");
    wrapper.element.appendChild(script);

    await wrapper.vm.destroyCookieDeclaration();

    expect(
      wrapper.find("[data-cp-id='AppCookiebotCookieDeclaration']").exists(),
    ).toBeFalsy();
    expect(wrapper.html()).toEqual("<div></div>");
  });

  test("Triggers an error when no cookiebot id is given", async () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    await mount(CookiebotComponent, {
      global: {
        plugins: [[cookieBot]],
      },
    });

    expect(spy).toHaveBeenCalled();
  });

  test("Triggers a notice when consent banner is already present", async () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    await wrapper.vm.consentBanner();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.vm.consentBanner();

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("Consent banner already initialized"),
    );
  });

  test("Triggers an error when Cookiebot cannot renew", async () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [[cookieBot]],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.vm.renew();

    expect(spy).toHaveBeenCalled();
  });

  test("Does not execute scripts double when processing", async () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const wrapper = await mount(CookiebotComponent, {
      global: {
        plugins: [
          [
            cookieBot,
            {
              cookiebotId: import.meta.env.VITE_COOKIEBOT_ID,
            },
          ],
        ],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.vm.consentBanner();
    await wrapper.vm.consentBanner();
    await wrapper.vm.consentBanner();

    await wrapper.vm.cookieDeclaration();
    await wrapper.vm.cookieDeclaration();
    await wrapper.vm.cookieDeclaration();

    expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
  });
});
