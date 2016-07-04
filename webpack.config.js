const path = require("path");
// const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssColorFunction = require("postcss-color-function");

const includePath = [path.resolve(__dirname, "src")];

const tsloaders = [
    "babel-loader?" + JSON.stringify({
        plugins: ["transform-runtime"],
        presets: ["es2015"]
    }),
    "ts-loader"
];

const tsxloaders = [
    "babel-loader?" + JSON.stringify({
        plugins: ["transform-runtime"],
        presets: ["es2015", "react"]
    }),
    "ts-loader"
];

module.exports = {
    entry: "./src/demo",
    output: {
        path: "./dist",
        filename: "bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ["", ".js", ".ts", ".tsx"]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: tsloaders,
                include: includePath
            },
            {
                test: /\.tsx$/,
                loaders: tsxloaders,
                include: includePath
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader"),
                include: includePath
            }
        ],

        preLoaders: [
            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        // This plugin moves all the CSS into a separate stylesheet
        new ExtractTextPlugin("bundle.css")
        //, new webpack.optimize.UglifyJsPlugin()
    ],

    postcss: [
        autoprefixer({ browsers: ["last 2 versions"] }),
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
