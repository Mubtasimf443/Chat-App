/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import mongoose from 'mongoose';

const TempSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionToken: { type: String, required: true },
  session_value : String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

TempSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 63 });


export const TempSession = mongoose.model('TempSession', TempSessionSchema);