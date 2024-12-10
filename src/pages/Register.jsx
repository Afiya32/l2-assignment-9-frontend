import { useState } from "react";
import logo from "../assets/eshop PNG.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const [isSignup, setIsSignup] = useState(false);
    const { signup, login } = useAuth();
    const navigate = useNavigate();
   
    const toggleAuthMode = () => {
        setIsSignup(!isSignup);
    };

    const handleSignup = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
     
    };

    await signup(userData);
    navigate("/"); 
         
    };

    const handleLogin = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await login(userData);
    navigate("/"); 
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-6">
          <div className="mx-2 flex px-2">
            <img alt="logo" src={logo} className="size-28" />
          </div>
          <div className="flex items-center">
            <span className={`mr-2 ${isSignup ? "text-blue-500" : "text-blue-500"} font-bold`}>Login</span>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className={`toggle toggle-lg border-2 rounded-full transition-all duration-300 ${
                  isSignup ? "bg-green-500" : "bg-blue-500"
                }`}
                checked={isSignup}
                onChange={toggleAuthMode}
              />
            </label>
            <span className={`ml-2 ${isSignup ? "text-green-500" : "text-green-500"} font-bold`}>Sign Up</span>
          </div>
        </div>

        {isSignup ? (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-500">Name</label>
              <input name="name" type="text" className="input input-bordered w-full text-green-500" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-500">Email</label>
              <input name="email" type="email" className="input input-bordered w-full text-green-500" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-500">Password</label>
              <input name="password" type="password" className="input input-bordered w-full text-green-500" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-500">Role</label>
              <select name="role" className="input input-bordered w-full text-green-500" required>
                <option value="vendor">Vendor</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-full">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-green-500">Email</label>
              <input name="email" type="email" className="input input-bordered w-full text-blue-500" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-green-500">Password</label>
              <input name="password" type="password" className="input input-bordered w-full text-blue-500" required />
            </div>
            <button type="submit" className="btn btn-primary w-full">Login</button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Register;



