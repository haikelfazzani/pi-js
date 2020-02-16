import React, { memo } from 'react';

function Button ({ text, onClick, clx }) {
  return <button onClick={onClick} className={clx}>{text}</button>;
}

export default memo(Button);