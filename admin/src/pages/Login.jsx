import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);

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
        } else {
          toast.error(data.message);
        }
      } else {
        // Add doctor login logic here
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-4"
      onSubmit={onSubmitHandler}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 bg-white border border-gray-300 rounded-xl shadow-lg"
      >
        <motion.div
          className="mb-8 text-center relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {state} <span className="text-primary">Login</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-2 h-1 bg-gradient-to-r from-pink-600 to-blue-600 mx-auto rounded-full"
          />
        </motion.div>

        <motion.div whileFocus={{ scale: 1.02 }} className="mb-4">
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
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            whileFocus={{ scale: 1.01 }}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </motion.div>

        <motion.div whileFocus={{ scale: 1.02 }} className="mb-6 relative">
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
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ${
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
          className={`w-full py-3 mb-4 font-medium flex items-center justify-center space-x-2 text-white bg-primary focus:outline-none focus:bg-primary/90 rounded-xl hover:bg-primary/90 transition-all duration-200 ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
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
              Doctor Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
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
