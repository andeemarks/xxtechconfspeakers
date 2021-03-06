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
    rules: [
      { 
        test: /\.md$/, 
        use: path.resolve(__dirname, './utils/markdown-loader.js'), 
      },
      { 
        test: /\.js$/, 
        use: 'babel-loader', exclude: /node_modules/ 
      },
      { 
        test: /\.svg$/, 
        use: "url-loader?limit=10000&mimetype=image/svg+xml" 
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[path][name]_[local]--[hash:base64:8]',
                },
            },
            {
                loader: 'postcss-loader',
                options: { plugins: () => [ nested(), autoprefixer(), values] },
            }
        ]
        })
      }
    ],

  },

  // postcss: [
  //   require('autoprefixer-core')
  // ],

  resolve: {
    modules: ['node_modules', 'components']
  },

  plugins: [
    WatchTimePlugin,
    new ExtractTextPlugin('style.css'),
    new StaticSiteGeneratorPlugin('index.js', data.routes, data)
  ]
};
