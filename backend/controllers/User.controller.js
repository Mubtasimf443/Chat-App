/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { request, response } from "express";

class UserController {
    constructor() {

    }

    getDetails(req = request , res= response) {
        try {
            return res.status(200).json({ success : true , data : req.userInfo}) ;
        } catch (error) {
            console.error('[User Details Error]', error);
            return res.status(500).json({
               success: false,
               message: 'Internal server error',
               data: null
            });
        }
    }

    static getIntance() {
        return new UserController();
    }
}

export const userController = UserController.getIntance();