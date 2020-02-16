const { app, Menu, shell } = require("electron");
const isMac = process.platform === 'darwin';
import FileManager from './FileManager';

const Action = {
  label: 'Action',
  submenu: [
    {
      label: 'Run Code',
      accelerator: 'CmdOrCtrl+Enter',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('run-code', FileManager.getCurrPathFile());
      }
    }
  ]
};

const MenuFiles = {
  label: 'File',
  submenu: [
    {
      label: 'New File',
      accelerator: 'CmdOrCtrl+n',
      click: (menuItem, browserWindow, event) => {
        browserWindow.webContents.send('new-file', 'new-file');
      }
    },
    { type: 'separator' },
    {
      label: 'Open File',
      accelerator: 'CmdOrCtrl+l',
      click: async (menuItem, browserWindow, event) => {
        let data = await FileManager.openFile();
        browserWindow.webContents.send('set-content-file', data);
      }
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+s',
      click: async (menuItem, browserWindow, event) => {
        let isSaved = await FileManager.saveFile();
        browserWindow.webContents.send('save-file', isSaved);
      }
    },
    {
      label: 'Save As..',
      accelerator: 'CmdOrCtrl+Shift+s',
      click: async (menuItem, browserWindow, event) => {
        let isSaved = await FileManager.saveAsFile();
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
  MenuFiles,
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