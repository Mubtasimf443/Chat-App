/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ InshaAllah
*/
import nodemailer from 'nodemailer'
import {SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USERNAME ,} from './env.js';


const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
        ciphers:'SSLv3'
    },
    connectionTimeout: 10000, 
    dnsTimeout : 3000,
    socketTimeout : 3000,
    greetingTimeout : 3000
})



export default transporter; 