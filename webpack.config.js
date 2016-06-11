var path = require('path');

module.exports = {
    entry: "./src/app.tsx",
    output: {
        path: "./dist",
        filename: "bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ['', '.js', '.ts', '.tsx']
    },

    module: {
        loaders: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                loader: 'ts-loader',
                include: [path.resolve(__dirname, "src")],
                test: /\.tsx?$/
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    debug: true,
    watch: true
};