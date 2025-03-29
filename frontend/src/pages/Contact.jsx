import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import ContactForm from "../components/ContactForm";
import { FaWhatsapp } from "react-icons/fa";

function Contact() {

  useEffect(() => {
    document.title = "Prescripto | Contact";
  }, []);

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
      className="mt-[100px]"
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

      <ContactForm/>

      <motion.div
        variants={imageVariants}
        className="h-96 bg-gray-100 rounded-xl overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.34567658643!2d-77.03980448464716!3d38.92384777956228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7bce1485b19%3A0x9fc7bf09fd5d9baf!2sWashington%2C%20DC%2C%20USA!5e0!3m2!1sen!2sin!4v1718814348531!5m2!1sen!2sin"
          className="w-full h-full"
          loading="lazy"
        ></iframe>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 bg-blue-500 p-4 rounded-full cursor-pointer shadow-lg"
      >
        <a className="text-white flex items-center gap-1" href="https://api.whatsapp.com/message/PCCFHVZIEKP4B1?autoload=1&app_absent=0" target="_blank" ><FaWhatsapp className="text-lg" /> Chat</a>
      </motion.div>

    </motion.div>
  );
}

export default Contact;