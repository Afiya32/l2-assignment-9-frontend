import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import localData from "../data/product.json"
const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
  
    // Fetch product details
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          // Fetch data from JSON or backend API
          const backendResponse = await axios.get(
            "https://e-commerce-rose-iota.vercel.app/products"
          );
  
          const allProducts = [...localData, ...backendResponse.data];
          const productData = allProducts.find((item) => item.id === parseInt(id));
  
          if (productData) {
            setProduct(productData);
  
            // Fetch related products in the same category
            const related = allProducts.filter(
              (item) => item.category === productData.category && item.id !== productData.id
            );
            setRelatedProducts(related);
          } else {
            console.error("Product not found");
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
  
      fetchProduct();
    }, [id]);
  
    if (!product) return <p>Loading product details...</p>;
  return (
    <div className="p-8">
    {/* Product Details */}
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg font-semibold mt-2">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="mt-2 text-sm text-gray-500">Category: {product.category}</p>

        {/* Shop Link */}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/all-products")}
        >
          Back to Shop
        </button>
      </div>
    </div>

    {/* Related Products */}
    <div className="mt-12">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {relatedProducts.map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            className="p-4 border rounded shadow-md cursor-pointer"
            onClick={() => navigate(`/product/${relatedProduct.id}`)}
          >
            <img
              src={relatedProduct.image}
              alt={relatedProduct.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
            <p>${relatedProduct.price}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Placeholder for Reviews */}
    <div className="mt-12">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <p className="mt-4 text-gray-700">[Reviews will be displayed here]</p>
    </div>
  </div>
  );
};

export default ProductDetails;