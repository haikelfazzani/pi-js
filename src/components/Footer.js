import React, { useState, useEffect, useContext } from 'react';
import '../styles/footer.scss';
import GlobalContext from '../providers/GlobalContext';
import Snackbar from './Snackbar';

const fontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const themes = ['monokai', 'material', 'vs_dark'];

export default function Footer () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isFileSaved, setIsFileSaved] = useState(false);

  const onFontSize = (e) => {
    setGlobalState({ ...globalState, fontsize: e.target.value });
  }
  const onTheme = (e) => {
    setGlobalState({ ...globalState, theme: e.target.value });
  }

  useEffect(() => {
    window.ipcRenderer.on('save-file', async (channel, isSaved) => {
      setIsFileSaved(isSaved);
    });
  }, []);

  return (<footer>

    <div className="boxes">
      <span>{globalState.fontsize}</span>
      <span>{globalState.theme}</span>
    </div>

    <div>
      <select onChange={onFontSize}>
        {fontSizes.map(font => <option key={font} value={font}>{font}</option>)}
      </select>

      <select onChange={onTheme}>
        {themes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
      </select>
    </div>

    <Snackbar
      msg="File is saved" show={isFileSaved}
      setShow={setIsFileSaved}
    />
  </footer>);
}