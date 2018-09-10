const path = require('path')

const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

const { name } = require('./package.json')

const isDevelopment = process.env.NODE_ENV === 'development'

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      isDevelopment ? 'development' : 'production',
    ),
  }),
  new HtmlWebpackPlugin({
    title: name,
    filename: 'index.html',
    template: 'src/index.ejs',
    hash: true,
  }),
  new ExtractCssChunks({
    filename: '[name].[hash].css',
    chunkFilename: '[name].[id].[hash].css',
    hot: isDevelopment,
  }),
]

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : false,
  entry: ['@babel/polyfill', './src/index.css', './src/index.jsx'],
  plugins,
  output: {
    publicPath: '/',
    filename: isDevelopment ? '[name].js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules'),
        ],
        sideEffects: false,
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader?cacheDirectory=true',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
}
