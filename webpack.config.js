var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WatchTimePlugin = require('webpack-watch-time-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var data = require('./data')

module.exports = {
  entry: [
    './src/index.js',
    ],

  output: {
    filename: 'index.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.md$/, loader: path.resolve(__dirname, './utils/markdown-loader.js'), },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.json$/, exclude: [path.resolve(__dirname, './routes.json'), ], loader: 'json-loader', }
    ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },

  plugins: [
    WatchTimePlugin,
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new StaticSiteGeneratorPlugin('index.js', data.routes, data)
  ]
};
