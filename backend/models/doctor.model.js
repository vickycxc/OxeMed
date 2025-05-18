import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const Doctor = sequelize.define(
  "doctor",
  {
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sipNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.ENUM(
        "Dokter Umum",
        "Spesialis Mata",
        "Spesialis Anak",
        "Spesialis Kulit & Kelamin",
        "Spesialis THT",
        "Spesialis Kandungan & Kebidanan",
        "Psikiater",
        "Spesialis Paru",
        "Spesialis Penyakit Dalam",
        "Psikolog Klinis",
        "Dokter Hewan",
        "Dokter Gigi",
        "Spesialis Saraf",
        "Spesialis Andrologi & Urologi",
        "spesialis Gizi",
        "Spesialis Bedah",
        "spesialis Jantung",
        "spesialis Rehabilitasi Medik"
      ),
      allowNull: false,
    },
    practiceStartYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    practiceLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    practiceCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offScheduleFee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
