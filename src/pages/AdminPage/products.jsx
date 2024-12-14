import  { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import productFromFake from "../../data/product.json"

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://e-commerce-rose-iota.vercel.app/products");
        const localProduct = [...productFromFake,response.data]
        setProducts(localProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle update product
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      await axios.put(`https://e-commerce-rose-iota.vercel.app/products/${productId}`, updatedData);
      Swal.fire("Success", "Product updated successfully", "success");
      // Refresh products after update
      setProducts((prev) =>
        prev.map((product) => (product.id === productId ? { ...product, ...updatedData } : product))
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update product", {error});
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://e-commerce-rose-iota.vercel.app/products/${productId}`);
      Swal.fire("Success", "Product deleted successfully", "success");
      // Remove product from state
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      Swal.fire("Error", "Failed to delete product", {error});
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Inventory</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={product.price}
                  className="border rounded px-2 py-1"
                  onChange={(e) =>
                    handleUpdateProduct(product.id, { price: parseFloat(e.target.value) })
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={product.category}
                  className="border rounded px-2 py-1"
                  onChange={(e) =>
                    handleUpdateProduct(product.id, { category: e.target.value })
                  }
                />
              </td>
              <td className="border px-4 py-2">{product.inventory}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleDeleteProduct(product.id)}
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

export default Products;
