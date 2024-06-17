const outputConfigs = {
    esm: {
        dir: 'dist/',
        entryFileNames: '[name].esm.js',
        chunkFileNames: '[name]-[hash].esm.js',
        format: 'es',
        sourcemap: true,
    },
};

const createConfig = (_, output) => {
    return {
        input: 'dist-transpiled/index.js',
        external: ['vue', '@ambitiondev/cookiebot-common'],
        output,
    };
};

const configs = Object.keys(outputConfigs).map((format) =>
    createConfig(format, outputConfigs[format])
);

export default configs;
