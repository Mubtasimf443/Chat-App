/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import {createServer } from 'http';
import express from 'express'
import { Server } from 'socket.io';
import { PORT } from './common/config/env.js';
import connectDB from './common/config/connectDb.js';
import { cors } from './common/config/cors.js';

import assetRouter from './routes/asset.route.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

const app = express();

await connectDB();
app.use(cors);
app.use(express.json());

app.use('/api/auth' ,authRouter );
app.use('/api/asset' ,assetRouter );
app.use('/api/user' ,userRouter );

const server = createServer(app).listen(PORT, () => console.log('Server Started Alhamdulillah at port ', PORT));

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['POST', 'GET', 'DELETE', 'PUT']
    }
});