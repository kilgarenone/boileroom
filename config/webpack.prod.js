const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const zopfli = require("@gfx/zopfli");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const pkg = require("../package.json");
const settings = require("./webpack.settings");

// Configure Babel loader
const configureBabelLoader = (browserList = []) => {
  return {
    test: /\.(js|jsx)$/,
    exclude: settings.babelLoaderConfig.exclude,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        compact: true,
        presets: [
          [
            "@babel/preset-env",
            {
              exclude: ["transform-regenerator", "transform-async-to-generator"],
              debug: true,
              modules: false, // don't transpile into CommonJS. crucial for tree-shaking
              corejs: 3,
              useBuiltIns: "usage",
              targets: {
                browsers: browserList
              }
            }
          ]
        ],
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
  };
};
// Configure Compression webpack plugin with zopfli
const configureCompression = () => {
  return {
    test: /\.(js|css|html|svg|png)$/,
    threshold: 10240, // Only assets bigger than this size are processed. In bytes.
    minRatio: 0.8, // only process files when (Compressed Size / Original Size) < minRatio
    compressionOptions: {
      numiterations: 15,
      level: 9
    },
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback);
    }
  };
};

const configureImageLoader = () => ({
  test: /\.(png|jpe?g|webp)$/i,
  use: [
    {
      loader: "file-loader",
      options: {
        name: `${settings.imagesFolder}/[name].[hash].[ext]`
      }
    },
    {
      loader: "img-loader",
      options: {
        plugins: [
          require("imagemin-mozjpeg")({
            quality: 80,
            progressive: true,
            arithmetic: false
          }),
          require("imagemin-pngquant")({
            speed: 10,
            strip: true,
            quality: [0.3, 0.5]
          })
        ]
      }
    }
  ]
});

const configureSVGLoader = () => ({
  test: /\.svg$/,
  use: [
    // encode < 4KB  bytes svg to utf-8 data-uri for smaller size.
    // Fallback to file-loader for > 4KB  files.
    {
      loader: "svg-url-loader",
      options: {
        // Remove the quotes from the url
        noquotes: true,
        stripdeclarations: true,
        // Inline files smaller than 4 kB
        limit: 4 * 1024,
        name: `${settings.imagesFolder}/[name].[hash].[ext]`
      }
    },
    // optimizes/cleanup svg files output from sketch, photoshop etc.
    {
      loader: "img-loader",
      options: {
        plugins: [
          require("imagemin-svgo")({
            plugins: [{ removeTitle: true }, { convertPathData: false }]
          })
        ]
      }
    }
  ]
});

const configureCSSLoader = () => ({
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        importLoaders: 2,
        modules: { localIdentName: "[hash:base64:4]" }
      }
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        plugins: () => [
          postcssPresetEnv({
            stage: false, // disable all polyfill; only polyfill stuff in 'features'
            features: { "custom-properties": true },
            browsers: Object.values(pkg.browserslist.evergreen) // determines which polyfills are required based upon the browsers you are supporting
          }),
          cssnano() // css minifier. uses 'default' preset
        ]
      }
    },
    "sass-loader"
  ]
});

module.exports = {
  mode: "production", // this trigger webpack out-of-box prod optimizations
  output: {
    filename: `${settings.jsFolder}/[name].[chunkhash].js`,
    path: settings.outputPath,
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  optimization: {
    // split webpack runtime/manifest code into a separate chunk
    // so that hashes stay same when rebuilding without changes
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 0
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  module: {
    rules: [
      configureBabelLoader(Object.values(pkg.browserslist.evergreen)),
      configureCSSLoader(),
      configureImageLoader(),
      configureSVGLoader(),
      {
        // for third-party library's css that we wanna skip encoding to css-modules
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    // always deletes the dist folder first in each prod run
    // default to delete output.path
    new CleanWebpackPlugin(),
    // so that file hashes don't change unexpectedly
    new webpack.HashedModuleIdsPlugin(),
    // Extract css into separate .css file
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // for long-term caching
      chunkFilename: "[id].[chunkhash].css"
    }),
    // make webpack automatically creates index.html with proper hashed
    // style and scripts files for us
    new HtmlWebpackPlugin({
      template: settings.templatePath, // use our own template!,
      filename: "index.html",
      inject: "head",
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true
      }
    }),
    new CompressionPlugin(configureCompression()),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "report-modern.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: "runtime",
      preload: /\.css$/,
      defer: /\.js$/
    })
  ],
  stats: "minimal"
};
