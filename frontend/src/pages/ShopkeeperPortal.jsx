import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatusDropdown from '../components/StatusDropdown';

const ShopkeeperPortal = () => {
  const [orders, setOrders] = useState([]);
  const shopkeeperId = '12345'; // Replace with actual shopkeeper ID

  // Fetch shopkeeper orders from the backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/shopkeeper/${shopkeeperId}`);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, [shopkeeperId]);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, deliveryStatus: response.data.deliveryStatus } : order
        )
      );
    } catch (error) {
      alert('Failed to update status.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopkeeper Portal</h1>
      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-2 rounded shadow"
        >
          <p>
            <strong>Customer Address:</strong> {order.deliveryAddress}
          </p>
          <p>
            <strong>Status:</strong> {order.deliveryStatus}
          </p>
          <StatusDropdown
            currentStatus={order.deliveryStatus}
            onUpdate={(status) => updateOrderStatus(order._id, status)}
          />
        </div>
      ))}
    </div>
  );
};

export default ShopkeeperPortal;