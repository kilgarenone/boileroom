const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const settings = require("./webpack.settings");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: settings.outputPath,
    chunkFilename: "[name].js",
    publicPath: "/"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "cheap-module-eval-source-map",
  devServer: {
    clientLogLevel: "silent",
    contentBase: settings.outputPath,
    historyApiFallback: true,
    port: 8008,
    hot: true, // enable hot module replacement
    overlay: true, // show compiler error as overlay on browser
    watchContentBase: true, // watch files served from contentbase
    watchOptions: { ignored: /node_modules/ },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  performance: {
    hints: "warning",
    maxAssetSize: 470000,
    maxEntrypointSize: 8500000,
    assetFilter: assetFilename => assetFilename.endsWith(".css") || assetFilename.endsWith(".js")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // make webpack automatically creates index.html with proper hashed
    // style and scripts files for us
    new HtmlWebpackPlugin({
      template: settings.templatePath, // use our own template!,
      filename: "index.html"
    })
  ].concat(
    process.env.BROWSER_SYNC
      ? new BrowserSyncPlugin({
          host: "localhost",
          port: 3000,
          proxy: "http://localhost:8080/"
        })
      : []
  ),
  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(js|jsx)$/,
        exclude: settings.babelLoaderConfig.exclude,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h"
                }
              ],
              "@babel/proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import",
              "module:fast-async"
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: { localIdentName: "[name]__[local]" } // try add [path] too
            }
          },
          "sass-loader"
        ]
      },
      // IMAGE loader
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        use: "file-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
