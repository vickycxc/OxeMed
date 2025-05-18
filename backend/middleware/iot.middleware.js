import { User } from "../models/index.js";

export const validateDeviceApiKey = async (req, res, next) => {
  try {
    const apiKey = req.get("x-api-key");
    if (!apiKey) {
      return res
        .status(401)
        .json({ message: "Tidak Diizinkan - API Key Tidak Diberikan" });
    }

    const { id: userId } = await User.findOne({
      where: {
        apiKey: apiKey,
      },
      attributes: ["id"],
    });

    if (!userId) {
      console.log("🚀 ~ validateDeviceApiKey ~ userId:", userId);
      return res.status(401).json({
        message: "Tidak Diizinkan - API Key Tidak Valid",
      });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error("Error di validateDeviceApiKey middleware", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
