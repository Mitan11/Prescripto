import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { FaHome, FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";
import { FcAbout } from "react-icons/fc";

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
      icon: <FcAbout className="h-4 w-4 text-neutral" />,
    },
    {
      name: "CONTACT",
      link: "/contact",
      icon: <MdContactSupport  className="h-5 w-5 text-neutral" />,
    },
  ];

  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default Navbar;
