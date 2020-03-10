import React, { useContext } from 'react';
import '../styles/footer.scss';
import GlobalContext from '../providers/GlobalContext';

const fontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const themes = ['monokai', 'cobalt'];

export default function Footer () {

  const { globalState, setGlobalState } = useContext(GlobalContext)

  const onFontSize = (e) => {
    setGlobalState({ ...globalState, fontsize: e.target.value });
  }
  const onTheme = (e) => {
    setGlobalState({ ...globalState, theme: e.target.value });
  }

  return (<footer>
    <select onChange={onFontSize}>
      {fontSizes.map(font => <option key={font} value={font}>{font}</option>)}
    </select>

    <select onChange={onTheme}>
      {themes.map(theme => <option key={theme} value={theme}>{theme}</option>)}
    </select>

  </footer>);
}