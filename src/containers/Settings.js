import React, { useContext } from 'react';
import Select from '../components/Select';
import '../styles/Settings.scss';
import GlobalContext from '../providers/GlobalContext';
import InputCheck from '../components/InputCheck';

const fontSizes = ['10', '12', '14', '16', '18', '20', '22', '24'];
const themes = ['dracula', 'monokai', 'material'];

export default function Settings ({ showSettings, setShowSettings }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onFontSize = (e) => {
    setGlobalState({ ...globalState, fontsize: e.target.value });
  }

  const onThemes = (e) => {
    setGlobalState({ ...globalState, theme: e.target.value });
  }

  const onSettings = (e) => {
    setGlobalState({ ...globalState, [e.target.name]: e.target.checked });
  }

  return (<div className="settings" style={{ display: showSettings ? 'flex' : 'none' }}>
    <div className="settings-content ">

      <div className="settings-header mb-10">
        <h4 className="m-0 cl-blue-sky">settings</h4>
        <small onClick={() => { setShowSettings(!showSettings) }} className="btn-close-settings">
          &#10005;
        </small>
      </div>

      <InputCheck onChange={onSettings} checked={globalState.autosave} name="autosave" text="autosave" />
      <InputCheck onChange={onSettings} checked={globalState.showPrintMargin} name="showPrintMargin" text="Show Print Margin" />
      <InputCheck
        onChange={onSettings}
        checked={globalState.wrapEnabled}
        name="wrapEnabled"
        text="Wrap Enabled"
      />
      
      <div className="mb-10">
        <label htmlFor="fontsize">Font Size ({globalState.fontsize})</label>
        <Select onChange={onFontSize} data={fontSizes} clx="mt-5" />
      </div>

      <div>
        <label htmlFor="themes">themes ({globalState.theme})</label>
        <Select onChange={onThemes} data={themes} clx="mt-5" />
      </div>

    </div>
  </div>);
}