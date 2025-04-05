import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    isGroup: { type: Boolean, default: false },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    groupName: { type: String },
    groupIcon: { type: String },
    groupAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.model("Chat", groupSchema);
