import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token,setToken,userData} = useContext(AppContext);

const logout = () => {
  localStorage.removeItem("token");
  setToken(false);
  navigate("/login");
}

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400"
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="sm:w-44 w-36 cursor-pointer"
        src={assets.logo}
        alt=""
        onClick={() => navigate("/")}
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:text-primary transition-all duration-300">
            HOME
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 hover:text-primary transition-all duration-300">
            ALL DOCTORS
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 hover:text-primary transition-all duration-300">
            ABOUT
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 hover:text-primary transition-all duration-300">
            CONTACT
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <motion.div className="relative group">
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 object-cover object-center rounded-full"
                src={userData.image}
                alt=""
              />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            </div>

            <AnimatePresence>
              <motion.div
                className="absolute top-0 right-0 pt-14 z-20 group-hover:block hidden transition-all duration-300 cursor-pointer"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                transition={{ duration: 0.2 }}
              >
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-1 p-4">
                  <p
                    className="hover:text-black cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all duration-300"
                    onClick={() => navigate("/my-profile")}
                  >
                    My Profile
                  </p>
                  <p
                    className="hover:text-black cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all duration-300"
                    onClick={() => navigate("/my-Appointments")}
                  >
                    My Appointments
                  </p>
                  <p
                    className="hover:text-black cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all duration-300"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-normal hidden md:block transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>
        )}

        <motion.img
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
          onClick={() => setShowMenu(true)}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="fixed inset-0 md:hidden z-20 bg-white"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-6 py-6">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-36 cursor-pointer"
                  src={assets.logo}
                  alt=""
                  onClick={() => navigate("/")}
                />
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-7"
                  src={assets.cross_icon}
                  alt=""
                  onClick={() => setShowMenu(false)}
                />
              </div>

              <motion.ul
                className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {["/", "/doctors", "/about", "/contact"].map((path, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <NavLink
                      to={path}
                      onClick={() => setShowMenu(false)}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded inline-block transition-all duration-300 ${
                          isActive ? "text-white bg-primary" : "text-black"
                        } hover:text-primary`
                      }
                    >
                      {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Navbar;
