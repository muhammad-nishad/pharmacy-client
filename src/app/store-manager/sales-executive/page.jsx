"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const page = () => {
  const [salesExecutives, setSalesExecutives] = useState([])
    useEffect(() => {
      const fetchExecutive = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/sales-executives");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setSalesExecutives(data);
        } catch (error) {
          console.error("Error fetching medicines:", error);
        }
      };
  
      fetchExecutive();
    }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Sales Executive List</h1>

      <div className="mb-6">
        <Link href="/store-manager/sales-executive/add">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Add Sales Executive
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-4 border-b-2 border-gray-300">Name</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Last Name</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Experience Years</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesExecutives.map((exec) => (
              <tr key={exec.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-300">{exec.firstName}</td>
                <td className="px-6 py-4 border-b border-gray-300">{exec.lastName}</td>
                <td className="px-6 py-4 border-b border-gray-300">{exec.experienceYears}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                <Link href={`/store-manager/sales-executive/add?id=${exec._id}`}>
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                    
                  >
                    Edit
                  </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => deleteSalesExecutive(exec._id)}
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
