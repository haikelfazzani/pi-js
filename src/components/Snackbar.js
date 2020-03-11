import React from 'react';

export default function Snackbar ({ msg, show, setShow, position = 'snack-center ' }) {
  return <div className={"snackbar " + position + (show ? "show" : "")}>
    <div className="snackbar-content">
    <span>{msg}</span>
    <span className="sn-btn-close" onClick={() => { setShow(false) }}>&times;</span>
    </div>
  </div>;
}