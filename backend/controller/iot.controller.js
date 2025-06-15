import { SensorReading } from "../models/index.js";

export const addSensorReading = async (req, res) => {
  const { spo2, pulse } = req.body;
  const userId = req.userId;
  try {
    await SensorReading.create({
      timestamp: new Date(),
      spo2,
      pulse,
      userId,
    });
    console.log("🚀 ~ addSensorReading ~ userId:", userId);
    res
      .status(201)
      .json({ messages: "Pembacaan Sensor Baru Berhasil Ditambahkan" });
  } catch (error) {
    console.log("Error di addSensorReading controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getSensorReadings = async (req, res) => {
  // console.log("🚀 ~ getSensorReadings ~ req:", req);
  // const userId = req.user.id;
  // console.log("🚀 ~ getSensorReadings ~ userId:", userId);
  try {
    const sensorReadings = await SensorReading.findAll({
      order: [["timestamp", "ASC"]],
    });
    res.status(200).json(sensorReadings ? sensorReadings : []);
  } catch (error) {
    console.log("Error di getSensorReadings controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
