import  { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const CustomerOrder = () => {
  const { user } = useAuth(); // Get logged-in user info from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for the user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-rose-iota.vercel.app/order?userId=${user.id}`
        );
        setOrders(response.data); // Assuming the response is an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire("Error", "Failed to load your orders", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">There are no orders from you.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${order.total.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerOrder;
