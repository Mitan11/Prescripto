import React, { useState } from "react";

function Login() {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form className="min-h-[100vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign up" : "Login"} to book appointment
        </p>

        {state === "Sign Up" ? (
          <div className="w-full">
            <label className="" htmlFor="name">
              Full Name
            </label>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              id="name"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        ) : (
          ""
        )}

        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            id="email"
            value={name}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            id="password"
            value={name}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account ?{" "}
            <span
              class="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create an new account{" "}
            <span
              class="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Sign Up");
              }}
            >
              click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
