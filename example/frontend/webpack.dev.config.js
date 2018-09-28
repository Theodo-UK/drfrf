const webpack = require('webpack')

const baseConfig = require('./webpack.config.js')

module.exports = {
  ...baseConfig,
  plugins: [
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  }
}
