import express from "express";
import {
  checkAuth,
  deleteAccount,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.post("/delete", protectRoute, deleteAccount);
router.get("/check", protectRoute, checkAuth);

export default router;
