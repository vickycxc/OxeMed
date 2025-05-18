import express from "express";
import {
  addConsultation,
  addDoctorNote,
  addPrescription,
  getConsultations,
  summarizeConsultation,
  updateConsultation,
} from "../controller/consultation.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addConsultation);
router.put("/", protectRoute, updateConsultation);
router.get("/", protectRoute, getConsultations);
router.post("/:id/add-doctor-note", protectRoute, addDoctorNote);
router.post("/:id/add-prescription", protectRoute, addPrescription);
router.post("/:id/summarize", protectRoute, summarizeConsultation);

export default router;
