import  { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://e-commerce-rose-iota.vercel.app/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle role update
  const handleRoleUpdate = async (Id, newRole) => {
    try {
      await axios.put(`https://e-commerce-rose-iota.vercel.app/users/${Id}`, { role: newRole });
      Swal.fire("Success", "Role updated successfully", "success");
      // Refresh users after update
      setUsers((prev) =>
        prev.map((user) => (user.id === Id ? { ...user, role: newRole } : user))
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update role", {error});
    }
  };

  // Handle delete user
  const handleDeleteUser = async (Id) => {
    try {
      await axios.delete(`https://e-commerce-rose-iota.vercel.app/users/${Id}`);
      Swal.fire("Success", "User deleted successfully", "success");
      // Remove user from state
      setUsers((prev) => prev.filter((user) => user.id !== Id));
    } catch (error) {
      Swal.fire("Error", "Failed to delete user", {error});
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <select
                  className="border rounded px-2 py-1"
                  value={user.role}
                  onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
