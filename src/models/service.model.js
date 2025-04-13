import mongoose, { Schema } from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    createServiceInput:
 *      type: object
 *      required:
 *        - title
 *        - duration
 *        - cost
 *      properties:
 *        title:
 *          type: string
 *        icon:
 *          type: string
 *        description:
 *          type: string
 *        duration:
 *          type: string
 *        bufferTime:
 *          type: string
 *        cost:
 *          type: string
 *        team:
 *          type: object
 *        hidden:
 *          type: string
 *    ServiceResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        icon:
 *          type: string
 *        description:
 *          type: string
 *        duration:
 *          type: string
 *        bufferTime:
 *          type: string
 *        cost:
 *          type: string
 *        team:
 *          type: object
 *        hidden:
 *          type: string
 */
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
