const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const ctxMenu = require('./context-menu');
const path = require('path');

let mainWindow;
let isProd = false;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1366, height: 768,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  });

  isProd
    ? mainWindow.loadFile(__dirname + '/index.html')
    : mainWindow.loadURL('http://localhost:8080');

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('browser-window-created', function (event, win) {
  win.webContents.on('context-menu', (err, params) => {
    ctxMenu.popup(win, params.x, params.y);
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});