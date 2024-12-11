import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
// import axios from "axios";
import localData from "../data/shop.json";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate =useNavigate();

  useEffect(() => {
    // Fetch shop data
    const fetchShops = async () => {
      try {
        // const response = await axios.get(
        //   "https://e-commerce-rose-iota.vercel.app/api/shop"
        // ); 
        const shops = [...localData];
        setShops(shops);
        setLoading(false);
      } catch (error) {
      console.error(error);
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleFollowToggle = (shopId) => {
    setShops((prevShops) =>
      prevShops.map((shop) =>
        shop.id === shopId
          ? { ...shop, isFollowed: !shop.isFollowed }
          : shop
      )
    );
  };

  const handleAddToCart = (product) => {
    Swal.fire(
      'Added to Cart',
      `${product.name} has been added to your cart!`,
      'success'
    );
    navigate('/')
  };

  if (loading) return <div>Loading...</div>;
 

  return (
    <div className="shop-page">
      <h1 className="text-center text-2xl font-bold mb-5">Shops</h1>
      {shops.map((shop) => (
        <div key={shop.id} className="shop-card border p-4 rounded mb-5 shadow-lg">
          <div className="shop-header flex items-center mb-4">
            <img
              src={shop.logo}
              alt={shop.name}
              className="h-16 w-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{shop.name}</h2>
              <p>{shop.description}</p>
              <p className="text-sm text-gray-600">
                Vendor: {shop.vendor.name}
              </p>
            </div>
          </div>

          <div className="followers mb-3">
            <span className="font-semibold">{shop.followerCount} Followers</span>
            <button
              className={`ml-3 px-3 py-1 rounded ${
                shop.isFollowed ? "bg-red-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() => handleFollowToggle(shop.id)}
            >
              {shop.isFollowed ? "Unfollow" : "Follow"}
            </button>
          </div>

          <h3 className="text-lg font-bold mb-2">Products</h3>
          <div className="products grid grid-cols-2 gap-4">
            {shop.products.map((product) => (
              <div
                key={product.id}
                className="product-card border p-3 rounded shadow-md"
              >
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <button
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutPage;
