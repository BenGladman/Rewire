var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssCustomProperties = require('postcss-custom-properties');
var postcssColorFunction = require('postcss-color-function');

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
                test: /\.tsx?$/,
                loader: 'babel-loader!ts-loader',
                include: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        // This plugin moves all the CSS into a separate stylesheet
        new ExtractTextPlugin('bundle.css')
    ],

    postcss: [
        autoprefixer({ browsers: ['last 2 versions'] }),
        postcssImport(),
        postcssCustomProperties(),
        postcssColorFunction()
    ],

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    debug: true,
    watch: false
};