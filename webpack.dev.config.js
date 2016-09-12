var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');


config.output = {
  filename: 'uploadcare.tab-effects.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
new webpack.HotModuleReplacementPlugin(),
new HtmlWebpackPlugin({
      template: 'samples/index.html',
      inject: 'body',
      hash: true
    })
]);

module.exports = config;
