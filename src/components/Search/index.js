import React, { useRef, useEffect } from 'react';

export default function Search({ value, onChange, onSubmit, children } ) {
    const inputEl = useRef(null);
    useEffect(() => {
        if (inputEl.current) {
            inputEl.current.focus();
          }
        }
        , [inputEl]
    );

    return (
      <form onSubmit={onSubmit} className="table-header">
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={inputEl}
          />

        <button type="submit">
          {children}
        </button>
      </form>
    )
}
