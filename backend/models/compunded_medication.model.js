import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const CompoundedMedication = sequelize.define("compounded_medication", {
  prescriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
