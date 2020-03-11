import React, { useContext, useEffect, useRef } from 'react';
import GlobalContext from '../providers/GlobalContext';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-material";
import "ace-builds/src-noconflict/theme-dracula";

import "ace-builds/src-noconflict/ext-language_tools";

export default function Editor ({ value, id = 'my-ace-editor', onChange, showLineNumbers = true }) {

  const { globalState } = useContext(GlobalContext);
  const aceEditor = useRef();

  useEffect(() => {
    let editor = aceEditor.current.editor;
    editor.commands.bindKeys({ "ctrl-l": null, "left": null });
  }, []);

  return <AceEditor
    ref={aceEditor}
    mode='typescript'
    theme={globalState.theme}
    onChange={onChange}
    value={value}
    name={id}
    fontSize={globalState.fontsize + "px"}
    showPrintMargin={globalState.showPrintMargin}
    showGutter={true}
    highlightActiveLine={true}
    wrapEnabled={globalState.wrapEnabled}
    editorProps={{ $blockScrolling: true }}
    commands={[]}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: showLineNumbers,
      tabSize: 2,
      useWorker: false
    }}
  />;
}