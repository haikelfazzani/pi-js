import React from "react";
import Split from 'react-split'

import CodeEditor from "./containers/CodeEditor";
import ResultPane from "./containers/ResultPane";
import Footer from './components/Footer';

import './index.scss';

export default function App () {

  return (
    <>
      <Split
        sizes={[50, 50]}
        gutterSize={5}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
      >
        <CodeEditor />
        <ResultPane />
      </Split>

      <Footer />
    </>
  );
}