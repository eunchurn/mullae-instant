import ExtractTextPlugin from "extract-text-webpack-plugin";
import CnameWebpackPlugin from "cname-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config = {
  mode: "production",
  output: {
    filename: "static/[name].[hash].js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                camelCase: true,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                // plugins: [require('autoprefixer')],
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles/styles.[hash].css",
      allChunks: true,
    }),
    new CnameWebpackPlugin({
      domain: "mullaeinstant.com",
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
          keep_classnames: undefined,
          keep_fnames: false,
          warnings: false,
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
};
module.exports = config;
