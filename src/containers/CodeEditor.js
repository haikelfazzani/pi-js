import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import FileManager from '../util/FileManager';

import JsonStore from '../util/JsonStore';

export default function CodeEditor () {

  const [editorValue, setEditorValue] = useState(FileManager.loadFileSync());
  const [currLang, setCurrLang] = useState('typescript');

  useEffect(() => {
    window.ipcRenderer.on('open-file', async (channel, fileContent) => {      
      if (fileContent) {        
        setEditorValue(fileContent);        
      }
      let lang = await JsonStore.getPropVal('language');      
      if(lang) { setCurrLang(lang); }
    });

    window.ipcRenderer.on('format-code', async (channel, _) => {
      let fileContent = await FileManager.formatCode();
      setEditorValue(fileContent);
    });
  }, []);

  const onEditorChange = async (data) => {
    await FileManager.writeFile(data);
  }

  return <Editor onChange={onEditorChange} value={editorValue} lang={currLang} />;
}