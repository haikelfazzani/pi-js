import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-dracula";

import "ace-builds/src-min-noconflict/ext-language_tools";

export default function Editor ({ value, onChange, aceId, readOnly }) {

  return <AceEditor
    mode="typescript"
    theme="dracula"
    onChange={onChange}
    value={value}
    fontSize={"16px"}
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
      readOnly: (readOnly || false),
      useWorker: false
    }}
  />;
}