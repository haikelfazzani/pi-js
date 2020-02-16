const { Menu, MenuItem } = require("electron");
const ctxMenu = new Menu();

import FileManager from './FileManager';

const items = [
  {
    label: 'Run Code',
    accelerator: 'CmdOrCtrl+Enter',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.send('run-code', FileManager.getCurrPathFile());
    }
  },
  { type: 'separator' },
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
  { role: 'cut' },
  { role: 'copy' },
  { role: 'paste' },
  { type: 'separator' },
  {
    label: 'Inspecter..',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.openDevTools();
    }
  }
];

items.forEach(m => {
  ctxMenu.append(new MenuItem(m))
});

export default ctxMenu;