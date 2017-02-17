'use strict';

const webpack = require('webpack');

module.exports = {
  entry: [
    './src/uploadcare.tab-effects.js'
  ],
  output: {
    path: './dist',
    library: process.env.npm_package_config_library,
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
      { test: /\.html$/, loader: 'ejs-loader' },
      { test: /\.pcss$/, loader: 'style!css!postcss-loader' },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "underscore"
    })
  ]
};
