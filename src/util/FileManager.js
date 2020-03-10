const TEMP_FILE_PATH = window.path.join(window.dirName, 'temp');

export default class FileManager {

  /**
   * 
   * @param {string} filePath 
   * @returns string
   */
  static async readWriteFile (filePath) {

    this.fileErros = '';

    let data = null;
    try {
      data = await window.fsPromises.readFile(filePath, { encoding: 'utf8' });
      await window.fsPromises.writeFile(TEMP_FILE_PATH, data, { encoding: 'utf8' });
    } catch (error) {
      this.fileErros = error.message;
    }
    return data;
  }

  /**
   * default temp file
   * @param {string} filePath 
   * @returns {string}
   */
  static async loadFile (filePath = TEMP_FILE_PATH) {

    let data = null;
    try {
      data = await window.fsPromises.readFile(filePath, { encoding: 'utf8' });
    } catch (error) {
      this.fileErros = error.message;
    }
    return data;
  }

  /**
   * default temp file
   * @param {string} filePath 
   */
  static async writeFile (data, filePath = TEMP_FILE_PATH) {
    try {
      await window.fsPromises.writeFile(filePath, data, { encoding: 'utf8' });
    } catch (error) {
      this.fileErros = error.message;
    }
  }


  /**
   * default temp file
   * @param {string} filePath 
   * @returns {string}
   */
  static loadFileSync (filePath = TEMP_FILE_PATH) {
    let data = '';
    try {
      data = window.fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      this.fileErros = error.message;
    }
    return data;
  }
}