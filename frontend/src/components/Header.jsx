import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function Header() {
  return (
    <motion.div
      className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
    >
      {/* Left Side */}
      <motion.div
        className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.p
          className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          Book Appointment <br />
          With Trusted Doctors
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.img
            className="w-28"
            src={assets.group_profiles}
            alt="Group Profiles"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free
          </p>
        </motion.div>

        <motion.a
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href="#speciality"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book appointment{" "}
          <motion.img
            className="w-3"
            src={assets.arrow_icon}
            alt="Arrow Icon"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="md:w-1/2 relative"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="Header Image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Header;
