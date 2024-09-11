"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    orderDate: '',
    totalAmount: '',
    status: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log('New Order:', newOrder);
    router.push('/orders'); // Redirect to the orders list page after adding
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Add New Order
        </h1>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="customerName">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={newOrder.customerName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="orderDate">
              Order Date
            </label>
            <input
              type="date"
              id="orderDate"
              name="orderDate"
              value={newOrder.orderDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="totalAmount">
              Total Amount
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={newOrder.totalAmount}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter total amount"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={newOrder.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter order status"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-6 rounded-md w-full hover:bg-indigo-700 transition-all duration-200"
          >
            Add Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
