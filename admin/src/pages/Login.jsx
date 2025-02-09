import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        // Add doctor login logic here
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  return (
    <form
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-4"
      onSubmit={onSubmitHandler}
    >
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 bg-white border border-gray-300 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          {state} <span className="text-primary">Login</span>
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 mb-4 text-white bg-primary rounded hover:bg-primary/90 transition duration-200 cursor-pointer"
        >
          Login
        </button>
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
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
}

export default Login;