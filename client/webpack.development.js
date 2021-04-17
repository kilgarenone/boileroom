const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const postcssNesting = require("postcss-nesting");

const settings = require("./webpack.settings");
const common = require("./webpack.common.js");

const devConfig = {
  output: {
    filename: "[name].js",
    path: settings.outputPath,
    chunkFilename: "[name].js",
    publicPath: "/",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "eval-source-map",
  devServer: {
    stats: "errors-only",
    clientLogLevel: "error",
    contentBase: settings.outputPath,
    historyApiFallback: true,
    port: 8008,
    hot: true, // enable hot module replacement
    overlay: true, // show compiler error as overlay on browser
    watchContentBase: true, // watch files served from contentbase
    watchOptions: { ignored: /node_modules/ },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: settings.templatePath, // use our own template!,
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.((c|sc)ss)$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [postcssNesting()],
              },
            },
          },
        ],
      },
    ],
  },
};

// Development module exports
module.exports = merge(common.modernConfig, devConfig);
