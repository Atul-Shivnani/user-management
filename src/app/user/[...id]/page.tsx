"use client"; // Make the component a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Client-side routing
import axios from "axios";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserDetails = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | null>(null); // State to store user data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}`);
        setUser(res.data); // Set user data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserDetails();
  }, [params.id]);

  // Delete user
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${params.id}`);
        router.push("/"); // Redirect to the home page after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 animate-pulse">Loading User Details...</h1>
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-64 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-80 animate-pulse"></div>
            <h2 className="text-lg font-semibold mt-4 animate-pulse">Address</h2>
            <div className="h-6 bg-gray-300 rounded w-80 animate-pulse"></div>
            <h2 className="text-lg font-semibold mt-4 animate-pulse">Company</h2>
            <div className="h-6 bg-gray-300 rounded w-64 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{user.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="mb-2"><strong className="text-gray-600">Email:</strong> {user.email}</p>
        <p className="mb-2"><strong className="text-gray-600">Phone:</strong> {user.phone}</p>
        <p className="mb-2"><strong className="text-gray-600">Username:</strong> {user.username}</p>
        <p className="mb-2"><strong className="text-gray-600">Website:</strong> <a href={`https://${user.website}`} className="text-blue-500 hover:underline">{user.website}</a></p>

        <h2 className="text-lg font-semibold mt-4 text-gray-800">Address</h2>
        <p className="mb-2">{user.address.street}, {user.address.city}, {user.address.zipcode}</p>

        <h2 className="text-lg font-semibold mt-4 text-gray-800">Company</h2>
        <p className="mb-2">{user.company.name} - <em>{user.company.catchPhrase}</em></p>

        {/* Edit and Delete buttons */}
        <div className="mt-6 flex space-x-4">
          <Link href={`/edit/${user.id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Edit
          </Link>
          <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
