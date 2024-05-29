// Vendor
import { describe, expect, test } from 'vitest';

// Local
import { PluginOptions } from '../src';
import { consentBannerURL, cookieDeclarationURL } from '../src/utils/cookiebot';

describe('Utils - Cookiebot', () => {
    const cookieBotId = '12345';

    test('consentBannerURL generates the correct URL', () => {
        const options: PluginOptions = {
            cookieBotId,
            culture: 'en-US',
            blockingMode: 'auto',
        };
        const expectedURL =
            'https://consent.cookiebot.com/uc.js?cbid=12345&culture=en-US&blockingmode=auto';
        const generatedURL = consentBannerURL(options);
        expect(generatedURL).toBe(expectedURL);
    });

    test('consentBannerURL generates the correct URL without culture', () => {
        const options: PluginOptions = {
            cookieBotId,
            blockingMode: 'auto',
        };
        const expectedURL = 'https://consent.cookiebot.com/uc.js?cbid=12345&blockingmode=auto';
        const generatedURL = consentBannerURL(options);
        expect(generatedURL).toBe(expectedURL);
    });

    test('consentBannerURL generates the correct URL without blocking mode', () => {
        const options: PluginOptions = {
            cookieBotId,
            culture: 'en-US',
        };
        const expectedURL = 'https://consent.cookiebot.com/uc.js?cbid=12345&culture=en-US';
        const generatedURL = consentBannerURL(options);
        expect(generatedURL).toBe(expectedURL);
    });

    test('cookieDeclarationURL generates the correct URL', () => {
        const expectedURL = 'https://consent.cookiebot.com/12345/cd.js';
        const generatedURL = cookieDeclarationURL(cookieBotId);
        expect(generatedURL).toBe(expectedURL);
    });
});
