const path = require('path')
const webpack = require('webpack')
const { productName, dependencies } = require('./package.json')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  target: 'electron-renderer',
  devtool: 'source-map',
  entry: [
    'source-map-support/register',
    './src/index.css',
    './src',
  ],
  plugins: [
    new HappyPack({
      loaders: ['babel-loader'],
      threads: 4,
    }),
    new webpack.ExternalsPlugin('commonjs', Object.keys(dependencies)),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development', CHANNEL: 'web' }),
    new webpack.LoaderOptionsPlugin({ minimize: process.env.NODE_ENV === 'production' }),
    new ExtractTextPlugin('renderer.css'),
    new HtmlWebpackPlugin({
      title: productName,
      filename: 'index.html',
      template: 'src/index.ejs',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&sourceMaps',
            {
              loader: 'postcss-loader',
              options: { plugins: [require('postcss-smart-import'), require('precss'), require('autoprefixer')] },
            },
          ],
        }),
      }, {
        test: /\.jsx?$/,
        use: 'happypack/loader',
        include: [
          path.resolve('./src'),
        ],
      }, {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
}
