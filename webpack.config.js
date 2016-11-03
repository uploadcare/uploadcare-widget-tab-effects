var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    './src/uploadcare.tab-effects.js'
  ],
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.ejs$/, loader: 'raw' },
       { test: /\.scss$/, loader: 'style!css-loader?modules&importLoaders=1!postcss-loader!sass' },
       { test: /\.css$/, loader: 'style!css!postcss-loader' },
       { test: /\.pcss$/, loader: 'style!css!postcss-loader' },
       { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
       { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
       { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
       { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
       { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
  ],

  postcss: function () {
      return [autoprefixer, precss];
  }
};
