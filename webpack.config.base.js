'use strict'

const webpack = require('webpack')

const classPrefix = 'uploadcare-tab-effects'

module.exports = {
  entry: [
    './src/uploadcare.tab-effects.js',
  ],
  output: {
    path: './dist',
    library: process.env.npm_package_config_library,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.pcss$/,
        loader: `style!css-loader?modules&localIdentName=${classPrefix}--[local]!postcss-loader`,
      },
      {
        test: /\.html$/,
        loader: 'babel!es6-template-string',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
      {
        test: /\.js$/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({_: 'underscore'}),
  ],
  postcss: () => [
    require('stylelint'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-reporter'),
  ],
}
