const path = require('path');
const bodyParser = require('body-parser');
const request = require('sync-request');

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry: [
    path.join(config.root, config.paths.src, 'javascripts/scripts.js'),
    path.join(config.root, config.paths.src, 'stylesheets/styles.scss'),
  ],
  output: {
    path: path.join(config.root, config.paths.dist),
    filename: '[name].[hash].js',
  },
  mode: ['production', 'development'].includes(config.env)
    ? config.env
    : 'development',
  devtool: config.env === 'production'
    ? 'hidden-source-map'
    : 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(config.root, config.paths.src),
    watchContentBase: true,
    hot: true,
    open: true,
    port: config.port,
    host: config.dev_host,
    setup: function(app) {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
          extended: true
      }));

      app.post(/^\/(URL1|URL2|URL3)\//, function(req, res) {
          var serviceCallResponse = request('POST', 'your app server url here' + req.originalUrl, {
              json:req.body
          });
          res.send(serviceCallResponse.getBody('utf8'));
      });
    },
    proxy: {
        '*/other URLs proxy/*': 'your app server url here'
    },
  },
  module: {
    rules: loaders,
  },
  plugins,
};
