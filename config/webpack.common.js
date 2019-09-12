const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const settings = require("./webpack.settings");

const { NODE_ENV } = process.env;

// eslint-disable-next-line import/order
const dotenv = require("dotenv").config({ path: `${settings.envPath}${NODE_ENV}` });

// Understanding the path.resolve traversing.
// Path.resolve build absolute path from right to left arguments,
// starting from the current directory where its run, in this case of 'webpack.common.js',
// it starts from ROOT/config/webpack
module.exports = {
  entry: {
    app: settings.entryPath
    // TODO: Add more entries whose files rarely change
  },
  module: {
    rules: [
      // FONT loader
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${settings.fontsFolder}/[name].[hash].[ext]` // output to /fonts folder under output.path
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // load variables from .env files based on given environment.
    // able to access the keys in the GLOBALS object above.
    // Note: 'process.env.NODE_ENV' is set in package.json scripts section eg. NODE_ENV="development"
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed
    }),
    new ProgressBarPlugin(),
    new ImageminWebpWebpackPlugin()
  ],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat"
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js", ".jsx"]
  }
};
