import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {AppContext} from "../context/AppContext";
import {assets} from "../assets/assets";
import axios from "axios";
import { toast } from "react-hot-toast";
function MyProfile() {
  const { userData, setUserData , backendUrl , token , loadUserProfileData} = useContext(AppContext);
  
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(`${backendUrl}/api/user/updateProfile`, formData , {headers : {token}});
      if(data.success){
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }finally{
      setIsLoading(false);
    }
  };
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
      className="max-w-lg w-full flex flex-col gap-2 text-sm sm:text-base md:text-lg mt-[100px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      {isEdit ? (
        <label
          htmlFor="image"
          className={`cursor-pointer ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <div className={`inline-block relative ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
            <img
              className="w-24 sm:w-32 md:w-40 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            <img
              className="w-8 sm:w-10 absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%]"
              src={image ? "" : assets.upload_icon}
              alt=""
            />
          </div>
          <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
        </label>
      ) : (
        <motion.img
          className="w-24 sm:w-32 md:w-40 rounded"
          src={userData.image}
          alt=""
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      )}
  
      {isEdit ? (
        <motion.input
          className={`bg-gray-50 text-xl sm:text-2xl font-medium max-w-full sm:max-w-60 mt-4 ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-auto"}`}
          type="text"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          variants={inputVariants}
        />
      ) : (
        <motion.p className="font-medium text-xl sm:text-2xl text-neutral-800 mt-4" variants={itemVariants}>
          {userData.name}
        </motion.p>
      )}
  
      <motion.hr className="bg-zinc-400 h-[1px] border-none" variants={itemVariants} />
  
      {/* Contact Information */}
      <motion.div variants={containerVariants}>
        <motion.p className="text-neutral-500 underline mt-3 text-sm sm:text-base" variants={itemVariants}>
          CONTACT INFORMATION
        </motion.p>
  
        <motion.div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700" variants={containerVariants}>
          <motion.p className="font-medium" variants={itemVariants}>
            Email id:
          </motion.p>
          <motion.p className="text-blue-500 break-words" variants={itemVariants}>
            {userData.email}
          </motion.p>
  
          <motion.p className="font-medium" variants={itemVariants}>
            Phone:
          </motion.p>
          {isEdit ? (
            <motion.input
              className={`bg-gray-100 w-full sm:max-w-52 ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-auto"}`}
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              variants={inputVariants}
            />
          ) : (
            <motion.p className="text-blue-500" variants={itemVariants}>
              {userData.phone}
            </motion.p>
          )}
  
          <motion.p className="font-medium" variants={itemVariants}>
            Address:
          </motion.p>
          {isEdit ? (
            <motion.div className="flex flex-col gap-1" variants={inputVariants}>
              <input
                className={`bg-gray-50 w-full ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-auto"}`}
                type="text"
                value={userData.address.line1 || ""}
                onChange={(e) => setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value || "" },
                }))}
              />
              <input
                className={`bg-gray-50 w-full ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-auto"}`}
                type="text"
                value={userData.address.line2 || ""}
                onChange={(e) => setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value || "" },
                }))}
              />
            </motion.div>
          ) : (
            <motion.p variants={itemVariants}>
              {userData?.address?.line1 ?? "N/A"}
              <br />
              {userData?.address?.line2 ?? "N/A"}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
  
      {/* Basic Information */}
      <motion.div variants={containerVariants}>
        <motion.p className="text-neutral-500 underline mt-3 text-sm sm:text-base" variants={itemVariants}>
          BASIC INFORMATION
        </motion.p>
  
        <motion.div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700" variants={containerVariants}>
          <motion.p className="font-medium" variants={itemVariants}>
            Gender:
          </motion.p>
          {isEdit ? (
            <motion.select
              className={`w-full sm:max-w-20 bg-gray-50 ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
              variants={inputVariants}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </motion.select>
          ) : (
            <motion.p className="text-gray-400" variants={itemVariants}>
              {userData.gender}
            </motion.p>
          )}
  
          <motion.p className="font-medium" variants={itemVariants}>
            Birthday:
          </motion.p>
          {isEdit ? (
            <motion.input
              className={`w-full sm:max-w-[132px] bg-gray-100 ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-1"}`}
              type="date"
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
              variants={inputVariants}
            />
          ) : (
            <motion.p className="text-gray-400" variants={itemVariants}>
              {userData.dob}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
  
      {/* Buttons */}
      <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {isEdit ? (
          <motion.button
            className={`border border-primary px-6 sm:px-8 py-2 rounded-full hover:bg-primary group hover:text-white transition-all duration-300 ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} flex items-center justify-center gap-2`}
            onClick={() => updateUserProfileData()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-t-transparent border-b-transparent border-r-transparent group-hover:border-l-white border-l-primary rounded-full border-2 animate-spin"></div>
                Saving...
              </>
            ) : (
              "Save information"
            )}
          </motion.button>
        ) : (
          <motion.button
            className="border px-6 sm:px-8 py-2 rounded-full border-primary hover:bg-primary hover:text-white transition-all duration-300"
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