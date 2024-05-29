// Vendor
import { describe, expect, it, vi } from 'vitest';

// Local
import { useLogger } from '../src/utils/logger';

describe('Utils - Logger', () => {
    it('Logs info message', () => {
        const { info } = useLogger();
        const spy = vi.spyOn(console, 'info');

        info('This is an info message');

        expect(spy).toHaveBeenCalledWith(
            '- \x1b[44m Cookiebot plugin info: \x1b[0m This is an info message'
        );
    });

    it('Logs warning message', () => {
        const { warn } = useLogger();
        const spy = vi.spyOn(console, 'warn');

        warn('This is a warning message');

        expect(spy).toHaveBeenCalledWith(
            '- \x1b[43m Cookiebot plugin warn: \x1b[0m This is a warning message'
        );
    });

    it('Logs error message', () => {
        const { error } = useLogger();
        const spy = vi.spyOn(console, 'error');

        error('This is an error message');

        expect(spy).toHaveBeenCalledWith(
            '- \x1b[41m Cookiebot plugin error: \x1b[0m This is an error message'
        );
    });

    it('Logs success message', () => {
        const { success } = useLogger();
        const spy = vi.spyOn(console, 'log');

        success('This is a success message');

        expect(spy).toHaveBeenCalledWith(
            '- \x1b[42m Cookiebot plugin success: \x1b[0m This is a success message'
        );
    });

    it('Logs deprecation notice', () => {
        const { deprecationNotice } = useLogger();
        const spy = vi.spyOn(console, 'warn');

        deprecationNotice('oldMethod', 'newMethod');

        expect(spy).toHaveBeenCalledWith(
            '- \x1b[43m Cookiebot plugin warn: \x1b[0m "oldMethod" is deprecated and will be removed in future release. Please use "newMethod" instead.'
        );
    });
});
