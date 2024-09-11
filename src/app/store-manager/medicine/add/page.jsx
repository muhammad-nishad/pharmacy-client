"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [medicine, setMedicine] = useState({
    name: '',
    manufacturer: '',
    price: '',
    quantity: '',
  });
  const [mode, setMode] = useState('add');
  const [medicineId, setMedicineId] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    
    if (id) {
      setMode('edit');
      setMedicineId(id);
      fetchMedicine(id);
    }
  }, []);

  const fetchMedicine = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicine/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMedicine(data);
    } catch (error) {
      console.error('Error fetching medicine:', error);
    }
  };

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = mode === 'add'
        ? 'http://localhost:5000/api/medicine/add'
        : `http://localhost:5000/api/medicine/${medicineId}`;
      const method = mode === 'add' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicine),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message);

      router.push('/store-manager/medicine'); 
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          {mode === 'add' ? 'Add New Medicine' : 'Edit Medicine'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Medicine Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={medicine.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="manufacturer">
              Manufacturer
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={medicine.manufacturer}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter manufacturer name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={medicine.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={medicine.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter quantity"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-6 rounded-md w-full hover:bg-indigo-700 transition-all duration-200"
          >
            {mode === 'add' ? 'Add Medicine' : 'Update Medicine'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
