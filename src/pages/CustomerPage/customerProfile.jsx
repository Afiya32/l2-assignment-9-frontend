import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const CustomerProfile = () => {
  const { user, setUser } = useAuth(); // `setUser` for updating the user in context
  const [customer, setCustomer] = useState(null); // State to hold customer data
  const [editData, setEditData] = useState({ name: "", email: "" }); // State for editable fields

  // Fetch customer data from backend
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`https://e-commerce-rose-iota.vercel.app/users/${user.id}`);
        setCustomer(response.data);
        setEditData({ name: response.data.name, email: response.data.email }); // Pre-fill editable fields
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomer();
  }, [user.id]);

  // Handle update
  const handleUpdate = async () => {
    try {
      const updatedCustomer = { ...customer, ...editData }; // Merge edited data with existing data
      const response = await axios.put(
        `https://e-commerce-rose-iota.vercel.app/users/${user.id}`,
        updatedCustomer
      );

      // Update context and localStorage
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", {error});
    }
  };

  if (!customer) {
    return <div className="flex items-center justify-center text-center mt-56"> <span className="loading loading-spinner loading-lg"></span>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Profile</h1>
      <div className="max-w-md mx-auto bg-white shadow p-4 rounded">
        <div className="mb-4">
          <label className="block font-bold mb-2">Name</label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Email</label>
          <input
            type="email"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Role</label>
          <input
            type="text"
            value={customer.role}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
