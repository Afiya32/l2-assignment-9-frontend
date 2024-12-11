
import { Outlet, Link } from "react-router-dom";

const CustomerLayOut = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-1/3 bg-blue-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Customer Panel</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/customer-dashboard/orders" className="hover:underline">
                My Orders
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/customer-dashboard" className="hover:underline">
                Profile
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/customer-dashboard/help" className="hover:underline">
                Help
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar for small screens */}
        <nav className="lg:hidden bg-blue-800 text-white p-4">
          <h2 className="text-xl font-bold">Customer Panel</h2>
        </nav>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayOut;
