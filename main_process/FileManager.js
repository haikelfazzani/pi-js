import JsonStore from './JsonStore';
const { dialog } = require("electron");
const fsPromises = require('fs').promises;

const TEMP_FILE_PATH = __dirname + '/temp.js';

export default class FileManager {

  static getCurrPathFile () {
    let currFilePath = JsonStore.getPropVal('current-path');
    return currFilePath && currFilePath.length > 3
      ? currFilePath
      : TEMP_FILE_PATH;
  }

  static async openFile () {
    let result = await dialog.showOpenDialog();
    let data = '';
    if (!result.canceled) {
      result = result.filePaths[0];
      JsonStore.pushOrUpdate('current-path', result);
      data = await fsPromises.readFile(result, { encoding: 'utf8' });
    }
    else {
      data = await fsPromises.readFile(this.getCurrPathFile(), { encoding: 'utf8' });
    }
    return data;
  }

  static async saveFile () {
    let getTempContent = '';
    let isSaved = false;
    try {
      getTempContent = await fsPromises.readFile(TEMP_FILE_PATH, { encoding: 'utf8' });
      await fsPromises.writeFile(this.getCurrPathFile(), getTempContent);
      isSaved = true;
    } catch (error) {
      isSaved = false;
    }
    return isSaved;
  }

  static async saveAsFile () {
    let currFilePath = '', getTempContent = '', isSaved = false;
    try {
      let result = await dialog.showSaveDialog();
      if (!result.canceled) {
        currFilePath = result.filePath;

        getTempContent = await fsPromises.readFile(this.getCurrPathFile(), { encoding: 'utf8' });
        await fsPromises.writeFile(currFilePath, getTempContent, { flag: 'w' });
        JsonStore.pushOrUpdate("current-path", currFilePath);
        isSaved = true;
      }
    } catch (error) {
      isSaved = false;
    }
    return isSaved;
  }

  static async createNewFile () { }
}