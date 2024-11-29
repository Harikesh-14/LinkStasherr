import { Schema, model } from 'mongoose';

import { user } from '../types';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const userModel = model<user>('user', userSchema);

export default userModel;