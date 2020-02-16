const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
import menu from './menu';
import contextMenu from './context-menu';

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1366, height: 768,
    webPreferences: { nodeIntegration: true, preload: __dirname + '/preload.js' },
    icon: __dirname + '/icons/logo256.png'
  });

  mainWindow.loadFile(__dirname + '/index.html');
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('browser-window-created', function (event, win) {
  win.webContents.on('context-menu', (err, params) => {
    contextMenu.popup(win, params.x, params.y);
  });
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
