import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from './Editor';

export default function CodeResult () {

  const result = useSelector(state => state.EditorReducer.result);
  const dispatch = useDispatch();

  useEffect(() => {
    window.ipcRenderer.on('run-code', async (channel, currPath) => {
      window.execFile('node', [currPath], { encoding: 'utf8' }, (error, stdout, stderr) => {
        dispatch({ type: 'RUN_CODE', payload: stdout ? stdout : stderr });
      });
    });
  }, []);

  const onEditor = (newVal) => {

  }

  return <Editor value={result} onChange={onEditor} aceId="ace-editor-result" readOnly={true} />;
}