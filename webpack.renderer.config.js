const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

const { name } = require("./package.json")

const isDevelopment = process.env._.includes("electron-webpack-dev-server")

const plugins = [
  new HtmlWebpackPlugin({
    title: name,
    inject: false,
    template: require("html-webpack-template"),
    appMountId: "root",
    hash: true,
  }),

  new ExtractCssChunks({
    filename: isDevelopment ? "[name].css" : "[hash:8].css",
    chunkFilename: isDevelopment ? "[name].[id].css" : "[hash:8].[id].css",
  }),
]

module.exports = {
  target: "electron-renderer",
  entry: { renderer: ["./src/renderer/index.css", "./src/renderer/index.jsx"] },
  plugins,
  output: {
    publicPath: "/",
    filename: isDevelopment ? "[name].js" : "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src/renderer"),
      path.resolve(__dirname, "node_modules"),
    ],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: isDevelopment,
            },
          },
          "css-loader",
          "postcss-loader",
        ],

        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
}
