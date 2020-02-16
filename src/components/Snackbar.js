import React from 'react';

export default function Snackbar ({ msg, show, position = 'snack-center ' }) {
  return <div className={"snackbar " + position + (show ? "show" : "")}>{msg}</div>;
}