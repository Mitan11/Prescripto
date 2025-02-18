import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Navbar() {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
      toast.success("Logout successful");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white"
    >
      {/* Left Section - Logo & Role */}
      <div className="flex items-center gap-2 text-xs">
        <img 
          className="w-36 sm:w-40 cursor-pointer" 
          src={assets.admin_logo} 
          alt="Admin Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Logout Button with Motion Effect */}
      <motion.button 
        onClick={logout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-white text-sm px-10 py-2 focus:outline-none focus:bg-primary/90 rounded-full cursor-pointer hover:bg-primary/90"
      >
        Logout
      </motion.button>
    </motion.div>
  );
}

export default Navbar;
