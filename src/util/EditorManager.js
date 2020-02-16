import JsonStore from './JsonStore';

var TEMP_FILE_PATH = __dirname + '/temp';

export default class EditorManager {

  static getCurrFilePath () {
    let currFilePath = JsonStore.getPropVal('current-path');
    return currFilePath && currFilePath.length > 3
      ? currFilePath
      : TEMP_FILE_PATH;
  }

  // load current file content or temp file
  static async loadFile () {
    let data = '';
    try {
      data = await window.fsPromises.readFile(this.getCurrFilePath(), { encoding: 'utf8' });
    } catch (error) {
      data = error.message;
    }
    return data;
  }

  static async writeToTemp (newValue) {
    await window.fsPromises.writeFile(TEMP_FILE_PATH, newValue, { flag: 'w+' });
  }

  static async runCode (currPath) {
    return new Promise((resolve, reject) => {
      window.execFile('node', [currPath], { encoding: 'utf8' }, (error, stdout, stderr) => {
        if (stderr || error) reject(stderr || error.message);
        else resolve(stdout);
      });
    })
  }
}