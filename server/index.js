import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
import { UserRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", UserRouter);

mongoose.connect(
  "mongodb+srv://mharmilap:f4DADFhNCMrS0n2L@cluster0.m1hiamw.mongodb.net/authenticate"
);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
