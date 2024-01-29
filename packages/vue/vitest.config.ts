// Vendor
import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true,
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@common': path.resolve(__dirname, '../common'),
		},
	},
});
