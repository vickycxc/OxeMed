import authRoutes from "./routes/auth.route.js";
import consultationRoutes from "./routes/consultation.route.js";
import messageRoutes from "./routes/message.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import express from "express";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();
const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/doctors", doctorRoutes);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);

  connectDB();
});
