'use strict'

const webpack = require('webpack')
const moment = require('moment')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

const classPrefix = 'uploadcare-tab-effects--'
const banner = `
${process.env.npm_package_config_library} (${process.env.npm_package_version})
${process.env.npm_package_description}

Date: ${moment().format('YYYY-MM-DD HH:mm:ss ZZ')}
Rev: ${gitRevisionPlugin.version()}
`

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
        loader: `style!css-loader?modules&localIdentName=${classPrefix}[local]!postcss-loader`,
      },
      {
        test: /\.html$/,
        loader: 'babel!es6-template-string',
      },
      {
        test: /\.svg$/,
        loader: `svg-inline?classPrefix=${classPrefix}`,
      },
      {
        test: /\.js$/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
  postcss: () => [
    require('stylelint'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-reporter'),
  ],
}
