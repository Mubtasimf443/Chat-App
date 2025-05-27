/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import {createServer } from 'http';
import express from 'express'
import { Server } from 'socket.io';
import { PORT } from './config/env.js';
import connectDB from './config/connectDb.js';
import { cors } from './config/cors.js';
import { authController } from './controllers/auth.controllers.js';
import { authMiddleware } from './common/middlewares/auth.middlewares.js';
import { userController } from './controllers/User.controller.js';

const app = express();

await connectDB();
app.use(cors);
app.use(express.json());


app.post('/api/auth', authController.auth);
app.post('/api/auth/verify', authController.verify);
app.post('/api/auth/loggout', authController.loggout);
app.post('/api/user/details',authMiddleware , userController.getDetails);



const server = createServer(app).listen(PORT);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['POST', 'GET', 'DELETE', 'PUT']
    }
});