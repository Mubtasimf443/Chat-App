/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */


import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DROPBOX_API_ACCESS_TOKEN = process.env.DROPBOX_API_ACCESS_TOKEN;
export const DB_URL = process.env.DB_URL;