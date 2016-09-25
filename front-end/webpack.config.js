var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

var config = {
    entry: './index',
    output: {
        path: __dirname + "/public",
        filename: '[].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|svg|ttf|eot|woff|woff2|mp3)$/,
                loader: "url-loader?limit=10000"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            title: 'Primatel',
            template: __dirname + '/index.html'
        }),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
            moment: 'moment',
            $: 'jquery',
            jQuery: 'jquery',
            "window.$": "jquery",
            "window.jQuery": "jquery",
            _: 'lodash'
        })
    ],
    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    }
};

if (NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = config;