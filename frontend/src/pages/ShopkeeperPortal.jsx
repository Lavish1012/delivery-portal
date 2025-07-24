import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedElement from '../components/AnimatedElement';
import CardAnimation from '../components/CardAnimation';
import TextAnimation from '../components/TextAnimation';
import ParallaxBackground from '../components/ParallaxBackground';

const ShopkeeperPortal = () => {
  const [orders, setOrders] = useState([]);

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#F3ECE7] to-[#FAF6F2] dark:from-[#2B2B2E] dark:to-[#1A1A1C] overflow-hidden">
      <ParallaxBackground />
      <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
        <TextAnimation text="Shopkeeper Dashboard" className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2D2D2D] dark:text-[#F2F2F2]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <CardAnimation key={order._id}>
              <div className="border p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 flex flex-col gap-2 hover:scale-105 transition-transform duration-300">
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
            </CardAnimation>
          ))}
        </div>
      </div>
      <AnimatedElement>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#BDBDBD] dark:text-[#6A6A6A] text-lg opacity-80">Manage orders efficiently with real-time updates and smooth animations!</div>
      </AnimatedElement>
    </div>
  );
};

export default ShopkeeperPortal;