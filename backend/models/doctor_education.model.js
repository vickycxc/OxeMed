import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const DoctorEducation = sequelize.define(
  "doctor_education",
  {
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    educationLevel: {
      type: DataTypes.ENUM(
        "Sarjana",
        "Profesi",
        "Spesialis",
        "Subspesialis",
        "Magister",
        "Doktor"
      ),
      allowNull: false,
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
