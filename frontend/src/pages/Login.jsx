import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.8 } }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Your submission logic
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
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white"
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
                className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

          
        <motion.div 
          className="w-full"
          variants={itemVariants}
        >
          <label className="text-gray-700" htmlFor="email">
            Email
          </label>
          <motion.input
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div 
          className="w-full"
          variants={itemVariants}
        >
          <label className="text-gray-700" htmlFor="password">
            Password
          </label>
          <motion.input
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.button
          className="bg-primary text-white w-full py-2 rounded-md text-base hover:bg-primary-dark transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </motion.button>

        <motion.div 
          className="w-full text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-600">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <motion.span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Login")}
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
                  onClick={() => setState("Sign Up")}
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