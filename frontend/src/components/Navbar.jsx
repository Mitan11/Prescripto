import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { FaNfcSymbol, FaUserDoctor } from "react-icons/fa6";

function Navbar() {

  const navItems = [
    {
      name: "HOME",
      link: "/",
      icon: <FaHome className="h-4 w-4 text-neutral" />,
    },
    {
      name: "ALL DOCTORS",
      link: "/doctors",
      icon: <FaUserDoctor className="h-4 w-4 text-neutral" />,
    },
    {
      name: "ABOUT",
      link: "/about",
      icon: <FaInfoCircle  className="h-4 w-4 text-neutral" />,
    },
    {
      name: "CONTACT",
      link: "/contact",
      icon: <FaNfcSymbol  className="h-4 w-4 text-neutral" />,
    },
  ];

  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default Navbar;
