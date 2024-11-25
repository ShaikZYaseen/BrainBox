import * as dotenv from "dotenv";
import connectDb from "./DB/config";
import express from "express";

import contentRouter from "./Routes/content";
import userRouter from "./Routes/user";

dotenv.config();

const app = express();
connectDb();
app.use(express.json());

app.use("/api/v1/user",userRouter)
app.use("/api/v1/content",contentRouter)

app.listen(process.env.PORT || 8080,()=>{
    console.log("listening to port 8080")
})