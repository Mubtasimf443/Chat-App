/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import mongoose from 'mongoose';


const MessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['text', 'image', 'pdf', 'emoji'], default: 'text' },
  content: String,
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  createdAt: { type: Date, default: Date.now }
});

export const Message= mongoose.model('Message', MessageSchema);
