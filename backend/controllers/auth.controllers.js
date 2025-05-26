/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { request, response } from "express";
import vine, { errors } from '@vinejs/vine';

class AuthController {
    constructor() {

    }

    async auth(req = request , res = response ) {
        try {
            let emailValidation = vine.string().email().minLength(7).maxLength(25).trim();
            
            let validatedData = vine.validate({ schema : email , data : req.body.email });

            
            
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

    async verify(req = request , res = response ) {
        try {
            let schema = vine.object({
                email: vine.string().email().minLength(7).maxLength(25).trim(),
                auth_token : vine.string().regex(/^[a-zA-Z0-9_.-]+$/).minLength(512).maxLength(512)
            });

            let validatedData = vine.validate({schema  , data : req.body });
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
    }



    getInstance() {
        return AuthController();
    }
}