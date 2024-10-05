"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userSchema, UserType } from "../schemas"; // Import the user schema
import { z } from "zod";

const CreateUser = () => {
  const [formData, setFormData] = useState<UserType>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressKey = name.split(".")[1];
      setFormData((prev: UserType) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressKey]: value,
        },
      }));
    } else if (name.startsWith("company.")) {
      const companyKey = name.split(".")[1];
      setFormData((prev: UserType) => ({
        ...prev,
        company: {
          ...prev.company,
          [companyKey]: value,
        },
      }));
    } else {
      setFormData((prev: UserType) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate the form data
    try {
      userSchema.parse(formData); // This will throw if validation fails
      const res = await axios.post("https://jsonplaceholder.typicode.com/users", formData);
      console.log("New user created:", res.data);
      router.push("/"); // Redirect back to the user list after creation
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const fieldName = err.path.join('.'); // Construct the field name for nested properties
            fieldErrors[fieldName] = err.message; // Map errors to the respective field
          }
        });
        setErrors(fieldErrors); // Set errors in state
      }
    } finally {
      setLoading(false);
    }
  };

  // Display loading skeleton while creating user
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 animate-pulse">Creating User...</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4 h-4 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="mb-4 h-4 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="mb-4 h-4 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="mb-4 h-4 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create User</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
        {/* Personal Information Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className={`w-full border ${errors.website ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
          </div>
        </div>

        {/* Address Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Street</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className={`w-full border ${errors["address.street"] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors["address.street"] && <p className="text-red-500 text-sm">{errors["address.street"]}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Suite</label>
            <input
              type="text"
              name="address.suite"
              value={formData.address.suite}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className={`w-full border ${errors["address.city"] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors["address.city"] && <p className="text-red-500 text-sm">{errors["address.city"]}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Zipcode</label>
            <input
              type="text"
              name="address.zipcode"
              value={formData.address.zipcode}
              onChange={handleInputChange}
              className={`w-full border ${errors["address.zipcode"] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors["address.zipcode"] && <p className="text-red-500 text-sm">{errors["address.zipcode"]}</p>}
          </div>
        </div>

        {/* Company Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Company Name</label>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleInputChange}
              className={`w-full border ${errors["company.name"] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors["company.name"] && <p className="text-red-500 text-sm">{errors["company.name"]}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Catch Phrase</label>
            <input
              type="text"
              name="company.catchPhrase"
              value={formData.company.catchPhrase}
              onChange={handleInputChange}
              className={`w-full border ${errors["company.catchPhrase"] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors["company.catchPhrase"] && <p className="text-red-500 text-sm">{errors["company.catchPhrase"]}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">BS</label>
            <input
              type="text"
              name="company.bs"
              value={formData.company.bs}
              onChange={handleInputChange}
              className={`w-full border ${errors["company.bs"] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors["company.bs"] && <p className="text-red-500 text-sm">{errors["company.bs"]}</p>}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
