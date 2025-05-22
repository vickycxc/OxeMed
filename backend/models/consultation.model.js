import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const Consultation = sequelize.define(
  "consultation",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeEnd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nextConsultation: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Aktif", "Selesai", "Dijadwalkan", "Dibatalkan"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
