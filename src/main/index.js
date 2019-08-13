import * as path from "path"
import { format as formatUrl } from "url"

import { app, BrowserWindow } from "electron"

let window

const isDevelopment = process.env.NODE_ENV !== "production"

app.on("ready", () => {
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 930,
    minHeight: 400,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (isDevelopment) {
    window.loadURL(__ELECTRON_WEBPACK_DEV_SERVER_URL__)
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      }),
    )
  }

  if (process.platform === "darwin") {
    let forceQuit = false

    app.on("before-quit", () => {
      forceQuit = true
    })

    app.on("activate", () => {
      if (!window.isVisible()) {
        window.show()
      }
    })

    window.on("close", (event) => {
      if (!forceQuit) {
        window.hide()
        event.preventDefault()
      }
    })
  }
})
