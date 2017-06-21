'use strict';

const path              = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: './client.js',
  output: {
    path: path.resolve('./public'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            'css-loader',
            'sass-loader?includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib")]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
};

module.exports = config;
