// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['**/src/**/*.ts'],
    ignores: ['node_modules', '.scripts', 'src/types/**/*'],
    rules: {
        'no-console': 'error',
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
});
