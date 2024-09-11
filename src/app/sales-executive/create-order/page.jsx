"use client";

import React, { useState } from "react";

const CreateOrder = () => {
  const [order, setOrder] = useState({
    customerName: "",
    contactNumber: "",
    products: "",
    purchaseStatus: "Pending",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Created:", order);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Create New Order
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="customerName"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={order.customerName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter customer name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={order.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter contact number"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="products"
            >
              Products
            </label>
            <input
              type="text"
              id="products"
              name="products"
              value={order.products}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter product names"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="purchaseStatus"
            >
              Purchase Status
            </label>
            <select
              id="purchaseStatus"
              name="purchaseStatus"
              value={order.purchaseStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-6 rounded-md w-full hover:bg-indigo-700 transition-all duration-200"
          >
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
