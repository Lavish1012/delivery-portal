import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import ThemeToggle from '../components/ThemeToggle';

const CustomerPortal = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ availability: false });
  const [sort, setSort] = useState('price-low-high');

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('/api/items'); // Proxy will handle the backend URL
      setItems(response.data);
    };
    fetchItems();
  }, []);

  // Apply filters and sorting
  const applyFiltersAndSorting = () => {
    let filteredItems = [...items];

    // Apply availability filter
    if (filters.availability) {
      filteredItems = filteredItems.filter((item) => item.quantity > 0);
    }

    // Apply sorting
    if (sort === 'price-low-high') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high-low') {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    return filteredItems;
  };

  const filteredAndSortedItems = applyFiltersAndSorting();


  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer Portal</h1>
        <ThemeToggle />
      </div>
      <FilterBar
        onFilterChange={(filter, value) =>
          setFilters((prev) => ({ ...prev, [filter]: value }))
        }
        onSortChange={(value) => setSort(value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedItems.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded shadow bg-white dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>Price: ₹{item.price}</p>
            <p>Available: {item.quantity > 0 ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPortal;