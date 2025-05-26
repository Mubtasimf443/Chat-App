/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import moduleName from 'mongoose'

const AssetSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'pdf'], required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export const Asset = mongoose.model('Asset', AssetSchema);
