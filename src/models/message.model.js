import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String },
    media: { type: String },
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "document"],
      default: "text",
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
