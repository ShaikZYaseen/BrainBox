import * as dotenv from "dotenv";
import connectDb from "./DB/config";
import express from "express";
import cors from "cors";

import contentRouter from "./Routes/content";
import userRouter from "./Routes/user";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",  // The frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true,  // Allow cookies and credentials
};

app.use(cors(corsOptions)); // Apply the CORS middleware with configuration
app.options('*', cors(corsOptions));  // This ensures preflight requests are handled
app.use(express.json());

connectDb();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("listening on port 8080");
});
