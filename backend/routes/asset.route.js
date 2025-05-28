/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { errors as vineErrors } from "@vinejs/vine";
import { request, response, Router } from "express";
import { upload } from "../common/config/multer.js";
import uploadFile from "../common/utils/uploadFile.js";
import { Asset } from "../models/Asset.js";

const router = Router();

router.post('/upload', upload.single('file'),async function (req = request , res = response) {
    try {
        let file = req.file;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        let fileName = file.filename ; 
        let extensionName = file.filename.split('.')[file.filename.split('.').length - 1];
        let fileType =  file.mimetype.includes('image/') ? 'image' : 'pdf';
        let uploadResult =await uploadFile(fileName , extensionName);

        let asset = new Asset({
            type : fileType ,
            url : uploadResult.url ,
            hostId : uploadResult.path
        });

        res.status(200).json({
            success : true,
            data : {
                url : asset.url , 
                id : asset.id
            },
            error : null,
            message : 'OK'
        })
        return;
    } catch (error) {
        if (error instanceof vineErrors.E_VALIDATION_ERROR) {
            console.error(error.message);
            return res.status(400).json({
                success : true ,
                message : error.message,
                error
            });
        }
        console.error(error);
        return res.status(500).json({
            success : true ,
            message : 'Internal Server Error '
        })

    }
} );


export default router;