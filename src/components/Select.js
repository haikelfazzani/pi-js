import React from 'react';

export default function Select ({ items, onChange, clx }) {
  return <select onChange={onChange} className={clx}>
    {items.map(item => <option value={item} key={item}>{item}</option>)}
  </select>;
}