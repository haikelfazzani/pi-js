import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '../components/Editor';
import EditorManager from '../util/EditorManager';
import js_beautify from 'js-beautify';

export default function CodeEditor ({ formatCode }) {

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

  useEffect(() => {
    setState(js_beautify.js(state, { indent_size: 2, space_in_empty_paren: true }));
  }, [formatCode]);

  const onCodeChange = (newValue) => {
    setState(newValue);
    dispatch({ type: 'SET_CODE_VALUE', payload: newValue });
  }

  return <Editor
    value={state}
    onChange={onCodeChange}
    config={{ fontSize: config.fontSize, theme: config.theme, mode: config.mode }}
  />;
}