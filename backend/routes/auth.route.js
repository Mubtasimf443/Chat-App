/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Router } from "express";
import { request, response } from "express";
import vine, { errors } from '@vinejs/vine';
import { TempSession } from "../models/TempSession.js";
import { User } from "../models/User.js";
import {randomBytes} from 'crypto'
import OptVerificationEmail from "../common/mails/auth.mail.js";
import { AuthSession } from "../models/AuthSession.js";

const router = Router();

router.post('/auth', async function (req = request, res = response) {
    try {
        let emailValidation = vine.string().email().minLength(7).maxLength(25).trim();

        let email = await vine.validate({ schema: emailValidation, data: req.body.email });

        let existUser = await User.findOne({ email });

        if (!existUser) existUser = await User.create({ email });

        let session = randomBytes(256).toString('hex').normalize();


        function GenerateOtp() {
            function giveOtp() {
                return Math.floor(Math.random() * 999999)
            }
            let otp = giveOtp()
            for (let i = 0; true; i++) {
                if (otp > 99999 && otp < 1000000) {
                    return otp;
                }
                else otp = giveOtp();
            }
        }

        otp = GenerateOtp();

        await OptVerificationEmail(email, otp);

        await TempSession.create({
            sessionToken: session,
            userId: existUser._id,
            expiresAt: new Date(Date.now() + 63 * 1000),
            session_value: otp,
        });

        return res.status(200).json({ data: { token: session } });

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(400).json({
                success: false,
                message: 'Invalid request parameters',
                error: error,
                data: null
            });
            return;
        }
        console.error('[Auth Error]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
}
);
router.post('/verify', async function (req = request, res = response) {
    try {
        let schema = vine.object({
            otp: vine.string().trim().regex(/^\d{6}$/),
            auth_token: vine.string().regex(/^[a-zA-Z0-9_.-]+$/).minLength(512).maxLength(512)
        });

        let { otp, auth_token } = await vine.validate({ schema, data: req.body });

        let session = await TempSession.findOne({ sessionToken: auth_token });

        if (!session) return res.sendStatus(403);

        if (session.session_value !== otp) return res.sendStatus(400);


        let bearerToken = randomBytes(64).toString('hex').normalize();
        let existingSession = await AuthSession.findOne({ user_id: session.userId });

        if (!existingSession) existingSession = new AuthSession({ token: bearerToken, user_id: session.userId });

        if (existingSession) {
            existingSession.token = bearerToken;
            existingSession.createdAt = new Date();
        }

        await existingSession.save();

        res.status(200).json({
            success: true,
            data: {
                bearerToken,
            },
            error: null,
            message: 'Authentication Successfull'
        })
        return;

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.error('[Auth Error]', error.message);
            res.status(400).json({
                success: false,
                message: 'Invalid request parameters',
                error: error,
                data: null
            });
            return;
        }
        console.error('[Auth Error]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
})
router.post('/loggout', async function (req = request, res = response) {
    try {
        let schema = vine.object({
            auth_token: vine.string().regex(/^[a-zA-Z0-9_.-]+$/).minLength(128).maxLength(128)
        });

        const { auth_token } = await vine.validate({ schema: schema, data: req.body });

        await AuthSession.findOneAndDelete({ token: auth_token });

        return res.sendStatus(200)
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.error('[Auth Error]', error.message);
            res.status(400).json({
                success: false,
                message: 'Invalid request parameters',
                error: error,
                data: null
            });
            return;
        }
        console.error('[Loggout Api error]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
});

export default router;