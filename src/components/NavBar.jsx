import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/eshop PNG.png";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <img src={logo} alt="logo" className="size-12" />
            <h1 className="font-bold text-3xl">
              <span className="text-red-600">E</span>
              <span className="text-green-600">-</span>
              <span className="text-blue-500">S</span>
              <span className="text-orange-600">ho</span>
              <span className="text-purple-600">p</span>
            </h1>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-green-400 p-2" : "text-black p-2"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/all-products"
                className={({ isActive }) =>
                  isActive ? "text-green-400 p-2 mr-2" : "text-black p-2"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-green-400 p-2" : "text-black p-2"
                }
              >
                Shops
              </NavLink>
              {user ? (
                <div className="dropdown dropdown-end dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1">
                    {user.name}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow grid items-center justify-center"
                  >
                    <NavLink
                      className="p-2 btn btn-outline btn-primary"
                      to={`/${user.role}-dashboard`}
                    >
                      Dash-Board
                    </NavLink>
                    <button
                      className="btn btn-outline btn-primary mt-2"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              ) : (
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-green-400 p-2" : "text-black p-2"
                  }
                >
                  Register
                </NavLink>
              )}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <div className="min-h-[70vh]">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="mx-2 flex items-center justify-center px-2">
            <img src={logo} alt="logo" className="size-12" />
            <h1 className="font-bold text-3xl">
              <span className="text-red-600">E</span>
              <span className="text-green-600">-</span>
              <span className="text-blue-500">S</span>
              <span className="text-orange-600">ho</span>
              <span className="text-purple-600">p</span>
            </h1>
          </div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-400 p-2 " : "text-black p-2 "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive ? "text-green-400 p-2 mr-2" : "text-black p-2 "
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-green-400 p-2" : "text-black p-2"
            }
          >
            Shops
          </NavLink>
          {user ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                {user.name}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow grid items-center justify-center"
              >
                <NavLink
                  className="p-2 btn btn-outline btn-primary"
                  to={`/${user.role}-dashboard`}
                >
                  Dash-Board
                </NavLink>
                <button
                  className="btn btn-outline btn-primary mt-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-green-400 p-2" : "text-black p-2"
              }
            >
              Register
            </NavLink>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
