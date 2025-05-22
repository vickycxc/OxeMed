import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Tidak Diizinkan - Token Tidak Diberikan" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token", decoded);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Tidak Diizinkan - Token Tidak Valid" });
    }

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Tidak Diizinkan - Pengguna Tidak Ditemukan" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error di protectRoute middleware", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
