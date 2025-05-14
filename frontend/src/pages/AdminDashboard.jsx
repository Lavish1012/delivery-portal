import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsResponse = await axios.get('/api/admin/stats');
        const usersResponse = await axios.get('/api/admin/users');
        const ordersResponse = await axios.get('/api/orders');

        setStats(statsResponse.data);
        setUsers(usersResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error.message);
      }
    };

    fetchAdminData();
  }, []);

  const deactivateUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deactivating user:', error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Shopkeepers: {stats.totalShopkeepers}</p>
        <p>Total Orders: {stats.totalOrders}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        {/* User Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={() => deactivateUser(user._id)}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Manage Orders</h2>
        {/* Order Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Total Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-300 p-2">{order._id}</td>
                <td className="border border-gray-300 p-2">{order.customerName}</td>
                <td className="border border-gray-300 p-2">₹{order.totalAmount}</td>
                <td className="border border-gray-300 p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;