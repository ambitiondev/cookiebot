import MyModule from '../../../src/module';

export default defineNuxtConfig({
    modules: [MyModule as any],
    cookiebot: {
        cookieBotId: import.meta.env.COOKIEBOT_ID,
    },
});
