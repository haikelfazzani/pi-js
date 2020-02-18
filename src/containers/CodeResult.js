import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '../components/Editor';
import EditorManager from '../util/EditorManager';
import Iframe from 'react-iframe'

import htmlToUrl from '../util/htmlToUrl';

export default function CodeResult () {

  const editorReducer = useSelector(state => state.EditorReducer);
  const { codeValue, codeResult, config } = editorReducer;
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

  if (config.mode === 'html') {
    return <Iframe url={htmlToUrl(codeValue)} id="ace-editor-result" />;
  }
  else {
    return <Editor
      value={codeResult}
      onChange={onEditor}
      aceId="ace-editor-result"
      highlightActiveLine={false}
      config={{ fontSize: config.fontSize, theme: config.theme, mode: config.mode }}
    />
  }
}