"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const [newExecutive, setNewExecutive] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    experienceYears: "",
    email: "",
    contactNumber: "",
    username: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const executiveId = searchParams.get("id");

  useEffect(() => {
    if (executiveId) {
      fetch(`http://localhost:5000/api/sales-executives/${executiveId}`)
        .then((response) => response.json())
        .then((data) => {
          setNewExecutive(data);
          setIsEditing(true);
        })
        .catch((error) =>
          console.error("Error fetching executive details:", error)
        );
    }
  }, [executiveId]);

  const handleChange = (e) => {
    setNewExecutive({ ...newExecutive, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:5000/api/sales-executive/${executiveId}`
      : "http://localhost:5000/api/sales-executives/add";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExecutive),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        router.push("/sales-executives");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          {isEditing ? "Edit Sales Executive" : "Add New Sales Executive"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={newExecutive.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={newExecutive.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="dateOfBirth"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={newExecutive.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={newExecutive.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="experienceYears"
            >
              Experience Years
            </label>
            <input
              type="number"
              id="experienceYears"
              name="experienceYears"
              value={newExecutive.experienceYears}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter years of experience"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={newExecutive.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter username"
              required={!isEditing} // Optional if editing
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={newExecutive.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter password"
              required={!isEditing}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {isEditing ? "Update Executive" : "Add Executive"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
