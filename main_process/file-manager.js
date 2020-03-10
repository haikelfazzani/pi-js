const path = require('path');
const fsPromises = require('fs').promises;
const TEMP_FILE_PATH = path.join(__dirname, 'temp');
const STORE_PATH = path.join(__dirname, 'config.json');

module.exports = class FileManager {

  static async openFile (filePath) {

    this.fileErros = '';

    let fileContent = null;
    try {
      let fileName = path.basename(filePath);
      let fileExt = path.extname(fileName);

      fileContent = await fsPromises.readFile(filePath, { encoding: 'utf8' });
      await fsPromises.writeFile(TEMP_FILE_PATH, fileContent, { encoding: 'utf8' });

      await this.updateConfigFile({
        'currfilepath': filePath,
        'filename': fileName,
        'fileExtension': fileExt,
        'language': this.getLanguage(fileExt)
      });

    } catch (error) {
      this.fileErros = error.message;
    }
    return fileContent;
  }

  static async updateConfigFile (configs) {
    let store = {};
    store = this.getStoreFile();

    Object.keys(configs).forEach(keys => {
      store[keys] = configs[keys];
    });

    await fsPromises.writeFile(STORE_PATH, JSON.stringify(store), { encoding: 'utf8' });
  }

  static getStoreFile () {
    return require(STORE_PATH);
  }

  static getLanguage (fileExtension) {
    return fileExtension === '.py'
      ? 'python' : fileExtension === '.js'
        ? 'javascript' : fileExtension === '.go'
          ? 'golang' : 'typescript';
  }

  static async getErrors () {
    return this.fileErros;
  }
}