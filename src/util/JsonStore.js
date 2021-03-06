var STORE_PATH = window.path.join(window.dirName, 'config.json');

export default class JsonStore {

  constructor () {
    this.storeContent = window.fs.readFileSync(STORE_PATH, 'utf8');
    this.store = JSON.parse(this.storeContent);
  }

  static get () {
    this.storeContent = window.fs.readFileSync(STORE_PATH, 'utf8');
    try {
      this.store = JSON.parse(this.storeContent);
      return this.store;
    } catch (error) {
      return {
        "usercode": "console.log('ok')",
        "language": "javascript",
        "filename": null,
        "fileExtension": null,
        "currfilepath": (window.dirName + '/temp'),
        "fontsize": "16",
        "theme": "monokai",
        "issaved": false,
        "wrapEnabled": false,
        "showPrintMargin": false,
        "autosave": false
      };
    }
  }

  static getPropVal (prop) {
    this.store = this.get();
    return this.store[prop];
  }

  static async pushOrUpdate (field, value) {
    try {
      this.store = this.get() || {};
      this.store[field] = value;
      await window.fsPromises.writeFile(STORE_PATH, JSON.stringify(this.store), { encoding: 'utf8' });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateConfigFile (configs) {
    this.store = this.get();

    Object.keys(configs).forEach(keys => {
      this.store[keys] = configs[keys];
    });

    await window.fsPromises.writeFile(STORE_PATH, JSON.stringify(this.store), { encoding: 'utf8' });
  }
}