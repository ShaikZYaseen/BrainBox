import * as dotenv from "dotenv";
import connectDb from "./DB/config";
import express from "express";
import cors from "cors"; // Importing cors

import contentRouter from "./Routes/content";
import userRouter from "./Routes/user";

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin:'http://localhost:5173/',
    credentials:true
}

app.use(cors(corsOptions));


// Set up the routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);

// Start the server
app.listen(process.env.PORT || 3000, () => {
connectDb();
  console.log("Listening on port 3000");
});
