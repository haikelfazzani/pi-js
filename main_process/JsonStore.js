const path = require('path');
const STORE_PATH = path.join(__dirname, 'config.json');

module.exports = class JsonStore {

  static get () {
    return require(STORE_PATH);
  }

  static getPropVal (prop) {
    this.store = this.get();
    return this.store[prop];
  }

  static async pushOrUpdate (field, value) {
    try {
      this.store = this.get() || {};
      this.store[field] = value;
      await fsPromises.writeFile(STORE_PATH, JSON.stringify(this.store), { encoding: 'utf8' });
    } catch (error) {
      console.log(error);
    }
  }
}