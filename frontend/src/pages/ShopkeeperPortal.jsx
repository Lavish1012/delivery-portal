import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopkeeperPortal = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Shopkeeper Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded shadow bg-white dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold">Order #{order._id}</h2>
            <p>Customer: {order.customerId?.name || 'N/A'}</p>
            <p>Total Amount: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              className="mt-2 p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopkeeperPortal;