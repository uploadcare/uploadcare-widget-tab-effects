var path    = require('path');
var config  = require('./webpack.config');

config.output = {
  filename: 'uploadcare.tab-effects.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist'),
	library: 'uploadcareTabEffects',
	libraryTarget: 'umd'
};

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
]);

module.exports = config;
