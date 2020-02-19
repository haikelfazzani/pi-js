import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import CodeResult from './containers/CodeResult';
import CodeEditor from './containers/CodeEditor';
import Footer from './components/Footer';
import Snackbar from './components/SnackBar';
import Button from './components/Button';
import DirTree from './components/tree/DirTree';

export default function App () {

  const [fileIsSaved, setFileIsSaved] = useState(false);
  const [formatCode, setFormatCode] = useState(false);

  useEffect(() => {
    window.ipcRenderer.on('save-file', (channel, isSaved) => {
      setFileIsSaved(isSaved);
      if (isSaved) { setTimeout(() => { setFileIsSaved(false); }, 3000); }
    });
  }, []);

  return <>
    <DirTree />
    <div className="container">
      <Split sizes={[60, 40.5]}>
        <CodeEditor formatCode={formatCode} />
        <CodeResult />
      </Split>
    </div>
    <Footer>
      <Button
        onClick={() => { setFormatCode(!formatCode) }}
        text="Format Code"
        clx="btn-format boder-right p-15 h-100"
      />
    </Footer>
    <Snackbar msg="File has been saved!" show={fileIsSaved} />
  </>
}