/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { request, response } from "express";
import vine from '@vinejs/vine'
import { AuthSession } from "../../models/AuthSession";


export async function authMiddleware(req = request, res = response, next) {
    try {
        const extractBearerToken = (header) => (!header || !header.startsWith('Bearer ')) ? null : header.slice(7);
        const token = extractBearerToken(req.headers['authorization']);
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is required'
            });
        }

        let validatedToken = await vine.validate({ schema: vine.string().regex(/^[a-zA-Z0-9_.-]+$/).minLength(128).maxLength(128), data: token });

        let session = await AuthSession.findOne({ token: validatedToken, createdAt: { $gt: new Date(Date.now() - (30 * 24 * 3600 * 1000)) } }).populate('user_id');

        if (!session) {
            return res.status(401).json({
                success: false,
                message: 'Token is Expired or Invalid'
            });
        }

        req.userInfo= session.user_id;
        next();
    } catch (error) {
        console.error('[Authentication Error]', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication Error',
            data: null
        });
    }
}

export async function socketAuthMiddleware(socket  , next) {
    try {
        const token = socket.handshake.auth.token ;

        if (!token) {
            console.log({ message: 'Authorization token is required' });
            next(new Error('Auth Error'))
        }

        let validatedToken = await vine.validate({ schema: vine.string().regex(/^[a-zA-Z0-9_.-]+$/).minLength(128).maxLength(128), data: token });

        let session = await AuthSession.findOne({ token: validatedToken, createdAt: { $gt: new Date(Date.now() - (30 * 24 * 3600 * 1000)) } }).populate('user_id');

        if (!session) {
            console.log({ message: 'Token is Expired or Invalid' });
            next(new Error('Auth Error'))
        }

        socket.userInfo= session.user_id;
        next();
    } catch (error) {
       console.error(error);
       next(new Error('Auth Error'))
    }
}

