import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from './Editor';
import EditorManager from '../util/EditorManager';

export default function CodeResult () {

  const config = useSelector(state => state.EditorReducer.config);
  const codeResult = useSelector(state => state.EditorReducer.codeResult);
  const dispatch = useDispatch();

  useEffect(() => {
    window.ipcRenderer.on('run-code', async (channel, currPath) => {
      let data = await EditorManager.runCode(currPath);
      dispatch({ type: 'RUN_CODE', payload: data });
    });
  }, []);

  const onEditor = (newVal) => { }

  return <Editor
    value={codeResult}
    onChange={onEditor}
    aceId="ace-editor-result"
    config={{ fontSize: config.fontSize, theme: config.theme }}
  />;
}