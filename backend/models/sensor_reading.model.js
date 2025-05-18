import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const SensorReading = sequelize.define("sensor_reading", {
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  spo2: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pulse: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
