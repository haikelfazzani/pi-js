import React from 'react';

export default function InputCheck ({ onChange, checked, name, text }) {
  return <div className="d-flex mb-10">
    <input type="checkbox"
      onChange={onChange}
      checked={checked}
      className="mr-10"
      name={name}
    />
    <label htmlFor={name}>{text}</label>
  </div>;
}