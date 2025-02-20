import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const linkVariants = {
    hover: { scale: 1.05, color: "#3b82f6" }, // Blue color on hover
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="md:mx-10"
      initial="hidden"
      whileInView="visible"
      viewport={{  amount: 0.2 }} // Trigger animation once when 20% of the component is in view
      variants={containerVariants}
    >
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left section */}
        <motion.div variants={itemVariants}>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-1/2 text-gray-600 leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            ea ipsum similique neque vel consequatur consectetur, sunt esse
            ullam ab iure nesciunt quos magnam
          </p>
        </motion.div>

        {/* Center Section */}
        <motion.div variants={itemVariants}>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {["Home", "About us", "Contact us", "Privacy policy"].map(
              (item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="cursor-pointer"
                >
                  {item}
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* Right Section */}
        <motion.div variants={itemVariants}>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <motion.li
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer"
            >
              +1-234-567-8901
            </motion.li>
            <motion.li
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer"
            >
              prescripto.contact@gmail.com
            </motion.li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright Text */}
      <motion.div variants={itemVariants}>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024&copy; Prescripto - All Right Reserved.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Footer;