/* eslint-disable no-console */
export function useLogger() {
    const color = {
        info: '\x1b[44m',
        warn: '\x1b[43m',
        error: '\x1b[41m',
        success: '\x1b[42m',
        transparent: '\x1b[0m',
    };

    function constructMessage(severity: keyof typeof color, message: string) {
        return `- ${color[severity]} Cookiebot plugin ${severity}: ${color.transparent} ${message}`;
    }

    function error(message: string, ...args: unknown[]) {
        console.error(constructMessage('error', message), ...args);
    }

    function info(message: string, ...args: unknown[]) {
        console.info(constructMessage('info', message), ...args);
    }

    function success(message: string, ...args: unknown[]) {
        console.log(constructMessage('success', message), ...args);
    }

    function warn(message: string, ...args: unknown[]) {
        console.warn(constructMessage('warn', message), ...args);
    }

    function deprecationNotice(oldMethod: string, newMethod: string) {
        warn(
            `"${oldMethod}" is deprecated and will be removed in future release. Please use "${newMethod}" instead.`
        );
    }

    return {
        deprecationNotice,
        info,
        error,
        success,
        warn,
    };
}
