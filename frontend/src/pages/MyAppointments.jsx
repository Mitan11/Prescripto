import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import NoAppointments from "../components/NoAppointments";
import MyAppointmentskeleton from "../components/MyAppointmentskeleton";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function MyAppointments() {
  const { token, backendUrl, getDoctorsData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewedAppointments, setReviewedAppointments] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Enhanced Star Rating Component with half-star support
  const StarRating = ({ rating, setRating }) => {
    const handleStarClick = (index, event) => {
      const starRect = event.currentTarget.getBoundingClientRect();
      const starCenter = starRect.left + starRect.width / 2;
      const clickPosition = event.clientX;

      // If clicked on left half of star, set half star
      if (clickPosition < starCenter) {
        setRating(index - 0.5);
      } else {
        setRating(index);
      }
    };

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={(e) => handleStarClick(star, e)}
            className="text-2xl relative cursor-pointer"
            title={`${star - 0.5} or ${star} stars`}
          >
            {rating >= star ? (
              <FaStar className="text-yellow-400" />
            ) : rating >= star - 0.5 ? (
              <FaStarHalfAlt className="text-yellow-400" />
            ) : (
              <FaStar className="text-gray-300" />
            )}
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating ? `${rating.toFixed(1)} stars` : "Select rating"}
        </span>
      </div>
    );
  };

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        // Fetch list of reviewed appointments
        await getReviewedAppointments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get list of appointments that have been reviewed
  const getReviewedAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/reviewedAppointments`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setReviewedAppointments(data.reviewedAppointmentIds);
      }
    } catch (error) {
      console.error('Error fetching reviewed appointments');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancelAppointment`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const makePayment = async (appointmentId) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/makePayment`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        }
      );
  
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        setIsPaymentModalOpen(false); // Close the payment modal
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  // Modified Add Review Handler
  const handleAddReview = (appointment) => {
    setCurrentAppointment(appointment);
    setIsReviewModalOpen(true);
  };

  // Submit Review Handler
  const submitReview = async () => {
    if (rating <= 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setIsLoading(true);

      const reviewData = {
        appointmentId: currentAppointment._id,
        doctorId: currentAppointment.docData._id,
        rating,
        comment
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/addReview`,
        reviewData,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success('Review submitted successfully!');
        // Add the current appointment ID to the reviewed list
        setReviewedAppointments(prev => [...prev, currentAppointment._id]);
        getUserAppointments();
        setIsReviewModalOpen(false);
        setRating(0);
        setComment('');
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  // Open Payment Modal and Set Current Appointment
  const handleOpenPaymentModal = (appointment) => {
    setCurrentAppointment(appointment);
    setIsPaymentModalOpen(true);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
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

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div>
      <motion.p
        className="pb-4 font-medium text-zinc-700 border-b mt-[100px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        My appointments
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {isLoading ? (
            // Show skeleton loaders while loading
            Array(6)
              .fill()
              .map((_, i) => (
                <motion.div key={i}>
                  <MyAppointmentskeleton />
                </motion.div>
              ))
          ) : appointments && appointments.length === 0 ? (
            // Show no appointments component when loading is done and array is empty
            <motion.div>
              <NoAppointments />
            </motion.div>
          ) : (
            // Show appointments list when data exists
            appointments.map((item, index) => (
              <motion.div
                className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ${item.cancelled ? "opacity-50 cursor-not-allowed" : ""
                  } ${isLoading ? "cursor-not-allowed" : ""}`}
                key={item._id}
                variants={itemVariants}
                transition={{ type: "spring" }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <img
                    className="w-32 bg-indigo-50 sm:h-32 object-cover object-top"
                    src={item.docData.image}
                    alt=""
                  />
                </motion.div>

                {/* Details */}
                <motion.div
                  className="flex-1 text-sm text-zinc-600"
                  variants={containerVariants}
                >
                  <motion.p
                    className="text-neutral-800 font-semibold"
                    variants={itemVariants}
                  >
                    {item.docData.name}
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    {item.docData.speciality}
                  </motion.p>
                  <motion.p
                    className="text-neutral-800 font-medium mt-1"
                    variants={itemVariants}
                  >
                    Address :
                  </motion.p>
                  <motion.p className="text-xs" variants={itemVariants}>
                    {item.docData.address.line1}
                  </motion.p>
                  <motion.p className="text-xs" variants={itemVariants}>
                    {item.docData.address.line2}
                  </motion.p>
                  <motion.p className="text-sm mt-1" variants={itemVariants}>
                    <span className="text-xs text-neutral-700 font-medium">
                      Date & Time :{" "}
                    </span>
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </motion.p>
                </motion.div>
                <div></div>
                {/* Buttons */}
                <motion.div
                  className="flex flex-col gap-2 justify-end"
                  variants={containerVariants}
                >
                  {!item.cancelled && item.payment && (
                    <button className="sm:min-w-48 py-2 border cursor-not-allowed bg-indigo-50 border-green-500 rounded text-green-500 ">
                      Paid
                    </button>
                  )}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <motion.button
                      className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      disabled={isLoading}
                      onClick={() => handleOpenPaymentModal(item)}
                    >
                      Pay Online
                    </motion.button>
                  )}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <motion.button
                      className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => cancelAppointment(item._id)}
                      disabled={isLoading}
                    >
                      Cancel appointment
                    </motion.button>
                  )}
                  {item.cancelled && (
                    <motion.button className="sm:min-w-48 py-2 border cursor-not-allowed border-red-500 rounded text-red-500 ">
                      Appointment cancelled
                    </motion.button>
                  )}
                  {item.isCompleted && (
                    <>
                      <motion.button className="sm:min-w-48 py-2 border cursor-not-allowed border-green-500 rounded text-green-500 ">
                        Appointment completed
                      </motion.button>
                      {!reviewedAppointments.includes(item._id) ? (
                        <motion.button
                          onClick={() => handleAddReview(item)}
                          className="sm:min-w-48 py-2 border border-primary rounded text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          Add Review
                        </motion.button>
                      ) : (
                        <motion.button
                          className="sm:min-w-48 py-2 border cursor-not-allowed bg-gray-100 border-gray-300 rounded text-gray-500"
                          disabled
                        >
                          Review Submitted
                        </motion.button>
                      )}
                    </>
                  )}
                </motion.div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && currentAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsPaymentModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>

              <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-md">
                <img
                  src={currentAppointment.docData.image}
                  alt={currentAppointment.docData.name}
                  className="w-16 h-16 object-cover rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{currentAppointment.docData.name}</p>
                  <p className="text-sm text-gray-600">{currentAppointment.docData.speciality}</p>
                  <p className="text-sm font-medium mt-1">
                    Fee: ₹{currentAppointment.amount}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => makePayment(currentAppointment._id)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Confirm Payment'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsReviewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Add Review</h3>

              {currentAppointment && (
                <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-md">
                  <img
                    src={currentAppointment.docData.image}
                    alt={currentAppointment.docData.name}
                    className="w-16 h-16 object-cover rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{currentAppointment.docData.name}</p>
                    <p className="text-sm text-gray-600">{currentAppointment.docData.speciality}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <p className="text-xs text-gray-500 mb-2">Click on the left half of a star for half rating or right half for full rating</p>
                  <StarRating rating={rating} setRating={setRating} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    rows="4"
                    placeholder="Share your experience with the doctor..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitReview}
                  disabled={isLoading || rating <= 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MyAppointments;