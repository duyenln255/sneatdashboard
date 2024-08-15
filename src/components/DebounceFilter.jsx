import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/DebounceFilter.css'

const DebounceFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onSearch(searchTerm);
    }, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search for ..."
      className="debounce-filter-input"
    />
  );
};

DebounceFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default DebounceFilter;
