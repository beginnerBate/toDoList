const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
            }
          }
        ]
      },
      { test: /\.js$/, exclude: /node_modules/, loader: ['babel-loader', 'eslint-loader'] }
    ]
  },
  resolve: {
    extensions: ['.js', 'css', 'scss', 'png', 'jpg', 'jpeg'],
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'common': path.resolve(__dirname, 'src/common')
    }
  }
}
