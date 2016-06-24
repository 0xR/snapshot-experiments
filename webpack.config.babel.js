import webpack from 'webpack';
import validate from 'webpack-validator';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const production = process.env.NODE_ENV === 'production';

const cssLoaderConfig = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
const cssLoaders = production ?
  ExtractTextPlugin.extract('style', cssLoaderConfig) :
  `style!${cssLoaderConfig}`;

const prodPlugins = production ? [
  new ExtractTextPlugin('style.css', { allChunks: true }),
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
  postcss: () => [
    autoprefixer({ browsers: ['> 0.5% in NL'] }),
    precss,
  ],
});
