import { Doctor } from "../models/index.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      limit: 4,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error di getDoctors controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
export const getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.params;
  try {
    const doctors = await Doctor.findAll({
      where: {
        specialization: specialization,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(doctors);
  } catch (error) {
    console.log("Error di getDoctorsBySpecialization controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
