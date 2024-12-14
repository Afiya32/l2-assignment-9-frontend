import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const VendorProducts = () => {
  const { user } = useAuth(); // Get logged-in vendor info from context
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    inventory: 0,
    description: "",
    images: "",
    discount: 0,
  });

  // Fetch vendor products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-rose-iota.vercel.app/products?vendorId=${user.id}`
        );
        setProducts(response.data); // Assuming the response contains vendor products
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire("Error", "Failed to load your products", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user.id]);

  // Handle delete product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://e-commerce-rose-iota.vercel.app/products/${productId}`
      );
      setProducts(products.filter((product) => product.id !== productId));
      Swal.fire("Deleted", "Product deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  // Handle add new product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        `https://e-commerce-rose-iota.vercel.app/products`,
        { ...newProduct, shopId: user.id }
      );
      setProducts([...products, response.data]);
      Swal.fire("Added", "Product added successfully", "success");
      setNewProduct({
        name: "",
        price: 0,
        category: "",
        inventory: 0,
        description: "",
        images: "",
        discount: 0,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Products</h1>
      {loading ? (
        <p>Loading your products...</p>
      ) : products.length === 0 ? (
        <div>
          <p className="text-gray-500 mb-4">There are no products from you.</p>
          <div className="border p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              placeholder="Inventory"
              value={newProduct.inventory}
              onChange={(e) => setNewProduct({ ...newProduct, inventory: parseInt(e.target.value) })}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Image URLs (comma-separated)"
              value={newProduct.images}
              onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Inventory</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2">{product.inventory}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => console.log("Update product", product.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorProducts;
