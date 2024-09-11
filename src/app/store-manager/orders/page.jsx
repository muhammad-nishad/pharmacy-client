"use client";
import { useState } from 'react';
import Link from 'next/link';

const page = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'John Doe', orderDate: '2024-09-10', totalAmount: '$100.00', status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', orderDate: '2024-09-09', totalAmount: '$250.00', status: 'Shipped' },
  ]);

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const updateOrder = (id, updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, ...updatedOrder } : order
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>

      <div className="mb-6">
        <Link href="/store-manager/orders/add">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Add Order
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-4 border-b-2 border-gray-300">Order ID</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Customer Name</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Order Date</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Total Amount</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Status</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-300">{order.id}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.customerName}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.orderDate}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.totalAmount}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.status}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => updateOrder(order.id, { status: 'Updated Status' })}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
