import express from "express";
import { addContent,deleteContent,getContent,shareContent,accessSharedContent } from "../Controllers/content.js";

const contentRouter = express.Router();

contentRouter.post("/content", addContent);
contentRouter.delete("/content/:id", deleteContent);
contentRouter.get("/content", getContent);
contentRouter.get("/content/share/:id", shareContent); 
contentRouter.get("/share/:id", accessSharedContent); 

export default contentRouter;
