import * as dotenv from "dotenv";
import connectDb from "./DB/config";
import express from "express";

dotenv.config();

const app = express();
connectDb();
app.use(express.json());

app.listen(process.env.PORT || 8080,()=>{
    console.log("listening to port 8080")
})