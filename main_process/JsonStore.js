var fs = require('fs');
var STORE_PATH = __dirname + '/store.json';

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
    fs.writeFile(STORE_PATH, JSON.stringify(this.store), (err) => { });
    return this.get();
  }
}