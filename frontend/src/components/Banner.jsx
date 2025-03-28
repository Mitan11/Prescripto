import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";

function Banner() {
  const navigate = useNavigate();

  // Animation variants with smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        ease: "easeInOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 0.5
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5,
        delay: 0.3
      }
    },
  };

  return (
    <motion.div
      className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Left Side */}
      <motion.div
        className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5"
        variants={containerVariants}
      >
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          <motion.p variants={itemVariants}>Book Appointment</motion.p>
          <motion.p className="mt-4" variants={itemVariants}>
            With 100+ Trusted Doctors
          </motion.p>
        </motion.div>

        <motion.button
          className="bg-white text-sm sm:text-base text-gray-600 px-4 py-3 rounded-full mt-6"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { type: "spring", stiffness: 300 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { type: "spring", stiffness: 300 }
          }}
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          Create account
        </motion.button>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="hidden md:block md:w-1/2 lg:w-[370px] relative"
        variants={imageVariants}
      >
        <motion.img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
          variants={imageVariants}
        />
      </motion.div>
    </motion.div>
  );
}

export default Banner;