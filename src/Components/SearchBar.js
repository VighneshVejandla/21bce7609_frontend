import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import './SearchBar.css';

const SearchBar = ({ onSearch, initialValue = '', placeholder = 'Search', debounceTime = 300 }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Update local state if initialValue prop changes
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Debounce the onSearch callback
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, debounceTime),
    [onSearch, debounceTime]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search input"
      />
      <button type="submit" className="search-button" aria-label="Submit search">
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
