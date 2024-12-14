
import { Outlet,  NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/eshop PNG.png'

const CustomerLayOut = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-1/3 bg-blue-800 text-white p-5">
      <div className="flex justify-center items-center gap-2">
     <img src={logo} alt="logo" className="size-20" />
     <div className="mb-5">
     
        <h2 className="text-2xl font-bold mb-5">Customer Panel</h2>
     <p className="text-center">{user.name}</p>
     </div>
     </div>
        <nav>
          <ul className="text-center">
            <li className="mb-2">
              <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Home
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/customer-dashboard/orders" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                My Orders
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/customer-dashboard"className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Profile
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/customer-dashboard/help" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Help
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
        <nav className="lg:hidden bg-blue-800 text-white p-4">
        <div className="flex justify-center items-center gap-2">
     <img src={logo} alt="logo" className="size-20" />
     <div className="mb-5">
     
        <h2 className="text-2xl font-bold mb-5">Customer Panel</h2>
     <p className="text-center">{user.name}</p>
     </div>
     </div>
     <ul className="text-center flex justify-center items-center gap-2">
            <li className="mb-2">
              <NavLink to="/" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Home
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/customer-dashboard/orders" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                My Orders
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/customer-dashboard"className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Profile
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/customer-dashboard/help" className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Help
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
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayOut;
