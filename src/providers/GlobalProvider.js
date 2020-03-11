import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import JsonStore from '../util/JsonStore';

let configStore = JsonStore.get();

/** init values global state */
let initState = {
  usercode: configStore.usercode,
  language: configStore.language,
  fileExtension: configStore['fileExtension'],
  currfilepath: configStore['currfilepath'],
  fontsize: configStore.fontsize,
  theme: configStore.theme,
  wrapEnabled: configStore['wrapEnabled'],
  showPrintMargin: configStore['showPrintMargin'],
  autosave: configStore['autosave']
};

export default function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);

  useEffect(() => {
    JsonStore.updateConfigFile(globalState);
  }, [globalState]);

  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>;
}