/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import mongoose from 'mongoose'
import {randomUUID} from 'crypto';


const AssetSchema = new mongoose.Schema({
  id : { type : String , default : randomUUID},
  type: { type: String, enum: ['image', 'pdf'], required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hostId : String ,
  createdAt: { type: Date, default: Date.now }
});

export const Asset = mongoose.model('Asset', AssetSchema);
