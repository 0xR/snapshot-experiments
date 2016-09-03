/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import validate from 'webpack-validator';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import stylelint from 'stylelint';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import merge from 'webpack-merge';

const target = process.env.npm_lifecycle_event;

const cssLoaderConfig = [
  'css?modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]',
].join('&');

const cssLoaders = [cssLoaderConfig, 'postcss'];

let result = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[hash:8].[ext]' },
    ],
  },
  postcss: () => [
    stylelint,
    autoprefixer({ browsers: ['> 0.5% in NL'] }),
    precss,
  ],
};

const production = process.env.NODE_ENV === 'production';

if (production && target !== 'reactcards') {
  result = merge(result, {
    entry: [
      './src/index.jsx',
    ],
    module: {
      loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract(cssLoaders) },
      ],
    },
    plugins: [
      new ExtractTextPlugin('style.[contenthash:8].css', { allChunks: true }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
        output: {
          comments: false, // Also removes licences
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ],
  });
} else {
  result = merge(result, {
    module: {
      loaders: [
      { test: /\.css$/, loaders: cssLoaders },
      ],
    },
  });

  if (target === 'test') {
    result = merge(result, {
      entry: [],
    });
  } else {
    result = merge.smart(result, {
      entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx',
      ],
      module: {
        loaders: [
          { test: /\.css$/, loaders: ['style'] },
        ],
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
    });
    if (target === 'start') {
      result = merge.smart(result, {
        plugins: [
          ...result.plugins,
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            inject: 'body',
          }),
        ],
      });
    }
  }
}

export default validate(result);
