import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import FileManager from '../util/FileManager';

export default function CodeEditor () {

  const [editorValue, setEditorValue] = useState(FileManager.loadFileSync());

  useEffect(() => {
    window.ipcRenderer.on('open-file', async (channel, fileContent) => {
      if (fileContent && fileContent.length > 5) {
        setEditorValue(fileContent);
      }
    });
  }, []);

  const onEditorChange = async (data) => {
    await FileManager.writeFile(window.dirName + '/temp.js', data);
  }

  return <Editor onChange={onEditorChange} value={editorValue} />;
}