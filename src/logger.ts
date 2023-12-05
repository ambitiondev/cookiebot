/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
export function useLogger() {
	const color = {
		info: '\x1b[44m',
		warn: '\x1b[43m',
		error: '\x1b[41m',
		success: '\x1b[42m',
		transparent: '\x1b[0m',
	};

	function constructMessage(severity: keyof typeof color, message: string) {
		return `- ${
			severity in color ? color[severity] : color.transparent
		} Cookiebot plugin ${severity}: ${color.transparent} ${message}`;
	}

	function error(message: string, ...args: any[]) {
		console.error(constructMessage('error', message), ...args);
	}

	function info(message: string, ...args: any[]) {
		console.info(constructMessage('info', message), ...args);
	}

	function success(message: string, ...args: any[]) {
		console.log(constructMessage('success', message), ...args);
	}

	function warn(message: string, ...args: any[]) {
		console.warn(constructMessage('warn', message), ...args);
	}

	return {
		info,
		error,
		success,
		warn,
	};
}
