// @ts-check

import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
