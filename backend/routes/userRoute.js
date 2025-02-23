import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

// user router
const userRouter = express.Router();

// registering a user route
userRouter.post("/register", registerUser);

// login a user route
userRouter.post("/login", loginUser);

// get user profile route
userRouter.get("/getProfile", authUser, getProfile);

// update user profile route
userRouter.post("/updateProfile", upload.single("image"), authUser, updateProfile);

// book an appointment route
userRouter.post("/bookAppointment", authUser, bookAppointment);

export default userRouter;
