import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const Prescription = sequelize.define(
  "prescription",
  {
    consultationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompounded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compoundingMethod: {
      type: DataTypes.ENUM("Injeksi", "Kapsul", "Puyer", "Salep", "Sirup"),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
