import express from "express";
import { validateDeviceApiKey } from "../middleware/iot.middleware.js";
import {
  addSensorReading,
  getSensorReadings,
} from "../controller/iot.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", validateDeviceApiKey, addSensorReading);
router.get("/", protectRoute, getSensorReadings);

export default router;
