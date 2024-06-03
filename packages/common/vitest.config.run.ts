import { defineConfig, mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config';

export default mergeConfig(
    vitestConfig,
    defineConfig({
        test: {
            coverage: {
                include: ['src/**/*.ts'],
                exclude: ['**/node_modules/**', 'src/{constants,index}.ts'],
                enabled: true,
                reporter: ['text', 'json-summary', 'json'],
                thresholds: {
                    statements: 100,
                    branches: 100,
                    functions: 100,
                    lines: 100,
                },
            },
            silent: true,
        },
    })
);
