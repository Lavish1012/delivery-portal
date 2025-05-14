import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error.message);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [orderId]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  const statusMap = {
    Pending: 1,
    Processing: 2,
    Delivered: 3,
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <div className="border p-4 rounded shadow bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold">Order #{order._id}</h2>
        <p>Total Amount: ₹{order.totalAmount}</p>
        <p>Current Status: {order.status}</p>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className={`w-1/3 p-2 ${statusMap[order.status] >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <div className={`w-1/3 p-2 ${statusMap[order.status] >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <div className={`w-1/3 p-2 ${statusMap[order.status] === 3 ? 'bg-blue-500' : 'bg-gray-300'}`} />
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Pending</span>
            <span>Processing</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;