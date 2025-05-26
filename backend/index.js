/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import {createServer } from 'http';
import express from 'express'
import { Server } from 'socket.io';
import { PORT } from './config/env.js';
import connectDB from './config/connectDb.js';
import { cors } from './config/cors.js';

const app = express();



await connectDB();
app.use(cors);
app.use(express.json());


const server = createServer(app).listen(PORT);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['POST', 'GET', 'DELETE', 'PUT']
    }
});