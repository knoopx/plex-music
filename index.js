const path = require('path')
const defaultMenu = require('electron-default-menu')
const { app, shell, BrowserWindow, Menu } = require('electron')

let mainWindow

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  const config = require(path.resolve('./webpack.config.js'))

  config.output.publicPath = 'http://localhost:8080/'
  config.entry.unshift(
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
  )
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())

  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, { hot: true, inline: true })
  server.listen(8080)
}

app.on('ready', () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(defaultMenu(app, shell)))

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 930,
    minHeight: 400,
    titleBarStyle: 'hidden-inset',
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8080/?react_perf')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
  }

  if (process.platform === 'darwin') {
    let forceQuit = false
    app.on('before-quit', () => {
      forceQuit = true
    })

    app.on('activate', () => {
      if (!mainWindow.isVisible()) {
        mainWindow.show()
      }
    })

    mainWindow.on('close', (event) => {
      if (!forceQuit) {
        mainWindow.hide()
        event.preventDefault()
      }
    })
  }
})
