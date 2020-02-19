import React, { useState } from 'react';
import FileTree from './FileTree';

let { ipcRenderer } = require('electron');

export default function DirTree () {
  const [fileTree, setfileTree] = React.useState();
  const [toggle, setToggle] = useState(false);

  React.useEffect(() => {
    ipcRenderer.on('open-folder', async (channel, currDirPath) => {
      setfileTree(null);

      if (currDirPath && currDirPath.length > 2) {
        let fileTree = new FileTree(currDirPath);
        let files = fileTree.build();
        setfileTree(files && files.length > 0 ? fileTree : null);
      }
    });
  }, []);

  return <div className="side-files d-flex-sp" style={{ marginRight: toggle ? 0 : '-237px' }}>
    <div className="toggle-sidefiles" onClick={() => { setToggle(!toggle) }}></div>
    <div className="file-tree">{fileTree && fileTree.renderUnorderedList()}</div>    
  </div>;
}
