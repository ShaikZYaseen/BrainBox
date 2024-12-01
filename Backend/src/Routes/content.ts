import express from "express";
import { addContent,deleteContent,getContent,shareContent,accessSharedContent } from "../Controllers/content";
import { userMiddleware } from "../Common/authMiddleware";

const contentRouter = express.Router();

contentRouter.post("/add-content",userMiddleware, addContent);
contentRouter.delete("/delete-content/:id",userMiddleware, deleteContent);
contentRouter.get("/get-content", userMiddleware, getContent);
contentRouter.get("/share-content/share/:id", userMiddleware, shareContent); 
contentRouter.get("/share/:id",userMiddleware, accessSharedContent); 

export default contentRouter;
