import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    let temp = new ApiError(400, "Invalid ObjectId format");
    return res.status(400).json({ ...temp, message: temp.message });
  }

  const messages = await Message.find({ chat: chatId });

  return res.status(200).json(new ApiResponse(200, messages, "All Messages"));
});

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { chatId, senderId, message, type, media } = req.body;

    const newMessage = await Message.create({
      chat: chatId,
      sender: senderId,
      message,
      type,
      media,
      status: "sent",
    });

    res.status(200).json(new ApiResponse(200, newMessage, "Message Sent"));
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(new ApiError(400, "Invalid request data"));
    }
    res.status(500).json({ error: "Something went wrong" });
  }
});

export { getMessages, sendMessage };
