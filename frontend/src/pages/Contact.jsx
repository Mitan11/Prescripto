import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function Contact() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "anticipate" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Heading */}
      <motion.div
        className="text-center text-2xl text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="flex flex-col md:flex-row justify-center gap-10 my-10 mb-28 text-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Image */}
        <motion.img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
          variants={imageVariants}
        />

        {/* Contact Info */}
        <motion.div
          className="flex flex-col justify-center items-start gap-6"
          variants={containerVariants}
        >
          <motion.p
            className="text-gray-600 text-lg font-semibold"
            variants={itemVariants}
          >
            OUR OFFICE
          </motion.p>

          <motion.p
            className="text-gray-500"
            variants={itemVariants}
          >
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </motion.p>

          <motion.p
            className="text-gray-500"
            variants={itemVariants}
          >
            Tel: +91 8431455095 <br />
            Email: imrohitsampannavar@gmail.com
          </motion.p>

          <motion.p
            className="font-semibold text-lg text-gray-600"
            variants={itemVariants}
          >
            Careers at PRESCRIPTO
          </motion.p>

          <motion.p
            className="text-gray-500"
            variants={itemVariants}
          >
            Learn More about our teams and job openings.
          </motion.p>

          <motion.button
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
            variants={itemVariants}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Contact;