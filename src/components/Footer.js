import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from './Select';

const languages = [
  { lang: 'javascript', ext: '.js' },
  { lang: 'typescript', ext: '.ts' }
];

const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px'];
const THEMES = ['ayu_mirage', 'ayu_dark', 'cobalt', 'dracula', 'material', 'monokai', 
'tomorrow_night', 'twilight'];

export default function Footer ({ children }) {

  const config = useSelector(state => state.EditorReducer.config);
  const dispatch = useDispatch();

  const onLangChange = (e) => {
    dispatch({ type: 'SET_MODE_LANG', payload: e.target.value });
  }

  const onFontChange = (e) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: e.target.value });
  }

  const onThemeChange = (e) => {
    dispatch({ type: 'SET_THEME', payload: e.target.value });
  }

  return <footer className="d-flex-sp">

    <div className="d-flex h-100">
    <p className="boder-right p-15 h-100">{config.mode}</p>
      <p className="boder-right p-15 h-100">{config.theme}</p>      
      <p className="boder-right p-15 h-100">{config.fontSize}</p>
      {children}
    </div>

    <div className="d-flex h-100">
      <Select items={languages.map(l => l.lang)} onChange={onLangChange} clx="p-15" />
      <Select items={fontSizes} onChange={onFontChange} clx="p-15" />
      <Select items={THEMES} onChange={onThemeChange} clx="p-15" />
    </div>

  </footer>;
}