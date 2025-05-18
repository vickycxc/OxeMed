import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const ConsultationSummary = sequelize.define(
  "consultation_summary",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    chiefComplaint: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    medicationExplanation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    diagnosisExplanation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
