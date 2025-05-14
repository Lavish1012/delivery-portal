import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ShopkeeperAnalytics = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/shopkeeper/analytics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error.message);
      }
    };

    fetchAnalytics();
  }, []);

  if (!salesData) return <p>Loading analytics...</p>;

  const data = {
    labels: salesData.dates,
    datasets: [
      {
        label: 'Sales',
        data: salesData.sales,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Shopkeeper Analytics</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
        <Line data={data} />
      </div>
    </div>
  );
};

export default ShopkeeperAnalytics;