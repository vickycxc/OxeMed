import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const Diagnosis = sequelize.define(
  "diagnosis",
  {
    consultationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diagnosisType: {
      type: DataTypes.ENUM(
        "Diagnosis Primer",
        "Diagnosis Sekunder",
        "Diagnosis Tambahan"
      ),
      allowNull: false,
    },
    isProvosional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
