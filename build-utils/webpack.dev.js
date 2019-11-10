import webpack from "webpack";

const config = {
  mode: "development",
  output: {
    filename: "[name].[hash].js",
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
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
  ],
};
module.exports = config;
