'use strict'

const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const config = Object.create(baseConfig)

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  }),
])

config.output.filename = process.env.npm_package_config_name + '.min.js'

module.exports = config
