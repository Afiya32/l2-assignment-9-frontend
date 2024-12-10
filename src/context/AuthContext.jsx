/* eslint-disable react/prop-types */
import  { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signup = async (userData) => {
    
    try {
      const response = await axios.post(
        "https://e-commerce-rose-iota.vercel.app/users", // Backend endpoint for signup
        userData
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      Swal.fire("Success", "Account created successfully!", "success");
     
      
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || "Signup failed", "error");
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(
        "https://e-commerce-rose-iota.vercel.app/users/sign-in", // Backend endpoint for login
        userData
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      Swal.fire("Success", "Login successful!", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Login failed", "error");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    Swal.fire("Success", "Logged out successfully", "success");
  };

  const getUser = () => user;

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
