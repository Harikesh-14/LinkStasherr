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
}, {
  timestamps: true
});

const linkModel = model<link>('link', linkSchema);

export default linkModel;