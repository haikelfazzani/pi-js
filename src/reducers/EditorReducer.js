const initState = {
  result: '...',
  codeValue: '',
  config: {
    fontSize: '16px',
    theme: 'monokai',
    mode: 'typescript'
  }
}

export default function EditorReducer (state = initState, action) {
  switch (action.type) {
    case 'RUN_CODE':
      return { ...state, result: action.payload };

    case 'SET_CODE_VALUE':
      return { ...state, codeValue: action.payload };

    default:
      return state;
  }
}