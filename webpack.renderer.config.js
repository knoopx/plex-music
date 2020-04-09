const path = require("path")
const webpack = require("webpack")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const { productName, dependencies } = require("./package.json")

const { version: electronVersion } = require(path.resolve(
  __dirname,
  "node_modules/electron/package.json",
))

const isDevelopment = process.env.WEBPACK_DEV_SERVER === "true"

module.exports = {
  target: "electron-renderer",
  devtool: "eval-source-map",
  mode: isDevelopment ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist/electron"),
  },
  entry: {
    renderer: ["./src/renderer/index.css", "./src/renderer/index.jsx"],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src/renderer"),
    ],
    extensions: [".mjs", ".js", ".jsx"],
  },
  plugins: [
    new webpack.ExternalsPlugin("commonjs", Object.keys(dependencies)),
    new HtmlWebpackPlugin({
      title: productName,
      template: "src/renderer/index.ejs",
    }),
    new ExtractCssChunks(),
    isDevelopment &&
      new ReactRefreshWebpackPlugin({ disableRefreshCheck: true }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "src/renderer")],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  targets: `electron ${electronVersion}`,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-proposal-export-default-from",
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              isDevelopment && "react-refresh/babel",
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "src/renderer")],
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hmr: isDevelopment,
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: { modules: true },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("postcss-smart-import"),
                require("precss"),
                require("autoprefixer"),
              ],
            },
          },
        ],
      },
    ],
  },
}
