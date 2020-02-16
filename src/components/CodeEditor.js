import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Editor from './Editor';

export default function CodeEditor () {

  const [state, setState] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    window.ipcRenderer.on('set-content-file', async (channel, data) => {
      setState(data);
      dispatch({ type: 'SET_CODE_VALUE', payload: data });
    });
  }, []);

  const onCodeChange = (newValue) => {
    setState(newValue);
    dispatch({ type: 'SET_CODE_VALUE', payload: newValue });
    window.nodeFs.writeFile(__dirname + 'temp', newValue, { flag: 'w+' }, (err) => {
      
    });
  }

  return <Editor value={state} onChange={onCodeChange} />;
}