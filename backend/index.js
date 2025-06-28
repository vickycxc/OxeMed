import authRoutes from "./routes/auth.route.js";
import consultationRoutes from "./routes/consultation.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import iotRoutes from "./routes/iot.route.js";
import express from "express";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { app, server } from "./lib/socket.js";

config();
const port = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://app.oxemed.live", "http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/iot", iotRoutes);
server.listen(port, () => {
  console.log(`Listening on port ${port}`);

  connectDB();
});
