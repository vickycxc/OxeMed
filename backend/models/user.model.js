import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const User = sequelize.define(
  "user",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
      // allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Pasien", "Dokter"),
      allowNull: false,
    },
    drugAllergies: {
      type: DataTypes.STRING,
      // allowNull: true,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
