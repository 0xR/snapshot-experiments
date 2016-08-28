/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import validate from 'webpack-validator';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import stylelint from 'stylelint';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';

const production = process.env.NODE_ENV === 'production';

const cssLoaderConfig = [
  'css?modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]' +
  '!postcss',
];
const cssLoaders = production ?
  ExtractTextPlugin.extract('style', cssLoaderConfig) :
  `style!${cssLoaderConfig}`;

const prodPlugins = production ? [
  new ExtractTextPlugin('style.css', { allChunks: true }),
] : [];


export default validate({
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
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
    new webpack.HotModuleReplacementPlugin(),
    ...prodPlugins,
  ],
  postcss: () => [
    stylelint,
    autoprefixer({ browsers: ['> 0.5% in NL'] }),
    precss,
  ],
});
