/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        token: String,
        user_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps: true
    }
);

export const AuthSession = mongoose.model('AuthSession' , schema)