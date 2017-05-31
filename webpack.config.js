const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin({
    filename: '[name].bundle.css',
    allChunks: true
})

const config = {
    context: path.resolve(__dirname, 'assets'),
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: './js/bundle.js'
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
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract(['css-loader','sass-loader'])
            },
            {
              test: /\.(png|jpg)$/,
              use: [{
                loader: 'url-loader',
                options: { limit: 10000 } // Convert images < 10k to base64 strings
              }]
            }
        ]
    },
    plugins: [
        extractCSS
    ]
}

module.exports = config