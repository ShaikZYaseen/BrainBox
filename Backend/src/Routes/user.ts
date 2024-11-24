import express from "express";

import { loginController,signupController } from "../Controllers/auth";
const userRouter = express.Router();

userRouter
.route("/signup").post(signupController);


userRouter
.route("/login").post(loginController);


export default userRouter;