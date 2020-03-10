import React, { useState, useEffect } from 'react';
import '../styles/ResultPane.scss';
import Editor from '../components/Editor';
import ExecCode from '../util/ExecCode';

export default function ResultPane () {

  const [codeOutput, setCodeOutput] = useState();

  useEffect(() => {
    window.ipcRenderer.on('run-code', async (channel, data) => {      
      let result = await ExecCode();
      setCodeOutput(result);
    });
  }, []);

  return <Editor value={codeOutput} id="result-pane" showLineNumbers={false} />;
}