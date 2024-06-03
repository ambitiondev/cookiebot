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
                thresholds: {
                    statements: 70,
                    branches: 70,
                    functions: 70,
                    lines: 70,
                },
            },
            silent: true,
        },
    })
);
