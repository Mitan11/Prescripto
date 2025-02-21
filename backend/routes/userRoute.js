import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

// user router
const userRouter = express.Router();

// registering a user route
userRouter.post("/register", registerUser);

// login a user route
userRouter.post("/login", loginUser);

export default userRouter;
