/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  name: String,
  phone: String,
  id: {
    type: String,
    default: function () {
      let arr = 'qwer1ty2uio3plk4jh5gf6dsa7zx8cv9b0nmqwer1ty2uio3plk4jh5gf6dsa7zx8cv9b0nm';
      let id = '';
      for (let i = 0; i < 10; i++) id += arr.at(Math.floor(Math.random() * arr.length));
      return id.toUpperCase();
    }
  },
  avatar: { type: String, default: 'https://res.cloudinary.com/dyptu4vd2/image/upload/v1748022824/ahxfhq76i0auizajvl6h.png', required: true },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export const User = mongoose.model('User', UserSchema);
