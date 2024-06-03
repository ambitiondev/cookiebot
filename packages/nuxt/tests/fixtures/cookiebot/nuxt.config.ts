import type { NuxtModule } from '@nuxt/schema';
import MyModule from '../../../src/module';

export default defineNuxtConfig({
    modules: [MyModule as unknown as NuxtModule<Record<string, unknown>>],
    cookiebot: {
        cookieBotId: import.meta.env.VITE_COOKIEBOT_ID,
    },
});
