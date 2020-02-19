import React from 'react';

var electronFs = require('fs');

export default class FileTree {
  constructor (path, name = null, type = 0) {
    this.path = path;
    this.name = name;
    this.type = type;
    this.items = [];
  }

  static readDir (path) {
    var fileArray = [];

    electronFs.readdirSync(path).forEach(file => {
      var fileInfo = new FileTree(`${path}\\${file}`, file);

      var stats = electronFs.statSync(fileInfo.path);
      fileInfo.type = stats.isFile() ? 2 : 1;

      if (stats.isDirectory()) {
        fileInfo.items = FileTree.readDir(fileInfo.path);
      }
      fileArray.push(fileInfo);
    });

    return fileArray;
  }

  build () {
    this.items = FileTree.readDir(this.path);
    return this.items;
  }

  renderUnorderedList () {
    return FileTree.renderUnorderedListHtml(this.items);
  }

  static renderUnorderedListHtml (files) {

    return (<ul>{files.map((file, i) => {
      return (
        <li key={i} onClick={() => onFileClick(file)}>
          <span>{file.type === 1 ? '📁 ' + file.name : '📑 ' + file.name}</span>
          {file.items.length > 0 && FileTree.renderUnorderedListHtml(file.items)}
        </li>
      )
    })}
    </ul>)
  }
}