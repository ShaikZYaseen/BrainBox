import express from "express";
import { addContent,deleteContent,getContent } from "../Controllers/content";
import { userMiddleware } from "../Common/authMiddleware";

const contentRouter = express.Router();


contentRouter.route("/contents")
.get(userMiddleware,getContent);

contentRouter.route("/content").post(addContent)
contentRouter.route("/content/:id").delete(userMiddleware,deleteContent);

export default contentRouter;