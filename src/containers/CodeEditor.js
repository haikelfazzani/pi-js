import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import FileManager from '../util/FileManager';

export default function CodeEditor () {

  const [editorValue, setEditorValue] = useState(FileManager.loadFileSync());

  useEffect(() => {
    window.ipcRenderer.on('open-file', async (channel, fileContent) => {
      if (fileContent) {
        setEditorValue(fileContent);
        setIsFileOpen(true);
      }
    });    
  }, []);

  const onEditorChange = async (data) => {
    await FileManager.writeFile(data);
  }

  return <Editor onChange={onEditorChange} value={editorValue} />;
}