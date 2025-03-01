import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

function AddDoctor() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [errors, setErrors] = useState({
    docImg: "",
    name: "",
    email: "",
    password: "",
    fees: "",
    degree: "",
    address1: "",
    address2: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      docImg: "",
      name: "",
      email: "",
      password: "",
      fees: "",
      degree: "",
      address1: "",
      address2: "",
      about: "",
    };

    // Image validation
    if (!docImg) {
      newErrors.docImg = "Doctor image is required";
      isValid = false;
    }

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Doctor name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Fees validation
    if (!fees.trim()) {
      newErrors.fees = "Fees is required";
      isValid = false;
    } else if (isNaN(fees) || Number(fees) <= 0) {
      newErrors.fees = "Invalid fee amount";
      isValid = false;
    }

    // Degree validation
    if (!degree.trim()) {
      newErrors.degree = "Education qualification is required";
      isValid = false;
    }

    // Address validation
    if (!address1.trim()) {
      newErrors.address1 = "Address line 1 is required";
      isValid = false;
    }
    if (!address2.trim()) {
      newErrors.address2 = "Address line 2 is required";
      isValid = false;
    }

    // About validation
    if (!about.trim()) {
      newErrors.about = "About doctor is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
        setSpeciality("General physician");
        setExperience("1 Year");
        setShowPassword(false);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  return (
    <form className="m-5 w-full" onSubmit={onSubmitHandler}>
      <motion.p
        className="mb-3 text-xl font-medium"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Add Doctor
      </motion.p>
      <motion.div
        className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[76vh] overflow-y-scroll shadow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Upload Section */}
        <motion.div
          className="flex items-center gap-4 mb-8 text-gray-500"
          variants={itemVariants}
        >
          <label htmlFor="doc-img" className="cursor-pointer">
            <motion.img
              className={`w-16 h-16 object-cover bg-gray-100 rounded-full border-2 border-dashed hover:border-primary transition-all ${
                errors.docImg ? "border-red-500" : "border-gray-300"
              } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor upload"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => {
              setDocImg(e.target.files[0]);
              if (errors.docImg) {
                setErrors({ ...errors, docImg: "" });
              }
            }}
            disabled={loading}
          />
          <p className="text-sm">
            Upload doctor <br /> picture
          </p>
          {errors.docImg && (
            <motion.p
              className="text-red-500 text-sm"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
            >
              {errors.docImg}
            </motion.p>
          )}
        </motion.div>

        {/* Form Fields */}
        <motion.div
          className="flex flex-col lg:flex-row items-start gap-10 text-gray-600"
          variants={containerVariants}
        >
          {/* Left Column */}
          <motion.div
            className="w-full lg:flex-1 flex flex-col gap-4"
            variants={containerVariants}
          >
            {/* Doctor Name */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label className="text-sm font-medium">Doctor name</label>
              <motion.input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors({ ...errors, name: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.name && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Doctor Email */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label className="text-sm font-medium">Doctor email</label>
              <motion.input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.email && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Doctor Password */}
            <motion.div
              className="flex flex-col gap-1 relative"
              variants={itemVariants}
            >
              <label className="text-sm font-medium">Doctor password</label>
              <motion.input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.password && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.password}
                </motion.p>
              )}
              {/* Eye Icon for Toggle */}
              <motion.button
                type="button"
                className="absolute right-3 top-9.5 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </motion.div>

            {/* Experience */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label className="text-sm font-medium">Experience</label>
              <motion.select
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.experience ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                  if (errors.experience) {
                    setErrors({ ...errors, experience: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year{i > 0 ? "s" : ""}
                  </option>
                ))}
              </motion.select>
              {errors.experience && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.experience}
                </motion.p>
              )}
            </motion.div>

            {/* Fees */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label className="text-sm font-medium">Fees</label>
              <motion.input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.fees ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                type="number"
                placeholder="Fees"
                value={fees}
                onChange={(e) => {
                  setFees(e.target.value);
                  if (errors.fees) {
                    setErrors({ ...errors, fees: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.fees && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.fees}
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="w-full lg:flex-1 flex flex-col gap-4"
            variants={containerVariants}
          >
            {/* Speciality */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label className="text-sm font-medium">Speciality</label>
              <motion.select
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.speciality ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                value={speciality}
                onChange={(e) => {
                  setSpeciality(e.target.value);
                  if (errors.speciality) {
                    setErrors({ ...errors, speciality: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </motion.select>
              {errors.speciality && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.speciality}
                </motion.p>
              )}
            </motion.div>

            {/* Education */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label className="text-sm font-medium">Education</label>
              <motion.input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.degree ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                type="text"
                placeholder="Education"
                value={degree}
                onChange={(e) => {
                  setDegree(e.target.value);
                  if (errors.degree) {
                    setErrors({ ...errors, degree: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.degree && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.degree}
                </motion.p>
              )}
            </motion.div>

            {/* Address */}
            <motion.div className="flex flex-col gap-3" variants={itemVariants}>
              <label className="text-sm font-medium">Address</label>
              <motion.input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.address1 ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                type="text"
                placeholder="Address1"
                value={address1}
                onChange={(e) => {
                  setAddress1(e.target.value);
                  if (errors.address1) {
                    setErrors({ ...errors, address1: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.address1 && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.address1}
                </motion.p>
              )}
              <motion.input
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.address2 ? "border-red-500" : "border-gray-300"
                } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                type="text"
                placeholder="Address2"
                value={address2}
                onChange={(e) => {
                  setAddress2(e.target.value);
                  if (errors.address2) {
                    setErrors({ ...errors, address2: "" });
                  }
                }}
                disabled={loading}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.address2 && (
                <motion.p
                  className="text-red-500 text-sm"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {errors.address2}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* About Doctor */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium mt-4 text-gray-500 mb-2">
            About Doctor
          </label>
          <motion.textarea
            className={`w-full px-4 pt-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-gray-600 ${
              errors.about ? "border-red-500" : "border-gray-300"
            } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
            rows={5}
            placeholder="Write about doctor"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
              if (errors.about) {
                setErrors({ ...errors, about: "" });
              }
            }}
            disabled={loading}
            whileFocus={{ scale: 1.01 }}
          />
          {errors.about && (
            <motion.p
              className="text-red-500 text-sm"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
            >
              {errors.about}
            </motion.p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className={`bg-primary focus:bg-primary/90 focus:outline-none px-10 py-3 mt-4 text-white rounded-full hover:bg-primary/90 font-medium transition-all flex items-center justify-center space-x-2 ${
            loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
              <span>Adding Doctor...</span>
            </>
          ) : (
            "Add Doctor"
          )}
        </motion.button>
      </motion.div>
    </form>
  );
}

export default AddDoctor;
