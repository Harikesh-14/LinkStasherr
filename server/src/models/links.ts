import { Schema, model } from 'mongoose';
import { link } from '../types';

const linkSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  modifiedUrl: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
  isGuest: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const linkModel = model<link>('link', linkSchema);

export default linkModel;