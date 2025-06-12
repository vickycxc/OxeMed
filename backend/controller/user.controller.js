import { User } from "../models/index.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: {
        role: "Dokter",
      },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "role"],
      },
    });
    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error di getDoctors controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getPatients = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: {
        role: "Pasien",
      },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "role"],
      },
    });
    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error di getDoctors controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
