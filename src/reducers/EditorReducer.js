import JsonStore from "../util/JsonStore";

const initState = {
  codeResult: '...',
  codeValue: '',
  config: {
    fontSize: JsonStore.getPropVal('font-size'),
    theme: JsonStore.getPropVal('theme'),
    mode: JsonStore.getPropVal('mode-lang')
  }
}

export default function EditorReducer (state = initState, action) {
  switch (action.type) {
    case 'RUN_CODE':
      return { ...state, codeResult: action.payload };

    case 'SET_CODE_VALUE':
      return { ...state, codeValue: action.payload };

    case 'SET_MODE_LANG':
      JsonStore.pushOrUpdate('mode-lang', action.payload);
      return { ...state, config: { ...state.config, mode: action.payload } };

    case 'SET_FONT_SIZE':
      JsonStore.pushOrUpdate('font-size', action.payload);
      return { ...state, config: { ...state.config, fontSize: action.payload } };

    case 'SET_THEME':
      JsonStore.pushOrUpdate('theme', action.payload);
      return { ...state, config: { ...state.config, theme: action.payload } };

    default:
      return state;
  }
}