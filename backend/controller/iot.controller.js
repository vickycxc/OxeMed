import { SensorReading } from "../models/index.js";

export const addSensorReading = async (req, res) => {
  const { timestamp, spo2, pulse } = req.body;
  const userId = req.userId;
  try {
    await SensorReading.create({
      timestamp,
      spo2,
      pulse,
      userId,
    });
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
  const { userId } = req.params;
  try {
    const sensorReadings = await SensorReading.findAll({
      where: {
        userId: userId,
      },
      order: [["timestamp", "DESC"]],
    });
    res.status(200).json(sensorReadings);
  } catch (error) {
    console.log("Error di getSensorReadings controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
