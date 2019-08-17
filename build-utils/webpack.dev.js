const commonPaths = require('./common-paths');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const config = {
  mode: 'development',
  // entry: {
  //   app: ['babel-polyfill', `${commonPaths.appEntry}/index.js`],
  // },
  output: {
    filename: '[name].[hash].js',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
    // new BrowserSyncPlugin({
    //   host: "localhost",
    //   port: 3100,
    //   proxy: "http://localhost:3000"
    // })
  ],
  // devServer: {
  //   host: "0.0.0.0",
  //   port: 3000,
  //   historyApiFallback: true,
  //   hot: true,
  //   open: false
  // }
};
module.exports = config;
