const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { productName, dependencies } = require('./package.json')

module.exports = {
  target: 'electron-renderer',
  devtool: 'cheap-module-source-map',
  entry: ['./src/index.css', './src'],

  plugins: [
    new HtmlWebpackPlugin({ title: productName, template: 'src/index.ejs' }),
    new ExtractTextPlugin('renderer.css'),
    new webpack.ExternalsPlugin('commonjs', Object.keys(dependencies)),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),

  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
    libraryTarget: 'commonjs2',
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
              options: {
                plugins: [require('postcss-smart-import'), require('precss'), require('autoprefixer')] },
            },
          ],
        }),
      }, {
        test: /\.jsx?$/,
        use: 'babel-loader',
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
