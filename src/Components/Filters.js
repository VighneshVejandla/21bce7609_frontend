import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar.js";
import "./Filters.css";

const Filters = ({
  onViewChange,
  filterData,
  currentFilters,
  onFilterChange,
}) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...localFilters, [filterName]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (query) => {
    handleFilterChange("input_query", query);
  };

  const renderCheckboxList = (title, filterName, options) => (
    <div className="filter-section">
      <h3>{title}</h3>
      <SearchBar
        className="filter-search-bar"
        onSearch={(query) => console.log(`Searching ${title}: ${query}`)}
      />
      <div className="checkbox-list">
        {options?.map((option, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={localFilters[filterName].includes(option.key)}
              onChange={() => {
                const updatedFilter = localFilters[filterName].includes(
                  option.key
                )
                  ? localFilters[filterName].filter(
                    (item) => item !== option.key
                  )
                  : [...localFilters[filterName], option.key];
                handleFilterChange(filterName, updatedFilter);
              }}
            />
            {option.key} ({option.doc_count})
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="filters-panel">
      <div className="filter-section">
        <h3>Country</h3>
        <select
          value={localFilters.country || "US"}
          onChange={(e) => handleFilterChange("country", e.target.value)}
        >
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="CN">China</option>
          <option value="JP">Japan</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="GB">United Kingdom</option>
          <option value="BR">Brazil</option>
          <option value="RU">Russia</option>
          <option value="KR">South Korea</option>
          <option value="IT">Italy</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="ES">Spain</option>
          <option value="MX">Mexico</option>
          <option value="ID">Indonesia</option>
          <option value="NL">Netherlands</option>
          <option value="SA">Saudi Arabia</option>
          <option value="TR">Turkey</option>
          <option value="ZA">South Africa</option>
          <option value="AR">Argentina</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>Status</h3>
        <div className="status-options">
          {["All", "Registered", "Pending", "Abandoned", "Other"].map(
            (status) => (
              <button
                key={status}
                className={`status-button ${status.toLowerCase()} ${localFilters.status === status.toLowerCase() ? "active" : ""
                  }`}
                onClick={() =>
                  handleFilterChange(
                    "status",
                    status.toLowerCase() === "all" ? null : status.toLowerCase()
                  )
                }
              >
                <span className={`status-dot ${status.toLowerCase()}`}></span>
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {renderCheckboxList("Owners", "selectedOwners", filterData.ownersList)}
      {renderCheckboxList(
        "Categories",
        "selectedCategories",
        filterData.categoriesList
      )}
      {renderCheckboxList(
        "Attorney",
        "selectedAttorneys",
        filterData.attorneysList
      )}
      {renderCheckboxList(
        "Correspondents",
        "selectedCorrespondents",
        filterData.correspondentsList
      )}

      <div className="filter-section">
        <h3>Display</h3>
        <div className="display-options">
          <button
            className="display-button"
            onClick={() => onViewChange("list")}
          >
            List View
          </button>
          <button
            className="display-button"
            onClick={() => onViewChange("grid")}
          >
            Grid View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
