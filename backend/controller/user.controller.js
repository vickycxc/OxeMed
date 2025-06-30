import { User, ConsultationSummary } from "../models/index.js";

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

export const getPatient = async (req, res) => {
  const { id: patientId } = req.params;
  try {
    const patient = await User.findByPk(patientId, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "role"],
      },
    });
    res.status(200).json(patient);
  } catch (error) {
    console.log("Error di getPatient controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getSummaries = async (req, res) => {
  const patientId = req.user.id;
  try {
    const summaries = await ConsultationSummary.findAll({
      where: {
        patientId: patientId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(summaries);
  } catch (error) {
    console.log("Error di getDoctors controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// export const getPatients = async (req, res) => {
//   try {
//     const doctors = await User.findAll({
//       where: {
//         role: "Pasien",
//       },
//       order: [["createdAt", "DESC"]],
//       attributes: {
//         exclude: ["password", "createdAt", "updatedAt", "role"],
//       },
//     });
//     res.status(200).json(doctors);
//   } catch (error) {
//     console.log("Error di getDoctors controller", error);
//     res.status(500).json({
//       message: "Terjadi kesalahan pada server",
//     });
//   }
// };
