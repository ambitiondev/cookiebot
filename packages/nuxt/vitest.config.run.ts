import { defineConfig, mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default mergeConfig(
    vitestConfig,
    defineConfig({
        test: {
            coverage: {
                include: ['src/**/*.ts'],
                exclude: ['**/node_modules/**'],
                enabled: true,
                reporter: ['text', 'json-summary', 'json'],
                thresholds: {
                    statements: 30,
                    branches: 60,
                    functions: 50,
                    lines: 30,
                },
            },
            silent: true,
        },
    })
);
