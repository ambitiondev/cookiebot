// Vendor
import util from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec as execProcess } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const exec = util.promisify(execProcess);

async function isPortInUse(port) {
	try {
		const { stdout } = await exec(`lsof -i :${port}`);
		return stdout.length > 0;
	} catch (error) {
		return false;
	}
}

async function nextAvailablePort(startPort, maxPort) {
	let port = startPort;

	while (port <= maxPort) {
		if (!(await isPortInUse(port))) {
			return port;
		}
		port++;
	}

	return null; // No available port found in the range
}

function parseArgs() {
	const args = process.argv.slice(2);

	return args.reduce((acc, current) => {
		const [key, value] = current.split('=');

		return {
			...acc,
			[key.replace('--', '')]: value,
		};
	}, {});
}

export { __dirname, __filename, isPortInUse, nextAvailablePort, parseArgs };
