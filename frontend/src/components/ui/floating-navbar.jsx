import React, { useState, useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { NavLink, useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

export const FloatingNav = ({
    navItems,
    className,
}) => {
    const [visible, setVisible] = useState(true);
    const { token, setToken, userData } = useContext(AppContext);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const logout = () => {
        localStorage.removeItem("token");
        setToken(false);
        // navigate("/login");
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            !event.target.closest('.profile-container')) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 1, y: -100 }}
                animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                    "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
                    className
                )}
            >
                {navItems.map((navItem, idx) => (
                    <NavLink
                        key={`link-${idx}`}
                        to={navItem.link}
                        className={({ isActive }) =>
                            cn(
                                "relative items-center flex flex-col space-x-1 text-neutral-600 hover:text-neutral-500",
                                isActive && "text-primary font-medium"
                            )
                        }
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block text-sm">{navItem.name}</span>
                    </NavLink>
                ))}

                {token ? (
                    <motion.div
                        className="relative"
                        ref={dropdownRef}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img
                                className="w-8 h-8 object-cover object-center rounded-full"
                                src={userData?.image}
                                alt="Profile"
                            />
                            <img
                                className="w-2.5"
                                src={assets.dropdown_icon}
                                alt="Dropdown"
                            />
                        </div>
                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={dropdownVariants}
                                    className="absolute top-full right-0 mt-6 z-50 bg-white rounded-lg shadow-lg p-2 min-w-48"
                                >
                                    <button
                                        onClick={() => {
                                            navigate("/my-profile");
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                    >
                                        My Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/my-appointments");
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                    >
                                        My Appointments
                                    </button>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-red-500"
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border text-sm font-medium relative border-neutral-200 text-black px-4 py-2 rounded-full"
                        onClick={() => navigate("/login")}
                    >
                        <span>Login</span>
                        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                    </motion.button>
                )}
            </motion.div>
        </AnimatePresence>
    );
};