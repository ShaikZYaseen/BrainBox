import express from "express";

import { loginController,signupController,isLoggedin, logoutController } from "../Controllers/auth";
import { userMiddleware } from "../Common/authMiddleware";
const userRouter = express.Router();

userRouter
.route("/signup").post(signupController);


userRouter
.route("/login").post(loginController);

userRouter
.route("/isloggedin").get(isLoggedin)

userRouter
.route("/logout").post(userMiddleware,logoutController)


export default userRouter;