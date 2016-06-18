import webpack from 'webpack';
import validate from 'webpack-validator';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const production = process.env.NODE_ENV === 'production';

const cssLoaders = production ?
  ExtractTextPlugin.extract('style-loader', 'css-loader') :
  'style!css';

const prodPlugins = production ? [
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
    output: {
      comments: false, // Also removes licences
    },
  }),
  new ExtractTextPlugin('style.[contenthash:8].css', { allChunks: true }),
] : [];


export default validate({
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: cssLoaders },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body',
      minify: production && {
        collapseWhitespace: true,
      },
    }),
    ...prodPlugins,
  ],
});
