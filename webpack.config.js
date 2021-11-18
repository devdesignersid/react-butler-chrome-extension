/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ChromExtensionReloader = require('webpack-chrome-extension-reloader');

require('dotenv').config({ path: './.env' });

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
const isProduction = LAUNCH_COMMAND === 'prod';

const PATHS = {
  app: path.join(__dirname, 'app'),
  public: path.join(__dirname, 'public'),
  build: path.join(__dirname, 'build')
};

const entry = {
  popup: path.join(PATHS.app, 'popup.tsx'),
  background: path.join(PATHS.app, 'background.ts')
};

const baseLoaders = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'swc-loader',
      options: {
        jsc: {
          parser: {
            syntax: 'typescript'
          }
        }
      }
    }
  },

  {
    test: /\.svg$/,
    use: ['@svgr/webpack', 'file-loader']
  },

  {
    test: /\.(jpe?g|png|gif)$/i,
    type: 'asset/resource'
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }
    ]
  }
];

const terserPlugin = new TerserPlugin({
  parallel: true,
  terserOptions: {
    parse: {
      ecma: 8
    },
    compress: {
      comparisons: false,
      ecma: 5,
      inline: 2
    },
    output: {
      ascii_only: true,
      ecma: 5
    }
  }
});

const tsconfigPathsPlugin = new TsconfigPathsPlugin({
  baseUrl: 'app'
});

const resolvePlugins = [tsconfigPathsPlugin];

// Common webpack configuration for development & production
const baseConfigs = {
  entry,
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: PATHS.build,
    publicPath: '/'
  },
  module: {
    strictExportPresence: true,
    rules: [{ parser: { requireEnsure: false } }, ...baseLoaders]
  },
  resolve: {
    plugins: resolvePlugins,
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve('.'), 'node_modules']
  },
  optimization: {
    minimize: isProduction,
    minimizer: [terserPlugin],
    splitChunks: {
      chunks: 'async',
      name: false
    },
    runtimeChunk: true
  }
};

const webpackDefinePlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(process.env)
});

const defaultHtmlPlugConfig = {
  inject: true,
  title: process.env.HTML_DOCUMENT_TITLE,
  favicon: `${PATHS.app}/favicon.ico`
};

const additionalHtmlPlugConfig = isProduction && {
  minify: {
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
    removeComments: true,
    useShortDoctype: true,
    keepColsingSlash: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true,
    removeReduntantAttributes: true,
    removeStyleLinkTypeAttributes: true
  }
};

const popupHtmlWebpackPlugin = new HtmlWebpackPlugin({
  ...defaultHtmlPlugConfig,
  ...additionalHtmlPlugConfig,
  template: `${PATHS.app}/popup.html`,
  filename: 'popup.html',
  chunks: ['popup']
});

const backgroundHtmlWebpackPlugin = new HtmlWebpackPlugin({
  ...defaultHtmlPlugConfig,
  ...additionalHtmlPlugConfig,
  template: `${PATHS.app}/background.html`,
  filename: 'background.html',
  chunks: ['background']
});

const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: PATHS.public },
    {
      from: path.join(PATHS.app, 'manifest.json'),
      transform(content, absoluteFrom) {
        return Buffer.from(
          JSON.stringify({
            version: process.env.npm_package_version,
            ...JSON.parse(content.toString())
          })
        );
      }
    }
  ]
});

const chromeExtensionReloaderPlugin = new ChromExtensionReloader({
  reloadPage: true,
  entries: {
    background: 'background' // *REQUIRED
  }
});

const cleanWebpackPlugin = new CleanWebpackPlugin();

const esLintOptions = {
  context: 'app',
  extensions: ['ts', 'tsx'],
  exclude: ['node_modules', 'build']
};

const esLintPlugin = new ESLintPlugin(esLintOptions);

const commonPlugins = [
  esLintPlugin,
  webpackDefinePlugin,
  popupHtmlWebpackPlugin,
  backgroundHtmlWebpackPlugin,
  copyWebpackPlugin,
  cleanWebpackPlugin
];
const devPlugins = [chromeExtensionReloaderPlugin];
const prodPlugins = [];

// Webpack development configuration
const devConfigs = {
  devtool: 'eval-source-map',
  plugins: [...commonPlugins, ...devPlugins],
  devServer: {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    client: {
      logging: 'info',
      overlay: {
        warnings: isProduction,
        errors: true
      },
      progress: true,
      reconnect: true
    }
  }
};

// Webpack production configuration
const prodConfigs = {
  devtool: 'source-map',
  bail: isProduction,
  plugins: [...commonPlugins, ...prodPlugins]
};

const mainConfig = isProduction
  ? {
      ...baseConfigs,
      ...prodConfigs
    }
  : { ...baseConfigs, ...devConfigs };

module.exports = mainConfig;
