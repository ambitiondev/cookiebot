import MyModule from '../../../src/module';

export default defineNuxtConfig({
    modules: [MyModule],
    cookiebot: {
        cookieBotId: import.meta.env.COOKIEBOT_ID,
    },
});
