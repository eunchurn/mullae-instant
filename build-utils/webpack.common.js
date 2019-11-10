import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import alias from "./webpack.module.alias";
import commonPaths from "./common-paths";

const config = {
  entry: {
    app: [`${commonPaths.appEntry}/index.js`],
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true,
          plugins: ["react-hot-loader/babel"],
        },
      },
      {
        test: /\.(wav|ico|mp3|jpg|JPG|jpeg|png|gif|woff|woff2|eot|ttf|mp4)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          quality: 80,
          name: "assets/[contenthash].[ext]",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      // {
      //   test: /\.(wav|ico|mp3|woff|woff2|eot)$/,
      //   loader: 'file-loader',
      // },
      {
        test: /\.(txt|md)$/i,
        use: "raw-loader",
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    new CopyWebpackPlugin([{ from: "public/assets", to: "assets" }]),
    new ManifestPlugin(),
  ],
  resolve: {
    alias,
  },
};
module.exports = config;
