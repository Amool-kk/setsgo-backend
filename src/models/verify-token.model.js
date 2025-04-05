import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 * 24,
  },
});

export const VerifyToken = mongoose.model("verifyToken", tokenSchema);
