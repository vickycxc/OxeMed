import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const DoctorSchedule = sequelize.define(
  "doctor_schedule",
  {
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM(
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum'at",
        "Sabtu",
        "Minggu"
      ),
      allowNull: false,
    },
    timeStart: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    timeEnd: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    consultationFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
