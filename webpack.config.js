const webpack = require('webpack')
const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const extractCSS = new ExtractTextPlugin('styles.css')

const config = {
    context: path.resolve(__dirname, 'assets'),
    entry: {
        app: './js/main.js'
    },
    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { modules: false } ]
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
    ]
}

module.exports = config