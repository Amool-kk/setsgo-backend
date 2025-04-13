import mongoose, { Schema } from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    createBrand:
 *      type: object
 *      required:
 *        - name
 *        - phoneNumber
 *        - brandURL
 *      properties:
 *        name:
 *          type: string
 *          deafult: abc
 *        phoneNumber:
 *          type: string
 *          deafult: 1231231231
 *        brandURL:
 *          type: string
 *          deafult: abc.setnext.app
 *        description:
 *          type: string
 *          deafult: about your brand
 *        admin:
 *          type: string
 *          deafult: kdfioshfiouh3hr4r89fiosndf
 *        services:
 *          type: object
 *        team:
 *          type: object
 *        timeZone:
 *          type: string
 *          deafult: india
 *        currency:
 *          type: string
 *          deafult: INR
 *        logoURL:
 *          type: string
 *          deafult: abc.png
 *        brandColor:
 *          type: string
 *          deafult: white
 *        industry:
 *          type: string
 *          deafult: Auto
 *        location:
 *          type: object
 *        business_hours:
 *          type: object
 *    CreateBrandResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          deafult: abc
 *        phoneNumber:
 *          type: string
 *          deafult: 1231231231
 *        brandURL:
 *          type: string
 *          deafult: abc.setnext.app
 *        description:
 *          type: string
 *          deafult: about your brand
 *        admin:
 *          type: string
 *          deafult: kdfioshfiouh3hr4r89fiosndf
 *        services:
 *          type: object
 *        team:
 *          type: object
 *        timeZone:
 *          type: string
 *          deafult: india
 *        currency:
 *          type: string
 *          deafult: INR
 *        logoURL:
 *          type: string
 *          deafult: abc.png
 *        brandColor:
 *          type: string
 *          deafult: white
 *        industry:
 *          type: string
 *          deafult: Auto
 *        location:
 *          type: object
 *        business_hours:
 *          type: object
 */
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
    unique: true,
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
