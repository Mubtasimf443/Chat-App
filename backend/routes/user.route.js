/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { request, response, Router } from "express";
import { authMiddleware } from "../common/middlewares/auth.middlewares.js";
import { User } from "../models/User.js";

const router = Router() ;

router.use(authMiddleware)
router.get('/details',async function (req = request, res = response) {
    try {
        let user =await User.findOne({ _id : req.userInfo._id } , 'name email phone avatar contacts blocked id createdAt')
        if (!user) return res.sendStatus(401)
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('[User Details Error]', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: null
        });
    }
})

export default router;