import { format as formatUrl } from "url"
import path from "path"

import windowState from "electron-window-state"

const { app, shell, BrowserWindow, Menu } = require("electron")
const defaultMenu = require("electron-default-menu")

const isDevelopment = process.env.NODE_ENV !== "production"

let mainWindow

app.on("ready", () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(defaultMenu(app, shell)))

  const index = formatUrl({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true,
  })

  const mainWindowState = windowState({
    defaultWidth: 1200,
    defaultHeight: 800,
  })

  const { x, y, width, height } = mainWindowState

  mainWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    minWidth: 930,
    minHeight: 400,
    frame: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  })

  mainWindowState.manage(mainWindow)

  mainWindow.loadURL(
    isDevelopment ? __ELECTRON_WEBPACK_DEV_SERVER_URL__ : index,
  )

  mainWindow.webContents.on("will-navigate", (event, url) => {
    const { origin: target } = new URL(url)
    const { origin } = new URL(mainWindow.webContents.getURL())
    if (target !== origin) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })

  if (process.platform === "darwin") {
    let forceQuit = false
    app.on("before-quit", () => {
      forceQuit = true
    })

    app.on("activate", () => {
      if (!mainWindow.isVisible()) {
        mainWindow.show()
      }
    })

    mainWindow.on("close", (event) => {
      if (!forceQuit) {
        mainWindow.hide()
        event.preventDefault()
      }
    })
  }

  if (process.env.DEBUG || isDevelopment) {
    mainWindow.webContents.openDevTools()
  }
})