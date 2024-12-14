
import { Outlet,  NavLink } from "react-router-dom";
import logo from '../assets/eshop PNG.png'
import { useAuth } from "../context/AuthContext";

const VendorLayout = () => {
  const {user,logout}=useAuth();
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-1/3 bg-green-800 text-white p-5 text-center">
      <div className="flex justify-center items-center gap-2 mb-5">
      <img src={logo} alt="logo" className="size-20"/>
        <div className="mb-5 text-center mt-2">
        <h2 className="text-2xl font-bold mb-2">Vendor Panel</h2>
        <h4>{user.name}</h4>
        </div>
      </div>
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Home
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/vendor-dashboard" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Manage Products
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/vendor-dashboard/orders" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Orders
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/vendor-dashboard/settings" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Settings
              </NavLink>
            </li>
            <li>
            <button
                      className="btn btn-outline btn-warning mt-2"
                      onClick={logout}
                    >
                      Logout
                    </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar for small screens */}
        <nav className="lg:hidden bg-green-800 text-white p-4">
        <div className="flex justify-center items-center gap-2 mb-5">
      <img src={logo} alt="logo" className="size-20"/>
        <div className="mb-5 text-center mt-2">
        <h2 className="text-2xl font-bold mb-2">Vendor Panel</h2>
        <h4>{user.name}</h4>
        </div>
      </div>
        <nav>
          <ul className="flex justify-center items-center gap-2">
            <li className="mb-2">
              <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Home
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/vendor-dashboard" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Manage Products
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/vendor-dashboard/orders" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Orders
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/vendor-dashboard/settings" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Settings
              </NavLink>
            </li>
            <li>
            <button
                      className="btn btn-outline btn-warning mt-2"
                      onClick={logout}
                    >
                      Logout
                    </button>
            </li>
          </ul>
        </nav>
        </nav>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
