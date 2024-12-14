
import { Outlet,  NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/eshop PNG.png'

const AdminLayout = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-1/3 bg-gray-800 text-white p-5">
     <div className="flex justify-center items-center gap-2">
     <img src={logo} alt="logo" className="size-20" />
     <div className="mb-5">
     <h2 className="text-2xl font-bold mb-2 text-center">Admin Panel</h2>
     <p className="text-center">{user.name}</p>
     </div>
     </div>
       
        <nav>
          <ul className="grid items-center justify-center">
            <li className="mb-2">
              <NavLink to="/"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Home
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin-dashboard/product"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                products
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin-dashboard"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Manage Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin-dashboard/setting"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Settings
              </NavLink>
            </li>
            <li>
            <button
                      className="btn btn-outline btn-primary mt-2"
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
        <nav className="lg:hidden flex justify-center items-center gap-2 bg-gray-800 text-white p-4">
        <div className="flex justify-center items-center gap-2">
     <img src={logo} alt="logo" className="size-20" />
     </div>
          <h2 className="text-xl font-bold">Admin Panel</h2>
     <p>{user.name}</p>
          <ul className="flex justify-center items-center gap-2">
            <li className="mb-2">
              <NavLink to="/"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Home
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin-dashboard/product"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                products
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin-dashboard"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Manage Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/admin-dashboard/setting"  className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-white p-2 "
            }>
                Settings
              </NavLink>
            </li>
            <li>
            <button
                      className="btn btn-outline btn-primary mt-2"
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

export default AdminLayout;
