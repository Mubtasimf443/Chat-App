/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { connect } from "mongoose";
import { DB_URL } from "./env.js";

export default async function connectDB() {
    await connect(DB_URL)
        .then(() => console.log('Database Connected'))
        .catch(e => console.error(e))
}