var fs = require('fs');
const STORE_PATH = __dirname + '/store.json';

export default class JsonStore {

  constructor () {
    this.store = require(STORE_PATH);
  }

  static get () {
    return require(STORE_PATH);
  }

  static getPropVal (prop) {
    this.store = this.get();
    return this.store[prop];
  }

  static pushOrUpdate (field, value) {
    this.store = this.get() || {};
    this.store[field] = value;
    this.saveStore();
    return this.get();
  }

  static saveStore () {
    fs.writeFileSync(STORE_PATH, JSON.stringify(this.store));
  }
}