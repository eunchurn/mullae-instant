const commonPaths = require("./common-paths");
const alias = require("./webpack-module-alias");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const config = {
  entry: {
    vendor: ["three"]
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true,
          plugins: ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader",
        options: {
          limit: 8192
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico"
    }),
    new CopyWebpackPlugin([{ from: "public/assets", to: "assets" }]),
    new ManifestPlugin()
  ],
  resolve: {
    alias: alias
  }
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom'
  //   }
  // }
};
module.exports = config;
