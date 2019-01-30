import React from 'react';

const Search = ({value, onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit} className="table-header">
    <input
      type="text"
      value={value}
      onChange={onChange}
      />

    <button type="submit">
      {children}
    </button>
  </form>

export default Search;
