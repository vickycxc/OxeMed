import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db.js";

export const Message = sequelize.define(
  "message",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consultationId: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    replyTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    messageType: {
      type: DataTypes.ENUM(
        "Pesan",
        "Waktu Konsultasi",
        "Catatan Dokter",
        "Resep Digital"
      ),
      // allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);
