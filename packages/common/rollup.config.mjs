const outputConfigs = {
    esm: {
        dir: 'dist/',
        entryFileNames: '[name].esm.js',
        chunkFileNames: '[name]-[hash].esm.js',
        format: 'es',
        sourcemap: true,
    },
    cjs: {
        dir: 'dist/',
        entryFileNames: '[name].cjs.js',
        chunkFileNames: '[name]-[hash].cjs.js',
        format: 'cjs',
        generatedCode: {
            constBindings: true,
        },
        sourcemap: true,
    },
};

const createConfig = (_, output) => {
    return {
        input: 'dist-transpiled/index.js',
        external: ['vue'],
        output,
    };
};

const configs = Object.keys(outputConfigs).map((format) =>
    createConfig(format, outputConfigs[format])
);

export default configs;
