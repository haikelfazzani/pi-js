import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';
import Snackbar from './Snackbar';
import JsonStore from '../util/JsonStore';
import js_beautify from 'js-beautify/js';
import '../styles/footer.scss';

const fontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const themes = ['monokai', 'material', 'dracula'];

export default function Footer () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isFileSaved, setIsFileSaved] = useState(false);
  const [lang, setLang] = useState('javascript');

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

    window.ipcRenderer.on('format-code', (channel, fileContent) => {
      if (editorValue && editorValue.length > 4) {
        if (lang !== 'python' || lang !== 'golang') {
          setEditorValue(js_beautify.js(editorValue, { indent_size: 2, space_in_empty_paren: true }));
        }
      }
    });
  }, []);

  useEffect(() => {
    setLang(JsonStore.getPropVal('language'));
  }, [isFileSaved]);

  return (<footer>

    <div className="boxes">
      <span>{lang}</span>
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