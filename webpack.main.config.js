const path = require("path")

const isDevelopment = process.env.WEBPACK_DEV_SERVER === "true"

module.exports = {
  mode: isDevelopment ? "development" : "production",
  target: "electron-main",
  output: {
    path: path.resolve(__dirname, "dist/electron"),
  },
  entry: {
    main: ["./src/main/index.js"],
  },
  node: false,
}
