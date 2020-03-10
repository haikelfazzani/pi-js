window.ipcRenderer = require('electron').ipcRenderer;

window.fs = require('fs');
window.fsPromises = require('fs').promises;

window.path = require('path');
window.require = require;

window.childProcess = require('child_process');
window.nodeUtil = require('util');

window.dirName = __dirname;