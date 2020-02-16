import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from './Editor';
import EditorManager from '../util/EditorManager';

export default function CodeEditor () {

  const config = useSelector(state => state.EditorReducer.config);
  const [state, setState] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let data = await EditorManager.loadFile();
      setState(data);
    })();
  }, []);

  useEffect(() => {
    window.ipcRenderer.on('set-content-file', async (channel, data) => {
      setState(data);
      dispatch({ type: 'SET_CODE_VALUE', payload: data });
    });
  }, []);

  const onCodeChange = async (newValue) => {
    setState(newValue);
    dispatch({ type: 'SET_CODE_VALUE', payload: newValue });
    await EditorManager.writeToTemp(newValue);
  }

  return <Editor
    value={state}
    onChange={onCodeChange}
    config={{ fontSize: config.fontSize, theme: config.theme }}
  />;
}