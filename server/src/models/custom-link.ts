import { Schema, model } from "mongoose";
import type { customLink } from "../types";

const customLinkSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  modifiedUrl: {
    type: String,
    required: true,
  },
  click: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, {
  timestamps: true,
})

const customLinkModel = model<customLink>('customLink', customLinkSchema);

export default customLinkModel;