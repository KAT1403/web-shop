import { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    onSearch("");
  }, [onSearch]);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <button className="search-clear-btn" onClick={clearSearch}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
