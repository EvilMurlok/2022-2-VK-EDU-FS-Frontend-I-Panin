'use strict';

const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
    context: SRC_PATH,
    entry: {
        index: './index.js',
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    devServer: {
        compress: true,
        port: 9000,
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                include: SRC_PATH,
                loader: 'style-loader!css-loader!sass-loader?sourceMap'
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // оставить то же самое имя файла и расширение
                            outputPath: 'static/images/' // куда положить этот файл в папке build
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                include: SRC_PATH,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/fonts/'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'static/icons/', to: 'static/icons/', ignore: ['.*'] },
            { from: 'static/images/', to: 'static/images/', ignore: ['.*'] },
        ]),
    ]
};
