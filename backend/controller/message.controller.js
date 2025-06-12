import { Op } from "sequelize";
import { Message } from "../models/index.js";
import cloudinary from "../lib/cloudinary.js";

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const { id: userId } = req.user;

    const messages = await Message.findAll({
      where: {
        receiverId: { [Op.or]: [userId, userToChatId] },
        senderId: { [Op.or]: [userId, userToChatId] },
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error di getMessages controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { message, image } = req.body;
    const { id: senderId } = req.user;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
      console.log("🚀 ~ sendMessage ~ imageUrl:", imageUrl);
    }

    const data = await Message.create({
      senderId,
      receiverId,
      message,
      imageUrl: imageUrl,
    });

    res.status(201).json({
      message: "Pesan berhasil dikirim",
      data: data.dataValues,
    });
  } catch (error) {
    console.log("Error di sendMessage controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
