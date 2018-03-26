var webpack = require('webpack');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
const API_URL = 'http://test.test';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: ['null-loader']
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ['null-loader']
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: ['raw-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'API_URL': JSON.stringify(API_URL)
      }
    }),
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      helpers.root('./src')
    )
  ]

}