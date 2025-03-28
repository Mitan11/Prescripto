import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import SkeletonDoctorInfo from "../components/SkeletonDoctorInfo";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonBookingSlots from "../components/SkeletonBookingSlots";
import SkeletonTimeSlots from "../components/SkeletonTimeSlots";
import Testimonials from "../components/Testimonials";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setIsLoading(true);
    setDocSlots([]);
    // Getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // Setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      // Generate time slots
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        if (!docInfo || !docInfo.slots_booked) return;
        const isSlotAvailable =
          !docInfo.slots_booked[slotDate]?.includes(slotTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increase by 30 minutes
      }

      setDocSlots((prev) => [...prev, timeSlots]);
      setIsLoading(false);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Please login to book an appointment");
      return navigate("/login");
    }

    setIsLoading(true);

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/bookAppointment`,
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success("Appointment booked successfully");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const slotVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (docInfo && !isLoading) ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-[100px]"
    >
      {/* Doctor Details */}
      <AnimatePresence mode="wait">
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.img
              className="bg-primary w-full sm:max-w-72 sm:max-h-72 rounded-lg"
              src={docInfo.image}
              alt=""
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0"
            variants={itemVariants}
          >
            {/* Doctor info */}
            <motion.div variants={containerVariants}>
              <motion.p
                className="flex items-center gap-2 text-2xl font-medium text-gray-900"
                variants={itemVariants}
              >
                {docInfo.name}
                <motion.img
                  className="w-5"
                  src={assets.verified_icon}
                  alt=""
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    delay: 0.5,
                  }}
                />
              </motion.p>

              <motion.div
                className="flex items-center gap-2 text-sm mt-1 text-gray-600"
                variants={itemVariants}
              >
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <motion.button
                  className="py-0.5 px-2 border text-sm rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {docInfo.experience}
                </motion.button>
              </motion.div>
              <motion.div className="text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1 text-yellow-300"><span className="text-gray-500">Rating : </span> <FaStar /> <span className="text-gray-500">{docInfo.averageRating.toFixed(1)}</span></div>
              </motion.div>
            </motion.div>

            {/* About */}
            <motion.div variants={itemVariants}>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img className="w-3.5" src={assets.info_icon} alt="" />
              </p>
              <motion.p
                className="text-sm text-gray-500 max-w-[700px] mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {docInfo.about}
              </motion.p>
            </motion.div>

            <motion.p
              className="text-gray-500 font-medium mt-4"
              variants={itemVariants}
            >
              Appointment fee :{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Booking Slots */}
      <motion.div
        className="sm:ml-56 sm:pl-4 mt-4 font-medium text-gray-700-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.p initial={{ y: 10 }} animate={{ y: 0 }}>
          Booking slots
        </motion.p>

        <motion.div
          className="flex gap-3 items-center w-full overflow-x-scroll mt-4 p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {docSlots.map((item, index) => (
            <motion.div
              key={index}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index
                ? "bg-primary text-white"
                : "border border-gray-200"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              variants={slotVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
              onClick={() => setSlotIndex(index)}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center gap-3 w-full overflow-x-scroll mt-4 p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {docSlots.length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <motion.p
                key={index}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                  ? "bg-primary text-white"
                  : "text-gray-400 border border-gray-300"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                variants={slotVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSlotTime(item.time)}
                disabled={isLoading}
              >
                {item.time}
              </motion.p>
            ))
          ) : (
            <SkeletonTimeSlots />
          )}
        </motion.div>

        <motion.button
          className={`flex items-center justify-center gap-2 bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
            } ${docInfo.available ? "" : "bg-primary/70 cursor-not-allowed"}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={bookAppointment}
          disabled={isLoading || !docInfo.available}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-t-transparent border-b-transparent border-r-transparent border-2 rounded-full animate-spin"></div>
              Booking...
            </>
          ) : (
            "Book an appointment"
          )}
        </motion.button>
      </motion.div>

      {/* Doctor-specific Testimonials */}
      {docInfo && (
        <Testimonials
          doctorId={docId}
          title={`What Patients Say About Dr. ${docInfo.name}`}
          subtitle={`Read reviews from patients who have consulted with Dr. ${docInfo.name} for their healthcare needs.`}
          maxItems={5}
        />
      )}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </motion.div>
  ) : (
    <>
      <SkeletonDoctorInfo />
      <SkeletonBookingSlots />
      <SkeletonTimeSlots />
    </>
  );
}
export default Appointment;