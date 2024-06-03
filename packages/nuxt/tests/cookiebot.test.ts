import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, createPage, url } from '@nuxt/test-utils/e2e';

describe('Cookiebot', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/cookiebot', import.meta.url)),
        server: true,
        port: 3000,
    });

    it('Renders the pixel for cookiebot', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const page = await createPage('/', {
            baseURL: 'http://localhost',
        });

        await page.goto(url('/'), { waitUntil: 'domcontentloaded' });

        await page.waitForTimeout(1000);

        expect(await page.$('#CookiebotSessionPixel')).not.toBeNull();
    });
});
