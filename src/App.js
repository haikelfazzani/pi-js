import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import CodeResult from './components/CodeResult';
import CodeEditor from './components/CodeEditor';
import Footer from './components/Footer';
import Snackbar from './components/SnackBar';

export default function App () {

  const [fileIsSaved, setFileIsSaved] = useState(false);

  useEffect(() => {
    window.ipcRenderer.on('save-file', (channel, isSaved) => {
      setFileIsSaved(isSaved);
      if (isSaved) { setTimeout(() => { setFileIsSaved(false); }, 3000); }
    });
  }, []);

  return <>
    <div className="container">
      <Split sizes={[60, 40.5]}>
        <CodeEditor />
        <CodeResult />
      </Split>
    </div>
    <Footer />
    <Snackbar msg="File has been saved!" show={fileIsSaved} />
  </>
}