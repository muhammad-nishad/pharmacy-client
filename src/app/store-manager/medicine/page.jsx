"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const page = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicine");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  const deleteMedicine = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicine/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setMedicines(medicines.filter((medicine) => medicine.id !== id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  // const updateMedicine = (id, updatedMedicine) => {
  //   setMedicines(
  //     medicines.map((medicine) =>
  //       medicine.id === id ? { ...medicine, ...updatedMedicine } : medicine
  //     )
  //   );
  // };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Medicine List</h1>

      <div className="mb-6">
        <Link href="/store-manager/medicine/add">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Add Medicine
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-4 border-b-2 border-gray-300">Name</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">
                Manufactore
              </th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Quantity</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-300">
                  {medicine.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {medicine.manufacturer}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {medicine.stock}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <Link href={`/store-manager/medicine/add?id=${medicine._id}`}>
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => deleteMedicine(medicine._id)}
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
