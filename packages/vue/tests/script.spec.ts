// Vendor
import { describe, expect, it } from 'vitest';

// Local
import { useScriptHelper } from '../src/script';

describe('Cookiebot - script helper', () => {
    it('should create a script element with options', async () => {
        const scriptType = 'text/javascript';
        const options = [
            { name: 'data-attribute', value: 'value1' },
            { name: 'data-another-attribute', value: 'value2' },
        ];
        const src = 'https://example.com/script.js';
        const async = true;

        const script = await useScriptHelper(scriptType).createScriptWithOptions(
            options,
            src,
            async
        );

        expect(script.src).toBe(src);
        expect(script.type).toBe(scriptType);
        expect(script.async).toBe(async);

        options.forEach((option) => {
            expect(script.getAttribute(option.name)).toBe(option.value);
        });
    });

    it('should remove a script element from the context', async () => {
        const context = document.createElement('div');
        const script = document.createElement('script');
        script.id = 'my-script';
        context.appendChild(script);

        await useScriptHelper().removeScript(context, script);

        expect(context.contains(script)).toBe(false);
    });

    it('should remove a script element from the context and reset HTML', async () => {
        const context = document.createElement('div');
        const script = document.createElement('script');
        script.id = 'my-script';
        context.appendChild(script);

        await useScriptHelper().removeScript(context, script, true);

        expect(context.contains(script)).toBe(false);
        expect(context.innerHTML).toBe('');
    });

    it('should remove a script element when script is a string', async () => {
        const context = document.createElement('div');
        const scriptId = 'my-script';
        const script = document.createElement('script');
        script.id = scriptId;
        context.appendChild(script);

        await useScriptHelper().removeScript(context, scriptId);

        expect(context.contains(script)).toBe(false);
    });
});
