const { app, Menu, dialog, shell } = require("electron");
const isMac = process.platform === 'darwin';
const FileManager = require('./file-manager');

const Action = {
  label: 'Action',
  submenu: [
    {
      label: 'Run Code',
      accelerator: 'CmdOrCtrl+Enter',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('run-code', 'run code')
      }
    },
    { type: 'separator' },
    {
      label: 'Format Code',
      accelerator: 'CmdOrCtrl+Shift+f',
      click: async (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('format-code', 'format-code');
      }
    }
  ]
};

const FileHandler = {
  label: 'File',
  submenu: [
    {
      label: 'Open File',
      accelerator: 'CmdOrCtrl+l',
      click: async (menuItem, browserWindow, event) => {
        try {
          let result = await dialog.showOpenDialog();
          if (!result.canceled) {
            let fileContent = await FileManager.openFile(result.filePaths[0]);
            browserWindow.webContents.send('open-file', fileContent);
          }
        } catch (error) {
          await dialog.showMessageBox({ type: 'error', message: error.message });
        }
      }
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+s',
      click: async (menuItem, browserWindow, event) => {
        try {
          let isSaved = await FileManager.saveFile();
          browserWindow.webContents.send('save-file', isSaved);
        } catch (error) {
          await dialog.showMessageBox({ type: 'error', message: error.message });
        }
      }
    },
    {
      label: 'Save As..',
      accelerator: 'CmdOrCtrl+Shift+s',
      click: async (menuItem, browserWindow, event) => {
        let result = await dialog.showSaveDialog();
        let isSaved = await FileManager.saveAsFile(result.filePath);
        browserWindow.webContents.send('save-as-file', isSaved);
      }
    },
    { type: 'separator' },
    isMac ? { role: 'close' } : { role: 'quit' }
  ]
};

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  FileHandler,
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
    ]
  },
  Action,
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Report issue',
        click: async () => {
          await shell.openExternal('https://github.com/haikelfazzani/picode-desktop-app')
        }
      },
      { type: 'separator' },
      {
        label: 'About',
        click: async (menuItem, browserWindow, event) => {
          await dialog.showMessageBox(browserWindow, {
            title: 'About',
            type: 'info',
            message: 'PiJs v1.0.0',
            detail: 'Copyright © 2020 - Haikel Fazzani'
          });
        }
      }
    ]
  }
];

module.exports = Menu.buildFromTemplate(template);