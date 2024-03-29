import { ProvidePlugin, HotModuleReplacementPlugin } from 'webpack'
import { resolve as _resolve } from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config = {
  devtool: 'source-map',
  context: _resolve(__dirname, 'src'),
  entry: {
    app: './js/main.js',
  },
  output: {
    path: _resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/bundle-[fullhash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false, // this is the key
              name: 'img/[name].[ext]', // check the path
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: '../_layouts/home.html',
      template: 'html/home.html',
    }),
    new HtmlWebpackPlugin({
      filename: '../_layouts/blog.html',
      template: 'html/blog.html',
    }),
    new HtmlWebpackPlugin({
      filename: '../_layouts/post.html',
      template: 'html/post.html',
    }),
    new HtmlWebpackPlugin({
      filename: '../_includes/header.html',
      template: 'html/includes/header.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: '../_includes/footer.html',
      template: 'html/includes/footer.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: '../_includes/jumbotron.html',
      template: 'html/includes/jumbotron.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: '../_includes/paginator.html',
      template: 'html/includes/paginator.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: '../_includes/sidebar.html',
      template: 'html/includes/sidebar.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: '../_includes/head.html',
      template: 'html/includes/head.html',
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles-[fullhash:6].css',
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
    }),
    new HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [_resolve(__dirname, './src'), 'node_modules'],
  },
}

export default config
