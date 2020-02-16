import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";

import "ace-builds/src-min-noconflict/ext-language_tools";

export default function Editor ({ value, onChange, aceId, config }) {

  return <AceEditor
    mode="typescript"
    theme={config.theme}
    onChange={onChange}
    value={value}
    fontSize={config.fontSize}
    name={aceId}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={true}
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      showLineNumbers: true,
      tabSize: 2,
      useWorker: false
    }}
  />;
}