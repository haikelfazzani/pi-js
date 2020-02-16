const { app, Menu, dialog, shell } = require("electron");
const isMac = process.platform === 'darwin';

import JsonStore from './JsonStore';
const fs = require('fs');

const Action = {
  label: 'Action',
  submenu: [
    {
      label: 'Run Code',
      accelerator: 'CmdOrCtrl+Enter',
      click: (menuItem, browserWindow, event) => {
        let currPath = JsonStore.getPropVal('current-path') || (__dirname + '/temp');
        browserWindow.webContents.send('run-code', currPath);
      }
    }
  ]
};

const FileManager = {
  label: 'File',
  submenu: [
    {
      label: 'New File',
      accelerator: 'CmdOrCtrl+n',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('new-file', 'new-file')
      }
    },
    { type: 'separator' },
    {
      label: 'Open File',
      accelerator: 'CmdOrCtrl+l',
      click: async (menuItem, browserWindow, event) => {
        let result = await dialog.showOpenDialog();
        result = result.filePaths[0];

        JsonStore.pushOrUpdate('current-path', result);

        fs.readFile(result, { encoding: 'utf8' }, (err, data) => {
          browserWindow.webContents.send('set-content-file', data);
        });
      }
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+s',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-file', 'save-file')
      }
    },
    {
      label: 'Save As..',
      accelerator: 'CmdOrCtrl+Shift+s',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('save-as-file', 'files')
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
  FileManager,
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
            message: 'Picode v1.0.0',
            detail: 'Copyright © 2090 - Haikel Fazzani'
          });
        }
      }
    ]
  }
];

export default Menu.buildFromTemplate(template);