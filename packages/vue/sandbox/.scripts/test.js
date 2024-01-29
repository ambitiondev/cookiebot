// Vendor
import { resolve } from 'path';
import cypress from 'cypress';

// Scripts
import { startServer } from './server.js';
import { __dirname, nextAvailablePort, isPortInUse, parseArgs } from './common.js';
import logger from './logger.js';

async function start() {
	const { open = false, port = 3000, testingType = 'e2e' } = parseArgs();
	const configFile = resolve(__dirname, '../cypress.config.ts');

	let nextServer;
	let portOverride;

	logger.info(`Starting ${testingType} test suite`);

	if (testingType === 'e2e') {
		logger.info('e2e test suite selected. Creating Next.js server to run e2e tests against');
		if (await isPortInUse(port)) {
			portOverride = await nextAvailablePort(port + 1, port + 49);
			logger.warn(`Port ${port} is already in use. Using ${portOverride} instead...`);
		}

		nextServer = await startServer();
	}

	try {
		const result = await cypress[open ? 'open' : 'run']({
			config: {
				e2e: {
					baseUrl: `http://localhost:${portOverride || port}`,
				},
			},
			configFile,
			testingType,
		});

		if (result.totalFailed === 0) {
			logger.success('Test suite ran successfully');
		} else {
			logger.error('One ore more tests failed');
			process.exit(1);
		}
	} catch (error) {
		logger.error('Cypress error:', error.message);
		process.exit(1);
	} finally {
		if (testingType === 'e2e') {
			await nextServer.close();
			logger.info('Dev server closed');
		}
		process.exit(0);
	}
}

start();
