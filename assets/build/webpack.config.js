var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './assets/js/main.js'
    },
    output: {
        filename: './dist/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass'),
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/css/style.css', {
            allChunks: true
        })
    ]
}