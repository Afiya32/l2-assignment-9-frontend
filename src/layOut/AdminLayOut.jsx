
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-1/3 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/admin-dashboard/product" className="hover:underline">
                products
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/admin-dashboard" className="hover:underline">
                Manage Users
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/admin-dashboard/setting" className="hover:underline">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar for small screens */}
        <nav className="lg:hidden bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </nav>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
