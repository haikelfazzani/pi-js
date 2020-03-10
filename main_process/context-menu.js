const { Menu, MenuItem, dialog } = require("electron");
const ctxMenu = new Menu();
const FileManager = require('./file-manager');

const items = [
  {
    label: 'Run Code',
    accelerator: 'CmdOrCtrl+Enter',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.send('run-code', 'run-code');
    }
  },
  { type: 'separator' },
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
  {
    label: 'Format Code',
    accelerator: 'CmdOrCtrl+Shift+f',
    click: async (menuItem, browserWindow, event) => {
      browserWindow.webContents.send('format-code', 'format-code');
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

module.exports = ctxMenu;