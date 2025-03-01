import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { FaSpinner } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function DoctorProfile() {
  const { profileData, backendUrl, getProfileData, dToken, setProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updatedProfile = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      console.log(updatedProfile);

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updatedProfile,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const inputVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return profileData ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 max-h-[85vh] overflow-y-scroll w-full"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-4 flex-col m-5"
      >
        <motion.div variants={childVariants}>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="w-50 sm:w-full sm:max-w-64 rounded-lg bg-primary/80"
            src={profileData.image}
            alt="Profile"
          />
        </motion.div>

        <motion.div
          variants={childVariants}
          className="flex-1 border-stone-100 rounded-lg p-8 py-7 bg-white"
        >
          <motion.p 
            className="flex items-center gap-2 text-3xl font-medium text-gray-700"
            variants={childVariants}
          >
            {profileData.name}
          </motion.p>

          <motion.div 
            className="flex items-center gap-2 mt-1 text-gray-600"
            variants={childVariants}
          >
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <motion.button 
              className="text-xs py-0.5 px-2 border rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              {profileData.experience}
            </motion.button>
          </motion.div>

          <motion.div variants={childVariants}>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              About :
            </p>
            <motion.p 
              className="text-sm text-gray-600 max-w-[700px] mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {profileData.about}
            </motion.p>
          </motion.div>

          <motion.p 
            className="text-gray-600 font-medium mt-4"
            variants={childVariants}
          >
            Appointment Fees :{" "}
            <span className="text-gray-800">
              {currency}{" "}
              {isEdit ? (
                <motion.input
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData({ ...profileData, fees: e.target.value })
                  }
                  className="ml-2 p-1 border rounded"
                />
              ) : (
                profileData.fees
              )}
            </span>
          </motion.p>

          <motion.div 
            className="flex gap-2 py-2"
            variants={childVariants}
          >
            <p>Address : </p>
            <div className="text-sm">
              {isEdit ? (
                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: {
                          ...profileData.address,
                          line1: e.target.value,
                        },
                      })
                    }
                    className="mb-1 p-1 border rounded"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: {
                          ...profileData.address,
                          line2: e.target.value,
                        },
                      })
                    }
                    className="p-1 border rounded"
                  />
                </motion.div>
              ) : (
                <>
                  {profileData.address?.line1}
                  <br />
                  {profileData.address?.line2}
                </>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-1 py-2"
            variants={childVariants}
          >
            <input
              type="checkbox"
              id="available"
              onChange={(e) =>
                isEdit &&
                setProfileData({
                  ...profileData,
                  available: !profileData.available,
                })
              }
              checked={profileData.available}
            />
            <label htmlFor="available">Available</label>
          </motion.div>

          <motion.div variants={childVariants}>
            {isEdit ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 px-4 py-1 border border-primary text-sm rounded-full mt-5"
                onClick={updateProfile}
              >
                Save
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 px-4 py-1 border border-primary text-sm rounded-full mt-5"
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <motion.div
        className="flex flex-col items-center gap-2"
      >
        <FaSpinner className="text-2xl loading-spinner" />
        <p className="text-gray-500">Loading...</p>
      </motion.div>
    </div>
  );
}

export default DoctorProfile;