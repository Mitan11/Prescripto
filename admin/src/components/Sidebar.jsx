import React, { useContext } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";
import NavItem from "../components/NavItem";

function Sidebar() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

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

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavItem
            to="/doctor-dashboard"
            icon={assets.home_icon}
            text="Dashboard"
          />
          <NavItem
            to="/doctor-appointment"
            icon={assets.appointment_icon}
            text="Appointments"
          />
            <NavItem
              to="/doctor-reviews"
              icon={assets.comments_regular}
              text="Reviews"
            />
          <NavItem
            to="/doctor-profile"
            icon={assets.add_icon}
            text="Profile"
          />
        </ul>
      )}
    </motion.div>
  );
}

export default Sidebar;
