/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { request, response, Router } from "express";

const router = Router() ;

router.get('/details', function (req = request, res = response) {
    try {
        return res.status(200).json({ success: true, data: req.userInfo });
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