const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const alias = require('./webpack.module.alias');
const commonPaths = require('./common-paths');

const config = {
  entry: {
    vendor: ['three'],
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
      {
        test: /\.(wav|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new CopyWebpackPlugin([{ from: 'public/assets', to: 'assets' }]),
    new ManifestPlugin(),
  ],
  resolve: {
    alias,
  },
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom'
  //   }
  // }
};
module.exports = config;
