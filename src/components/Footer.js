import React, { useState, useEffect } from 'react';
import '../styles/footer.scss';
import Snackbar from './Snackbar';
import Settings from '../containers/Settings';

export default function Footer () {

  const [showSettings, setShowSettings] = useState(false);
  const [isFileSaved, setIsFileSaved] = useState(false);

  useEffect(() => {
    window.ipcRenderer.on('save-file', async (channel, isSaved) => {
      setIsFileSaved(isSaved);
    });
  }, []);

  return (<footer>

    <button onClick={() => { setShowSettings(!showSettings) }}>Settings</button>

    <p className="m-0 py-15">{new Date().toDateString()}</p>

    <Settings showSettings={showSettings} setShowSettings={setShowSettings} />

    <Snackbar
      msg="File is saved" show={isFileSaved}
      setShow={setIsFileSaved}
    />
  </footer>);
}