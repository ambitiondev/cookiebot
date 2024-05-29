import { defineConfig, mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default mergeConfig(
    vitestConfig,
    defineConfig({
        test: {
            coverage: {
                include: ['src/**/*.ts'],
                exclude: ['**/node_modules/**', 'src/{plugin,index}.ts'],
                enabled: true,
                reporter: ['text', 'json-summary', 'json'],
            },
            silent: true,
        },
    })
);
