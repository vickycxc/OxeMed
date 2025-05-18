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
    const { consultationId, message, image, replyTo, messageType, messageId } =
      req.body;
    const { id: senderId } = req.user;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    await Message.create({
      consultationId,
      senderId,
      receiverId,
      message,
      image: imageUrl,
      replyTo,
      messageType,
      messageId,
    });

    res.status(201).json({
      message: "Pesan berhasil dikirim",
    });
  } catch (error) {
    console.log("Error di sendMessage controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
