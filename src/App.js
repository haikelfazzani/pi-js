import React from 'react';
import Split from 'react-split';
import CodeResult from './components/CodeResult';
import CodeEditor from './components/CodeEditor';
import Footer from './components/Footer';

export default function App () {

  return <>
    <div className="container">
      <Split sizes={[50, 50]}>
        <CodeEditor />
        <CodeResult />
      </Split>
    </div>
    <Footer />
  </>
}