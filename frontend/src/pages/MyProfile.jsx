import React, { useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Mitan Tank",
    image: assets.profile_pic,
    email: "mitantank@gmail.com",
    phone: "+91 9824015597",
    address: { // Fixed typo from 'adress' to 'address'
      line1: "xyz",
      line2: "abc",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const inputVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      className="max-w-lg flex flex-col gap-2 text-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <motion.img
        className="w-36 rounded"
        src={userData.image}
        alt=""
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      />

      {isEdit ? (
        <motion.input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
          variants={inputVariants}
        />
      ) : (
        <motion.p
          className="font-medium text-3xl text-neutral-800 mt-4"
          variants={itemVariants}
        >
          {userData.name}
        </motion.p>
      )}

      <motion.hr
        className="bg-zinc-400 h-[1px] border-none"
        variants={itemVariants}
      />

      <motion.div variants={containerVariants}>
        <motion.p className="text-neutral-500 underline mt-3" variants={itemVariants}>
          CONTACT INFORMATION
        </motion.p>
        
        <motion.div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700" variants={containerVariants}>
          {/* Email */}
          <motion.p className="font-medium" variants={itemVariants}>Email id :</motion.p>
          <motion.p className="text-blue-500" variants={itemVariants}>{userData.email}</motion.p>

          {/* Phone */}
          <motion.p className="font-medium" variants={itemVariants}>Phone :</motion.p>
          {isEdit ? (
            <motion.input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              variants={inputVariants}
            />
          ) : (
            <motion.p className="text-blue-500" variants={itemVariants}>{userData.phone}</motion.p>
          )}

          {/* Address */}
          <motion.p className="font-medium" variants={itemVariants}>Address :</motion.p>
          {isEdit ? (
            <motion.div variants={inputVariants}>
              <input
                className="bg-gray-50"
                type="text"
                value={userData.address.line1}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))}
              />
              <br />
              <input
                className="bg-gray-50"
                type="text"
                value={userData.address.line2}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))}
              />
            </motion.div>
          ) : (
            <motion.p variants={itemVariants}>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      <motion.div variants={containerVariants}>
        <motion.p className="text-neutral-500 underline mt-3" variants={itemVariants}>
          BASIC INFORMATION
        </motion.p>
        
        <motion.div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700" variants={containerVariants}>
          {/* Gender */}
          <motion.p className="font-medium" variants={itemVariants}>Gender :</motion.p>
          {isEdit ? (
            <motion.select
              className="max-w-20 bg-gray-50"
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
              variants={inputVariants}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </motion.select>
          ) : (
            <motion.p className="text-gray-400" variants={itemVariants}>{userData.gender}</motion.p>
          )}

          {/* Birthday */}
          <motion.p className="font-medium" variants={itemVariants}>Birthday :</motion.p>
          {isEdit ? (
            <motion.input
              className="max-w-28 bg-gray-100"
              type="date"
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
              variants={inputVariants}
            />
          ) : (
            <motion.p className="text-gray-400" variants={itemVariants}>{userData.dob}</motion.p>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isEdit ? (
          <motion.button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => setIsEdit(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save information
          </motion.button>
        ) : (
          <motion.button
            className="border px-8 py-2 rounded-full border-primary hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => setIsEdit(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default MyProfile; 