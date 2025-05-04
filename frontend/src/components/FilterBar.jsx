import React from 'react';

const FilterBar = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800">
      {/* Price Sorting */}
      <select
        className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="price-low-high">Price: Low → High</option>
        <option value="price-high-low">Price: High → Low</option>
      </select>

      {/* Availability Filter */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="form-checkbox"
          onChange={(e) => onFilterChange('availability', e.target.checked)}
        />
        <span className="text-black dark:text-white">Only Available</span>
      </label>
    </div>
  );
};

export default FilterBar;