declare module '#cookiebot-options' {
    import { type ModuleOptions } from '@ambitiondev/nuxt-cookiebot';

    const pluginOptions: ModuleOptions;
    export = pluginOptions;
}

declare module 'nuxt/schema' {
    interface PublicRuntimeConfig {
        cookiebot: {
            id: string;
        };
    }
}
