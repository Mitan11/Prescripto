import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import NoDataFound from "../../components/NoDataFound";
import SkeletonCard from "../../components/SkeletonCard";
import { motion } from "framer-motion";
import { FaStar, FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";

function DoctorsList() {
  const { doctors, getAllDoctors, backendUrl, aToken, changeAvailability } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      setLoading(true);
      getAllDoctors().finally(() => setLoading(false));
    }
  }, [aToken]);

  const deleteDoctor = async (docId) => {
    try {

      if (confirm("Are you sure you want to delete this doctor?")) {
        const { data } = await axios.post(backendUrl + "/api/admin/remove-doctor", { docId }, { headers: { aToken } })
        if (data.success) {
          toast.success(data.message)
          getAllDoctors()
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  // Motion variants for each card (Lazy Scroll Effect)
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="p-5 max-h-[90vh] overflow-y-scroll w-full">
      <motion.h1
        className="text-xl font-medium"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        Doctors List
      </motion.h1>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {loading ? (
          Array(8)
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : doctors?.length ? (
          doctors.map((item) => (
            <motion.div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
              key={item._id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary w-56 h-[230px] object-top object-cover transition-all duration-500"
                src={item.image}
                alt="doctor"
              />
              <div className="p-4">
                <p className="text-lg text-neutral-800 font-medium">
                  {item.name}
                </p>
                <p className="text-sm text-zinc-600">{item.speciality}</p>
                <div className="flex items-center gap-2">
                  {item.averageRating ? (
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item.averageRating.toFixed(1)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600 text-sm">No rating yet</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-1 text-sm mt-2">
                  <div className="flex justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                    />
                    <p>{item.available ? "Available" : "Not Available"}</p>

                  </div>
                  <div>
                    <button
                      className="flex items-center text-red-600 cursor-pointer"
                      onClick={() => {
                        deleteDoctor(item._id);
                      }
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}

export default DoctorsList;
