const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', 'react', {
                            modules: false
                        }]
                    ]
                }
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[ext]', // check the path
                }
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'url-loader'
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: '../_layouts/home.html',
            template: 'html/home.html'
        }),
        new HtmlWebpackPlugin({
            filename: '../_layouts/blog.html',
            template: 'html/blog.html'
        }),
        new HtmlWebpackPlugin({
            filename: '../_layouts/post.html',
            template: 'html/post.html'
        }),
        new HtmlWebpackPlugin({
            filename: '../_includes/header.html',
            template: 'html/includes/header.html',
            inject: false
        }),

        new HtmlWebpackPlugin({
            filename: '../_includes/footer.html',
            template: 'html/includes/footer.html',
            inject: false
        }),
        
        new HtmlWebpackPlugin({
            filename: '../_includes/jumbotron.html',
            template: 'html/includes/jumbotron.html',
            inject: false
        }),
        
        new ExtractTextPlugin({
            filename: 'css/styles.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether'
        }),
    ],
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules']
    }
}

module.exports = config