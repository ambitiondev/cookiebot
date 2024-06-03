// Types
import type { ScriptAttribute } from '@ambitiondev/cookiebot-common';

export function useScriptHelper(scriptType = 'text/javascript') {
    async function createScriptWithOptions(options: ScriptAttribute[], src: string, async = true) {
        const script: HTMLScriptElement = document.createElement('script');

        script.src = src;
        script.type = scriptType;
        script.async = async;

        await Promise.all(
            options.map((option: ScriptAttribute) => {
                return script.setAttribute(option.name, option.value);
            })
        );

        return script;
    }

    async function removeScript(
        context: HTMLElement | HTMLBodyElement,
        script: HTMLElement | string,
        resetHTML = false
    ) {
        const _script = typeof script === 'string' ? context.querySelector(`#${script}`) : script;

        if (_script !== null) {
            await context.removeChild(_script);
        }

        if (resetHTML === true) {
            context.innerHTML = '';
        }
    }

    return {
        createScriptWithOptions,
        removeScript,
    };
}
