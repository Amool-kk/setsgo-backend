import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
  title: {
    type: String,
    sparse: true,
    required: true,
  },
  icon: {
    type: String,
    sparse: true,
  },
  description: {
    type: String,
    sparse: true,
  },
  duration: {
    type: String,
    sparse: true,
    required: true,
  },
  bufferTime: {
    type: String,
    sparse: true,
  },
  cost: {
    type: String,
    sparse: true,
    required: true,
  },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  hidden: {
    type: Boolean,
    default: false,
    sparse: true,
  },
});

export const Service = mongoose.model("Service", serviceSchema);
