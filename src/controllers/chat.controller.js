import { Chat } from "../models/group.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getContacts = asyncHandler(async (req, res) => {
  try {
    const allUser = await User.find({}, "name email");

    if (!allUser.length) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No contacts found"));
    }

    res.status(200).json(new ApiResponse(200, allUser, "Your Contacts"));
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json(
        new ApiResponse(500, null, "An error occurred while fetching contacts")
      );
  }
});

const getChats = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  //   const chats = await Chat.find();

  const isSelfChat = userId === req.user._id.toString();

  let chats = await Chat.find({
    participants: {
      $all: isSelfChat ? [req.user._id] : [req.user._id, userId],
    },
  }).populate({
    path: "participants",
    select: "_id email name",
  });

  if (chats.length === 0) {
    const participants = isSelfChat
      ? [req.user._id, req.user._id]
      : [req.user._id, userId];
    chats = await Chat.create({
      participants: participants,
    });
    res.status(200).json(new ApiResponse(200, [chats], "All Chats"));
    return;
  }

  res.status(200).json(new ApiResponse(200, chats, "All Chats"));
});

const deleteChat = asyncHandler(async (req, res) => {
  const chatId = req.params.chatId;

  const result = await Chat.findByIdAndDelete(chatId);

  console.log(result);

  res.status(200);
});

export { getContacts, getChats, deleteChat };
