import React, { useContext } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";

function Sidebar() {
  const { aToken } = useContext(AdminContext);

  // Sidebar Animation Variants 
  const sidebarVariants = {
    hidden: { x: -250, opacity: 0 }, // Initially hidden (off-screen)
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    }, // Animate in
  };

  return (
    <motion.div
      className="min-h-screen bg-white border-r border-gray-300"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavItem
            to="/admin-dashboard"
            icon={assets.home_icon}
            text="Dashboard"
          />
          <NavItem
            to="/all-appointments"
            icon={assets.appointment_icon}
            text="Appointments"
          />
          <NavItem to="/add-doctor" icon={assets.add_icon} text="Add Doctor" />
          <NavItem
            to="/doctor-list"
            icon={assets.people_icon}
            text="Doctors List"
          />
        </ul>
      )}
    </motion.div>
  );
}

const NavItem = ({ to, icon, text }) => (
  <motion.li
    whileHover={{ scale: 1.05 }} 
    whileTap={{ scale: 0.95 }} 
  >
    <NavLink
      className={({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
          isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
        }`
      }
      to={to}
    >
      <img src={icon} alt={`${text} Icon`} />
      <p>{text}</p>
    </NavLink>
  </motion.li>
);

export default Sidebar;
