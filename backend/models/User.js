/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique: true,
    required: true,
    index : true , 
  },
  name: String,
  avatar: String,
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export const User= mongoose.model('User', UserSchema);
