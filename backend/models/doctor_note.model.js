import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const DoctorNote = sequelize.define(
  "doctor_note",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    symptoms: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    advice: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
