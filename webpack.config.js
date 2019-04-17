
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    externals: {},
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};


