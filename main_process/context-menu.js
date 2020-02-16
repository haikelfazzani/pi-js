const { Menu, MenuItem, dialog } = require("electron");
const ctxMenu = new Menu();

import JsonStore from './JsonStore';
const fs = require('fs');

const items = [
  {
    label: 'Run Code',
    accelerator: 'CmdOrCtrl+Enter',
    click: (menuItem, browserWindow, event) => {
      let currPath = JsonStore.getPropVal('current-path') || (__dirname + '/temp');
      browserWindow.webContents.send('run-code', currPath);
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
      fs.readFile(__dirname + 'temp', { encoding: 'utf8' }, (err, data) => {
        console.log(data);

        let getTempContent = data;
        fs.writeFile(JsonStore.getPropVal('current-path'), getTempContent, (err) => {
          browserWindow.webContents.send('save-file', 'save-file');
        })
      });
    }
  },
  {
    label: 'Save As..',
    accelerator: 'CmdOrCtrl+Shift+s',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.send('save-as-file', 'save-as-file');
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