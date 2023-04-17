// Vendor
import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true,
		coverage: {
			branches: 75,
			enabled: true,
			functions: 80,
			lines: 80,
			reporter: ['text', 'text-summary', 'cobertura'],
			statements: 80,
		},
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
		},
	},
});
