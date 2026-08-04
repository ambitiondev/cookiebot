// Types
interface ScriptAttribute {
  name: string;
  value: string;
}

export const isScriptAttribute = (obj: unknown): obj is ScriptAttribute => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "value" in obj &&
    typeof (obj as ScriptAttribute).name === "string" &&
    typeof (obj as ScriptAttribute).value === "string"
  );
};

export const createScriptWithOptions = async (
  options: ScriptAttribute[],
  src: string,
  async = true,
  scriptType = "text/javascript",
) => {
  const script: HTMLScriptElement = document.createElement("script");

  script.src = src;
  script.type = scriptType;
  script.async = async;

  await Promise.all(
    options.map((option: ScriptAttribute) => {
      return script.setAttribute(option.name, option.value);
    }),
  );

  return script;
};

export const removeScript = async (
  context: HTMLElement | HTMLBodyElement,
  script: HTMLElement | string,
  resetHTML = false,
) => {
  const _script =
    typeof script === "string" ? context.querySelector(`#${script}`) : script;

  if (_script !== null) {
    await context.removeChild(_script);
  }

  if (resetHTML === true) {
    context.innerHTML = "";
  }
};
