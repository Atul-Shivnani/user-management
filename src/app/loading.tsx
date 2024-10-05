// app/loading.tsx
export default function Loading() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 animate-pulse">User Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {/* Create 5 rows of skeleton loading */}
              {Array(5).fill(0).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-2 px-4 border-b">
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="h-4 bg-gray-300 rounded w-48"></div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="h-4 bg-gray-300 rounded w-64"></div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  