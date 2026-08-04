import { defineConfig, mergeConfig } from "vitest/config";
import vitestConfig from "./vitest.config";

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      coverage: {
        include: ["src/**/*.ts"],
        exclude: [
          "**/node_modules/**",
          "src/{constants,index}.ts",
          "src/types/**/*.ts",
        ],
        enabled: true,
        reporter: ["text", "json-summary", "json"],
        thresholds: {
          statements: 85,
          branches: 85,
          functions: 85,
          lines: 85,
        },
      },
      silent: true,
    },
  }),
);
