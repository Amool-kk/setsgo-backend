import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    sparse: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  timeZone: {
    type: String,
    sparse: true,
  },
  currency: {
    type: String,
    sparse: true,
  },
  logoURL: {
    type: String,
    sparse: true,
  },
  brandURL: {
    type: String,
    unique: true,
    required: true,
    sparse: true,
  },
  brandColor: {
    type: String,
    sparse: true,
    default: "white",
  },
  industry: {
    type: String,
    sparse: true,
  },
  location: {
    street: {
      type: String,
      sparse: true,
    },
    city: {
      type: String,
      sparse: true,
    },
    state: {
      type: String,
      sparse: true,
    },
    postal_code: {
      type: String,
      sparse: true,
    },
    country: {
      type: String,
      sparse: true,
    },
  },
  business_hours: [{ day: String, open: String, close: String }],
});

export const Brand = mongoose.model("Brand", brandSchema);
