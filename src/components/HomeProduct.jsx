import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "./ScrollToTop";
import localData from '../data/product.json'


const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Fetch products from local JSON and backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
       
        const backendResponse = await axios.get(
          "https://e-commerce-rose-iota.vercel.app/products"
        );

        const allProducts = [...localData, ...backendResponse.data];

        setProducts(allProducts);
        
        setDisplayedProducts(allProducts.slice(0, 6));
        setFlashSaleProducts(
          allProducts.filter((product) => product.isFlashSale)
        );

        const uniqueCategories = [...new Set(allProducts.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
    
  // Handle search
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedProducts(filtered.slice(0, 6));
    setCurrentPage(1);
  };

  // Handle pagination
  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    const newProducts = products.slice(0, nextPage * 6);
    setDisplayedProducts(newProducts);
    setCurrentPage(nextPage);
  };

  // Filter by category
  const filterByCategory = (category) => {
    navigate("/all-products", { state: { category } });
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="my-4 mx-auto w-3/4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-3/4 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Search
        </button>
      </div>

      {/* Categories */}
      <div className="my-4 flex  overflow-x-auto justify-center items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className="bg-blue-500 text-white px-4 py-2 rounded btn btn-outline "
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts?.map((product) => (
          <div key={product?.id} className="p-4 border rounded"
          onClick={() => navigate(`/product/${product.id}`)}>
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-lg font-semibold">{product?.name}</h3>
            <p>${product?.price}</p>
            <p className="text-sm text-gray-500">{product?.category}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {displayedProducts?.length < products?.length && (
        <div className="my-4 text-center">
          <button
            onClick={loadMoreProducts}
            className="bg-green-500 text-white px-4 py-2 rounded btn btn-outline btn-accent"
          >
            Load More
          </button>
        </div>
      )}

      {/* Flash Sale Section */}
      <div className="my-8 grid justify-center items-center">
        <h2 className="text-xl font-bold text-center">Flash Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:justify-center sm:items-center lg:grid-cols-3 gap-4 justify-center items-center ">
          {flashSaleProducts?.slice(0, 3).map((product) => (
            <div key={product?.id} className="p-4 border rounded">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-lg font-semibold">{product?.name}</h3>
              <p>${product?.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/flash-sale")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            View All Flash Sales
          </button>
        </div>
      </div>

      {/* Scroll-to-Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default HomeProduct;
