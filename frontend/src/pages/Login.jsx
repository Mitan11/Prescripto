import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

function Login() {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", name: "" };

    if (state === "Sign Up") {
      if (!name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      }
    }

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
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Signup successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

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
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-[300px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white"
      >
        <motion.div
          className="w-full mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-semibold text-gray-800"
            variants={itemVariants}
          >
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </motion.h2>

          <motion.div
            className="h-1 bg-primary mt-1"
            variants={underlineVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {state === "Sign Up" && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <label className="text-gray-700" htmlFor="name">
                Full Name
              </label>
              <motion.input
                className={`border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ${
                  errors.email ? "border-red-500" : "border-zinc-300"
                } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                placeholder="Enter your name"
                whileFocus={{ scale: 1.02 }}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="w-full" variants={itemVariants}>
          <label className="text-gray-700" htmlFor="email">
            Email
          </label>
          <motion.input
            className={`border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ${
              errors.email ? "border-red-500" : "border-zinc-300"
            } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            placeholder="Enter your email"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </motion.div>

        <motion.div className="w-full" variants={itemVariants}>
          <label className="text-gray-700" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <motion.input
              className={`border rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ${
                errors.email ? "border-red-500" : "border-zinc-300"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              placeholder="Enter your password"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.span
              className="absolute right-3 top-[55%] -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors hover:scale-110"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.span>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </motion.div>

        <motion.button
          className={`flex items-center justify-center gap-2 bg-primary text-white w-full py-2 rounded-md text-base hover:bg-primary-dark transition-colors ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
              <span>Logging in...</span>
            </>
          ) : state === "Sign Up" ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </motion.button>

        <motion.div className="w-full text-center" variants={itemVariants}>
          <p className="text-sm text-gray-600">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <motion.span
                  className="text-primary underline cursor-pointer"
                  onClick={() => {
                    setState("Login");
                    setName("");
                    setEmail("");
                    setPassword("");
                    setErrors({ email: "", password: "", name: "" });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login here
                </motion.span>
              </>
            ) : (
              <>
                Need an account?{" "}
                <motion.span
                  className="text-primary underline cursor-pointer"
                  onClick={() => {
                    setState("Sign Up");
                    setName("");
                    setEmail("");
                    setPassword("");
                    setErrors({ email: "", password: "", name: "" });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign up
                </motion.span>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}

export default Login;
