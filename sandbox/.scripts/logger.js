// Vendor
import chalk from 'chalk';

function constructMessage(severity, message) {
	const color = {
		info: 'bgBlue',
		warn: 'bgYellow',
		error: 'bgRed',
		success: 'bgGreen',
	};

	return `- ${
		severity in color ? chalk[color[severity]](severity) : chalk.bgBlack(severity)
	} ${message}`;
}

function error(message, ...args) {
	console.error(constructMessage('error', message), ...args);
}

function info(message, ...args) {
	console.info(constructMessage('info', message), ...args);
}

function success(message, ...args) {
	console.log(constructMessage('success', message), ...args);
}

function warn(message, ...args) {
	console.warn(constructMessage('warn', message), ...args);
}

export default { error, info, success, warn };
