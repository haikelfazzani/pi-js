import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import FileManager from '../util/FileManager';
import js_beautify from 'js-beautify/js';

import JsonStore from '../util/JsonStore';

export default function CodeEditor () {

  const [editorValue, setEditorValue] = useState(FileManager.loadFileSync());
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [lang, setLang] = useState('javascript');

  useEffect(() => {
    window.ipcRenderer.on('open-file', async (channel, fileContent) => {
      if (fileContent) {
        setEditorValue(fileContent);
        setIsFileOpen(true);
      }
    });

    window.ipcRenderer.on('format-code', (channel, fileContent) => {
      if (editorValue && editorValue.length > 4) {
        if (lang !== 'python' || lang) {
          setEditorValue(js_beautify.js(editorValue, { indent_size: 2, space_in_empty_paren: true }));
        }
      }
    });
  }, []);

  useEffect(() => {
    setLang(JsonStore.getPropVal('language'));
  }, [isFileOpen]);

  const onEditorChange = async (data) => {
    await FileManager.writeFile(data);
  }

  return <Editor onChange={onEditorChange} value={editorValue} />;
}