import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
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

    setIsLoading(true);
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login successful");
          navigate("/admin-dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);  
          toast.success("Login successful");
          navigate("/doctor-dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.8 } },
  };

  const stateChangeVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100vh] flex items-center justify-center "
      onSubmit={onSubmitHandler}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 m-auto items-start p-8 min-w-[300px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg bg-white"
      >
        <motion.div
          className="w-full mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={state}
                className="text-2xl font-semibold text-gray-800"
                variants={stateChangeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {state} <span className="text-primary">Login</span>
              </motion.h2>
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="h-1 bg-primary mt-1"
            variants={underlineVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>

        <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <motion.input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            placeholder="Enter your email"
            className={`w-full p-2 px-4 border focus:border-transparent ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            whileFocus={{ scale: 1.02 }}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </motion.div>

        <motion.div whileFocus={{ scale: 1.02 }} className="w-full">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <motion.input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              placeholder="Enter your password"
              className={`w-full p-2 px-4 border focus:border-transparent ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.span>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className={`w-full py-3 font-medium flex items-center justify-center space-x-2 text-white bg-primary focus:outline-none focus:bg-primary/90 rounded-md hover:bg-primary/90 transition-all duration-200 ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Login to Dashboard</span>
              <FaArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </motion.button>

        <p className="text-center text-sm md:text-base text-gray-600">
          {state === "Admin" ? (
            <>
              Switch to Doctor? 
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => {
                  setState("Doctor");
                  setEmail("");
                  setPassword("");
                  setErrors({ email: "", password: "" });
                }}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Switch to Admin? 
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => {
                  setState("Admin");
                  setEmail("");
                  setPassword("");
                  setErrors({ email: "", password: "" });
                }}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </motion.div>
    </motion.form>
  );
}

export default Login;
