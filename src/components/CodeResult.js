import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from './Editor';
import EditorManager from '../util/EditorManager';

export default function CodeResult () {

  const editorReducer = useSelector(state => state.EditorReducer);
  const { codeResult, config } = editorReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    window.ipcRenderer.on('run-code', (channel, currPath) => {
      EditorManager.runCode(currPath)
        .then(result => {
          dispatch({ type: 'RUN_CODE', payload: result });
        })
        .catch(e => {
          dispatch({ type: 'RUN_CODE', payload: e });
        });
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