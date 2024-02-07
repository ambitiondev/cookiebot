// Vendor
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { createServer } from 'vite';

// Utils
import logger from './logger.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const startServer = async () => {
	const configFile = resolve(__dirname, '../vite.config.ts');

	if (!existsSync(configFile)) {
		logger.error('Vite config not found. Stopping...');
		return exit(1);
	}

	const server = await createServer({
		configFile,
		root: resolve(__dirname, '../'),
		server: {
			port: 3000,
		},
	});

	await server.listen();

	server.printUrls();

	return server;
};
