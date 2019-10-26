const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const commonPaths = require('./common-paths');

const config = {
  mode: 'production',
  // entry: {
  //   app: ['babel-polyfill', `${commonPaths.appEntry}/index.js`],
  // },
  output: {
    filename: 'static/[name].[hash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                camelCase: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')],
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/styles.[hash].css',
      allChunks: true,
    }),
    new CnameWebpackPlugin({
      domain: 'mullaeinstant.com',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          },
          keep_classnames: undefined,
          keep_fnames: false,
          warnings: false,
        }
      })
    ]
  }
};
module.exports = config;
