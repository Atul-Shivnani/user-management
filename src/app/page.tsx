// app/page.tsx
import axios from "axios";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
};

export default async function Home() {
  const users = await fetchUsers(); // Fetch users on the server side

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <Link href="/create" className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 inline-block hover:bg-blue-600 transition-all">
          Create User
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user, index) => (
              <tr key={user.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/user/${user.id}`} className="text-blue-500 hover:underline">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
