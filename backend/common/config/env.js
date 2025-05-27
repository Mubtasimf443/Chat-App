/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */


import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DROPBOX_API_ACCESS_TOKEN = process.env.DROPBOX_API_ACCESS_TOKEN;
export const DB_URL = process.env.DB_URL;

// SMTP Configuration
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USERNAME = process.env.SMTP_USERNAME;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

// SERVER
export const SERVER_EMAIL = process.env.SERVER_EMAIL;
export const SERVER_NAME = process.env.SERVER_NAME;