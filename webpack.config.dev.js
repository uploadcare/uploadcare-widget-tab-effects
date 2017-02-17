'use strict';

const baseConfig = require('./webpack.config.base');

let config = Object.create(baseConfig);

config.devtool = 'sourcemap';
config.output.filename = process.env.npm_package_config_name + '.js';

module.exports = config;
