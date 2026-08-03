import { fileURLToPath } from "node:url";

import CookiebotModule from "../../../../src/module";

export default defineNuxtConfig({
  alias: {
    "@ambitiondev/cookiebot-common": fileURLToPath(
      new URL("../../../../../common/src/index.ts", import.meta.url),
    ),
  },
  modules: [CookiebotModule],
  cookiebot: {
    cookiebotId: import.meta.env.COOKIEBOT_ID as string,
  },
});
