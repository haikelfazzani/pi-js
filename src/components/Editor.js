import React, { useContext } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-golang";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-material";
import "ace-builds/src-noconflict/theme-vs_dark";

import "ace-builds/src-noconflict/ext-language_tools";
import GlobalContext from '../providers/GlobalContext';

export default function Editor ({ value, id = 'my-ace-editor', onChange, showLineNumbers = true }) {

  const { globalState } = useContext(GlobalContext);

  return <AceEditor
    mode={globalState.language === 'javascript' ? 'typescript' : globalState.language}
    theme={globalState.theme}
    onChange={onChange}
    value={value}
    name={id}
    fontSize={globalState.fontsize + "px"}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={true}
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: showLineNumbers,
      tabSize: 2,
      useWorker: false
    }}
  />;
}
